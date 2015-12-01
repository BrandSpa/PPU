'use strict';
var React = require('react');
var request = require('superagent');
var ShareHover = require('views/posts/share_hover.jsx');

module.exports = React.createClass({
  getDefautProps: function() {
    return {
      post: {}
    }
  },

  open: function() {
    this.props.history.pushState(null, '/posts/' + this.props.post.slug);
  },

  render: function() {
    console.log('call it');
    var post = this.props.post;
    var postImage;

    if(post.gallery) {
      postImage = (<img  src={post.gallery.img_name.url } alt={ post.title } />);
    } else if(post.img_name) {
      postImage = (<img  src={ post.img_name.url } alt={ post.title } />);
    }

    return (
      <div className="col-sm-6 col-xs-12 post-item" onClick={this.open}>
        <div className="item-container">
        <div className="thumb imgLiquidFill">
          {postImage}
        </div>

        <div className="content">

          <ShareHover model={post} />

          <h3><a href={"/posts/" + post.slug }>{post.title}</a></h3>
          <p>{post.excerpt.replace('&amp;', '&').substring(0, 95) + " ..."}</p>
          <div className="footer">
            <span className="country"><i className="icon ion-earth"></i> {post.country}</span>
            <span className="date"><i className="icon ion-calendar"></i> {post.date}</span>
          </div>
        </div>
        </div>
      </div>
    );
  }
});
