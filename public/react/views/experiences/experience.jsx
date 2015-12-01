'use strict';
var React = require('react');
var Social = require('views/experiences/social.jsx');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      model: {}
    }
  },

  render: function() {
    var modelImage;
    var model = this.props.model;

    if(model.gallery) {
      modelImage = (<img  src={model.gallery.img_name.url } alt={ model.title } />);
    } else if(model.img_name) {
      modelImage = (<img  src={ model.img_name.url } alt={ model.title } />);
    }

    return (
      <div className="col-sm-6 col-xs-12 experience-item">
        <div className="img-container">
          {modelImage}
        </div>

        <div className="content">
          <Social model={model} />
          <h3>{model.title}</h3>
          <p>{model.excerpt}</p>

          <div className="footer">
            <span className="country"><i className="fa fa-globe"></i> {model.country}</span>
            <span className="date"><i className="fa fa-calendar-o"></i> {model.date}</span>
          </div>
        </div>
      </div>
    );
  }
});