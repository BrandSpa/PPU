'use strict';
var React = require('react');
var request = require('superagent');
var Slider = require('react-slick');

module.exports = React.createClass({
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
    .query({name: 'usAwards'})
    .end(function(err, res) {
      this.setState({
        awards: res.body
      });
    }.bind(this));
  },

  render: function() {
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

    return (
      <Slider {...settings}>
        {awards}
      </Slider>
    )
  }
});