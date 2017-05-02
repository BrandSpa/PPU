'use strict';
import React from 'react';

export default React.createClass({
  getDefaultProps() {
    return {
      collection: []
    }
  },

  render() {
    var link;

    var nodes = this.props.collection.map(function(item) {
        if(item.file_name.url) {
          return <a href={item.file_name.url} target="_new">{item.title}</a>
        } else {
          if(item.link) {
            return <a href={item.link} target="_new">{item.title}</a>
          } else {
             return <p>{item.title}</p>
          }

        }
    });

    return (
      <div>
        {nodes}
      </div>
    );
  }
});