'use strict';
var React = require('react');
var Helmet = require('react-helmet');
var request = require('superagent');
var ShareHover = require('views/posts/share_hover.jsx');
var PostDate = require('components/date.jsx');

module.exports = React.createClass({
  openPost: function() {
    this.props.history.pushState(null, '/posts/' + this.props.post.slug);
  },

  render: function() {
     var post = this.props.post;
    var postImage;

    if(post.gallery) {
      postImage = (<img  src={post.gallery.img_name.url } alt={ post.title } className="img-responsive" />);
    } else if(post.img_name) {
      postImage = (<img  src={ post.img_name.url } alt={ post.title } className="img-responsive"/>);
    }

    return (
        <div className="col-sm-6 col-xs-12 post-main-featured-item" onClick={this.openPost}>
        <div className="img-container">
          {postImage}
        </div>

        <div className="content">
          <h3><a href={"/posts/" + post.slug }>{post.title}</a></h3>
          <p>{post.excerpt.replace('&amp;', '&').substring(0, 300) + " ..."}</p>
          <div className="footer">
            <span className="country">{post.country}</span>
            <PostDate date={post.date} />
          </div>
        </div>

      </div>
    );
  }
});