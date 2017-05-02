'use strict';
import React from 'react';

export default React.createClass({
   getDefaultProps() {
    return {
      collection: []
    }
  },

  render() {
    var nodes = this.props.collection.map(function(item) {
      return (
        <a href={"/posts/" + item.slug } target="_new">{item.title}</a>
      )
    });

    return (
      <div>
        {nodes}
      </div>
    );
  }
});