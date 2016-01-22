'use strict';
var React = require('react');
var request = require('superagent');
var ShareHover = require('views/posts/share_hover.jsx');
var PostDate = require('components/date.jsx');

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
          <h3><a href={"/posts/" + post.slug }>{post.title}</a></h3>
          <p>{post.excerpt.replace('&amp;', '&').substring(0, 200) + " ..."}</p>
          <div className="footer">
            <span className="country">{post.country}</span>
            <PostDate date={post.date} />
          </div>
        </div>
        </div>
      </div>
    );
  }
});
