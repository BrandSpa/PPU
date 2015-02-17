  function openLogin(message, link){

    FB.login(function(response) {
      if (response.status === 'connected') {
        fb_publish()
      }
    }, {scope: 'publish_actions'});

  };

function fb_publish(message, link){
   FB.api(
      '/me/feed',
      'post',
      {message: message, link: link},
      function(resp){
        if (resp.error) {
          console.log(resp);
        } else {
          app.pubsub.trigger('post:socialPublished');
        }

      }
    )
}

  function fb_check_and_publish(message, link){
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        fb_publish(message, link);
      }
      else {
       openLogin(message, link)
      }
      return true;
    });
  }

  function setSubdomain(lang){
    if (lang == 'es') {
      return "http://ppulegal.com/"
    } else {
      return "en.ppulegal.com/"
    };

  }

function  openShare(link){
  FB.ui(
  {
    method: 'share',
    href: link,
  },
  function(response) {
    if (response && !response.error_code) {
      console.log('Posting completed.');
    } else {
      console.log('Error while posting.');
    }
  }
);
}