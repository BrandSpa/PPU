'use strict';
import React from 'react';
import Slider from 'react-slick';
import request from 'superagent';

export default React.createClass({
  getInitialState: function() {
    return {
      usPhrases: []
    }
  },

  componentDidMount: function() {
    this.fetch();
  },

  fetch: function() {
    request
      .get('/api/sliders')
      .query({'name': 'usPhrases'})
      .end(function(err, res) {
        this.setState({usPhrases: res.body});
      }.bind(this));
  },

  render: function() {
    var settings = {
      autoplay: true,
      infinite: true,
      speed: 1200,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    var usPhrases = this.state.usPhrases.map(function(item) {
      return (
        <div key={item.id}>
          <p style={{textAlign: 'center', padding: '0 60px 0 60px', color: '#002855'}}>{item.text}</p>
          <span style={{textAlign: 'center', padding: '0 60px 0 60px', 'display': 'block', color: '#002855', fontWeight: 'bold'}}>{item.title}</span>
        </div>
      )
    });

    return (
      <div>
        {this.state.usPhrases > 0 ? 
          <Slider {...settings}>
          {usPhrases}
        </Slider>
          : <div></div>}
      </div>
    
    );
  }
});