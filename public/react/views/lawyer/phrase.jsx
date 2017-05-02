'use strict';
import React from 'react';

export default React.createClass({
  getDefaultProps: function() {
    return {
      collection: []
    }
  },

  render: function() {
    var nodes = this.props.collection.map(function(model) {
      return (
        <div>
        <p>{model.content}</p>
        <h5>{model.author}</h5>
        </div>
      );
    });

    return (
      <div>
        <div className="separator">
          <hr/>
        </div>
        <div className="phrase">
          {nodes}
        </div>
      </div>
    );
  }
});