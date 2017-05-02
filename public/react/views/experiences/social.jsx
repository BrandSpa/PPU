'use strict';
import React from 'react';
import trans from 'langs/app';

module.exports = React.createClass({

  render: function() {
    var model = this.props.model;

    return (
      <div className="share-hover">
       <a href={"/experiencias/" + model.slug}><h3>{trans.post.readPost} +</h3></a>
          <h4>{trans.share}  <i class="fa fa-share-alt"></i></h4>

        <a
          className="share"
          href={"https://twitter.com/intent/tweet?text=" +model.title + "&url=http://ppulegal.com/experiencias/" + model.slug}><i className="fa fa-twitter-square"></i>
        </a>

        <a
          className="share"
          href={"http://www.linkedin.com/shareArticle?mini=true&url=http://ppulegal.com/experiencias/" + model.slug }
        ><i className="fa fa-linkedin-square"></i>
        </a>

        <a
          className="share"
          href={"https://plus.google.com/share?url=http://ppulegal.com/experiencias/" + model.slug }
        >
        <i className="fa fa-google-plus-square"></i>
        </a>

      <a
        className="share"
        href={"https://www.facebook.com/sharer/sharer.php?u=http://ppulegal.com/experiencias/" + model.slug}
        ><i className="fa fa-facebook-square"></i></a>
      </div>
    );
  }
});