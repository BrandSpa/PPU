'use strict';
var React = require('react');
var Helmet = require('react-helmet');
var trans = require('langs/app');
var Categories = require('views/post/categories.jsx');
var request = require('superagent');
var Social = require('views/post/social.jsx');
var TopBar = require('views/top_bar.jsx');
var PostDate = require('components/date.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      post: {}
    }
  },

  componentDidMount: function() {
    request
    .get('/api/posts/' + this.props.params.slug)
    .end(function(err, res) {
      this.setState({post: res.body});
    }.bind(this));
  },

  render: function() {
    var post = this.state.post;
    var postImage;
    var lawyers = (<h5>{ post.author }</h5>);
    var count;
    var divider = "|";
    if(post && post.lawyers) {
      count = post.lawyers.length - 1;
      lawyers = post.lawyers.map(function(lawyer, i) {
        if(count > 0 && i < count) {
          return (<h5><a href={"/abogados/" + lawyer.slug}>{lawyer.name} {lawyer.lastname}</a>{divider}</h5>  );
        } else {
          return (<h5><a href={"/abogados/" + lawyer.slug}>{lawyer.name} {lawyer.lastname}</a></h5>  );
        }
      });
    }

    if(post.img_name && post.img_name.url) {
      postImage = post.img_name.url;
    } else if(post.gallery && post.gallery.img_name) {
      postImage = post.gallery.img_name.url;
    }

    return (
      <div>
       <Helmet
          title={"Philippi Prietocarrizosa &Uría - " + post.title}
          meta={[
              {"name": "description", "content": post.excerpt},
              {"name": "og:title", "content": "Philippi Prietocarrizosa &Uría - " + post.title},
              {"name": "og:description", "content": post.excerpt},
              {"name": "og:image", "content": postImage}
          ]}
        />
      <TopBar title={trans.news} hidden back />
      <div className="padding-top"></div>
      <div id="post-detail">
      <div className="post-header">
        <div className="thumb-container">
          <img  src={postImage} alt={ post.title }/>
        </div>

        <div className="data">
          <h1>{post.title}</h1>
          {lawyers}
          <Categories collection={post.categories} />
        </div>
      </div>

  <div className="content">
  <div className="meta">
     <div className="date">
      {post.country }  <PostDate date={post.date} />
    </div>
     <Social model={post} />
  </div>


    <div dangerouslySetInnerHTML={{__html: post.content}} />
  </div>
  </div>
  </div>
    )
  }
});