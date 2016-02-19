'use strict';
var React = require('react');

module.exports = React.createClass({

  render: function() {
    var model = this.props.model;
    return (
        <div className="share-container">
        <a
          className="share"
          href={"https://twitter.com/intent/tweet?text=" + model.name + " " + model.lastname + "&url=http://ppulegal.com/abogado/" + model.slug}
        >
        <i className="fa fa-twitter-square"></i></a>

       <a
          className="share"
          href={"http://www.linkedin.com/shareArticle?mini=true&url=http://ppulegal.com/abogados/" + model.slug }
        >
        <i className="fa fa-linkedin-square"></i>
        </a>

        <a
          className="share"
          href={"https://plus.google.com/share?url=http://ppulegal.com/abogados/" + model.slug }
        >
        <i className="fa fa-google-plus-square"></i>
        </a>

      <a
        className="share"
        href={"https://www.facebook.com/sharer/sharer.php?u=http://ppulegal.com/abogados/" + model.slug}
        ><i className="fa fa-facebook-square"></i></a>

        <a href={"/abogados/"+ model.id +"/vcard"} className="btn btn-primary btn-vcard" target="_new">Download<br/>VCard</a>
      </div>

    );
  }
});