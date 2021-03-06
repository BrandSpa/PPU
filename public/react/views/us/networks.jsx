'use strict';
import React from 'react';
import request from 'superagent';

export default React.createClass({
  getInitialState: function() {
    return {
      awards: []
    }
  },

  componentDidMount: function() {
    this.fetch();
  },

  fetch: function() {
    request
    .get('/api/sliders')
    .query({name: 'usNetworks'})
    .end(function(err, res) {
      this.setState({
        awards: res.body
      });
    }.bind(this));
  },

  render: function() {

  var networks= this.state.awards.map(function(item) {
    return (
        <img key={item.id} src={item.slider_image.url} alt={item.text} width="150"/>
      )
    });

    return (
      <div className="reds">
        {networks}
      </div>
    )
  }
});