Handlebars.registerHelper('checked', function(val1, val2) {
  var ref;
  return (ref = val1 === val2) != null ? ref : {
    ' checked="checked"': ''
  };
});

Handlebars.registerHelper('shortenText', function(text, block) {
  return text.replace('&amp;', '&').substring(0, 95) + " ...";
});

Handlebars.registerHelper('shortenText2', function(text, block) {
  return text.substring(0, 190).replace('&amp;', '&');
});

Handlebars.registerHelper('dateFormat', function(context, block) {
  var f;
  if (window.moment) {
    f = block.hash.format || "DD/MM/YYYY";
    return moment(context).format(f);
  }
});

Handlebars.registerHelper('toUpperCase', function(str) {
  return str.toUpperCase();
});

Handlebars.registerHelper('getYear', function(context, block) {
  var f;
  if (window.moment) {
    f = block.hash.format || "YYYY";
    return moment(context).format(f);
  } else {
    return context;
  }
});

Handlebars.registerHelper('getLangDomain', function(url, block) {
  if (app.lang === 'en') {
    return "en.ppulegal.com/" + url + block;
  } else {
    return "http://ppulegal.com/" + url + block;
  }
});
