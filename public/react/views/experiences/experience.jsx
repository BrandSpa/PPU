 'use strict';
var React = require('react');
var Social = require('views/experiences/social.jsx');
var PostDate = require('components/date.jsx');
var moment = require('moment');
var getLang = require('utils/get_lang');
require('moment/locale/es');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      model: {}
    }
  },

  open: function(model) {
    this.props.history.pushState(null, '/experiencias/' + model.slug);
  },

  render: function() {
    var modelImage;
    var model = this.props.model;

    if(model.gallery) {
      modelImage = (<img  src={model.gallery.img_name.url } alt={ model.title } />);
    } else if(model.img_name) {
      modelImage = (<img  src={ model.img_name.url } alt={ model.title } />);
    }

    var date = moment(model.date).locale(getLang).format("YYYY");

    return (
      <div className="col-sm-6 col-xs-12 experience-item" onClick={this.open.bind(null, model)}>
        <div className="img-container">
          {modelImage}
        </div>

        <div className="content">
          <h3>{model.title}</h3>
          <p>{model.excerpt}</p>

          <div className="footer">
            <span className="country">{model.country}</span>
            <span className="date">{date}</span>
          </div>
        </div>
      </div>
    );
  }
});