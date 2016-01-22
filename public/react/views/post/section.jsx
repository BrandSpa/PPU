'use strict';
var React = require('react');
var Helmet = require('react-helmet');
var trans = require('langs/app');
var Categories = require('views/post/categories.jsx');
var request = require('superagent');
var Social = require('views/post/social.jsx');
var TopBar = require('views/top_bar.jsx');

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

    if(post && post.lawyers) {
      lawyers = <lawyers collection={post.lawyers}/>
    }

    if(post.gallery) {
      postImage = post.gallery.img_name.url;
    } else if(post.img_name){
      postImage = post.img_name.url;
    }

    return (
      <div>
       <Helmet
          title={"Philippi Prietocarrizosa &Uría - " + post.title}
          meta={[
              {"name": "description", "content": " Noticias y actualidad de temas legales. Firma con 13 áreas de práctica; Con oficinas en Chile, Colombia. España, Portugal, Sao Paulo, Nueva York, Pekín, Londres y Bruselas."},
              {"name": "og:title", "content": "Philippi Prietocarrizosa &Uría - Noticias"},
              {"name": "og:description", "content": " Noticias y actualidad de temas legales. Firma con 13 áreas de práctica; Con oficinas en Chile, Colombia. España, Portugal, Sao Paulo, Nueva York, Pekín, Londres y Bruselas."},
              {"name": "og:image", "content": postImage}
          ]}
        />
      <TopBar title={trans.news} hidden back />
      <div className="padding-top"></div>
      <div id="post-detail">
      <div className="post-header">
        <div className="thumb-container">
          <img  src={postImage} alt={ post.title } className="hidden-xs" />
        </div>

        <div className="data">
          <h1>{post.title}</h1>
          {lawyers}
          <Categories collection={post.categories} />
        </div>
        <Social model={post} />
      </div>

  <div className="content">
    <div className="date">
      <i className="fa fa-globe"></i> {post.country } <i className="fa fa-calendar-o"></i> {post.date}
    </div>
    <div dangerouslySetInnerHTML={{__html: post.content}} />
  </div>
  </div>
  </div>
    )
  }
});