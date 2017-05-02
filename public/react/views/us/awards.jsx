'use strict';
import React from 'react';
import request from 'superagent';
import Slider from 'react-slick';

export default React.createClass({
  getInitialState() {
    return {
      awards: []
    }
  },

  componentDidMount() {
    this.fetch();
  },

  fetch() {
    request
    .get('/api/sliders')
    .query({name: 'usAwards'})
    .end((err, res) => {
      this.setState({
        awards: res.body
      });
    });
  },

  render() {
    var settings = {
      autoplay: true,
      infinite: true,
      speed: 2000,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    var awards = this.state.awards.map(function(item) {
      return (
        <div style={{padding: '30px'}}>
          <div className="img-container" style={{width: '100px', margin: '0 auto'}}>
            <img src={item.slider_image.url} alt={item.text} width="100"/>
          </div>
          <span style={{textAlign: 'center', 'display': 'block'}}>{item.text}</span>
        </div>
      )
    });
    
    console.log(this.state.awards, this.state.awards.length > 0);

    return (
      <div>
      {this.state.awards.length > 0 ?
        <Slider {...settings}>
          {awards}
        </Slider>
      : <div></div>}
      </div>
    )
  }
});