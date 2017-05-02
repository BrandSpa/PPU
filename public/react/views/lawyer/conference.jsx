'use strict';
import React from 'react';

export default React.createClass({
  getDefaultProps: function() {
    return {
      collection: []
    }
  },

  render: function() {
    var collection = this.props.collection;
    var show = false;
    var nodes = collection.map(function(model) {
      return (<li>{model.title ? model.title + " ," : ""} {model.country} {model.year}</li>);
    });

    if(collection.length > 0) {
      show = true;
    }

    return (
      <div className={show ? '' : 'hidden'}>
        <h4>{this.props.title}</h4>
        <ul>
          {nodes}
        </ul>
      </div>
    );
  }
});