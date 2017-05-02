'use strict';
import React from 'react';

export default React.createClass({
  getDefaultProps() {
    return {
      area: {}
    }
  },

  open() {
    this.props.history.pushState(null, '/areas/' + this.props.area.slug);
  },

  render() {
    var area = this.props.area;

    return (
      <div className="col-sm-6 col-xs-12 category-item" onClick={this.open}>
        <div className="img-container">
          <img src={ area.gallery.img_name.url } alt={ area.name } />
        </div>

        <div className="content">
          <h3>{area.name}</h3>
          <p> {area.excerpt}</p>
          <div className="footer"></div>
        </div>
      </div>
    );
  }
});