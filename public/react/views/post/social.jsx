'use strict';
import React from 'react';

export default React.createClass({

  render: function() {
    var model = this.props.model;

    return (
      <div className="post-social">
        <a
          className="share"
          href={"https://twitter.com/intent/tweet?text=" +model.title + "&url=http://ppulegal.com/posts/" + model.slug}><i className="fa fa-twitter-square"></i>
        </a>

        <a
          className="share"
          href={"http://www.linkedin.com/shareArticle?mini=true&url=http://ppulegal.com/posts/" + model.slug }
        ><i className="fa fa-linkedin-square"></i>
        </a>

        <a
          className="share"
          href={"https://plus.google.com/share?url=http://ppulegal.com/posts/" + model.slug }
        >
          <i className="fa fa-google-plus-square"></i>
        </a>

      <a
        className="share"
        href={"https://www.facebook.com/sharer/sharer.php?u=http://ppulegal.com/posts/" + model.slug}
        ><i className="fa fa-facebook-square"></i></a>
    </div>
    )
  }
});