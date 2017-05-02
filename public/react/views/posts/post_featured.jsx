'use strict';
import React from 'react';
import ShareHover from 'views/posts/share_hover';
import PostDate from 'components/date';

export default React.createClass({
  openPost() {
    this.props.router.push('/posts/' + this.props.post.slug);
  },

  render() {
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