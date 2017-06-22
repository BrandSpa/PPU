 'use strict';
import React from 'react';
import moment from 'moment';
import getLang from 'utils/get_lang';
import Social from 'views/experiences/social';
import PostDate from 'components/date';
require('moment/locale/es');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      model: {}
    }
  },

  open: function(model) {
    console.log(this.props.history);
    this.props.history.push('/experiencias/' + model.slug);
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