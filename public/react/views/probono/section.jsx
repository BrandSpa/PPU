'use strict';
var React = require('react');
var Helmet = require('react-helmet');
var Slider = require('react-slick');
var request = require('superagent');
var getLang = require('get_lang');
var TopBar = require('views/top_bar.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      sliderMain: [],
      sliderCompanies: [],
      content: {}
    }
  },

  componentDidMount: function() {
    this.fetchSliders();
    this.fetchContent();
  },

  fetchSliders: function() {
    request
    .get('/api/sliders')
    .query({name: 'probonoMain'})
    .end(function(err, res) {
      this.setState({
        sliderMain: res.body
      });
    }.bind(this));

     request
    .get('/api/sliders')
    .query({name: 'probonoCompanies'})
    .end(function(err, res) {
      this.setState({
        sliderCompanies: res.body
      });
    }.bind(this));

  },

  fetchContent: function() {
    request
    .get('/api/pages')
    .query({page: 'probono'})
    .end(function(err, res) {
      this.setState({
        content: res.body
      });
    }.bind(this));
  },

  render: function() {
    var sliderMain = this.state.sliderMain.map(function(slide) {
      return (
        <div key={slide.id}>
          <img src={slide.slider_image.url} className="img-responsive"/>
        </div>
      );
    });

    var sliderCompanies = this.state.sliderCompanies.map(function(slide) {
      return (
        <div key={slide.id} style={{padding: '0 30px'}}>
          
          <img src={slide.slider_image.url} width="200"/>
        </div>
      );
    });

    var settings1 = {
      autoplay: true,
      speed: 900,
      slidesToShow: 1,
      slidesToScroll: 1
    };

     var settings2 = {
      autoplay: true,
      infinite: true,
      speed: 800,
      slidesToShow: 4,
      slidesToScroll: 4,
        responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
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

    return (
      <div>

      <TopBar title="Probono" hidden />
        <div className="padding-top"></div>
        <div id="pro-bono">
          <Slider {...settings1}>
            {sliderMain}
          </Slider>
          <div className="content">
            <h2>{this.state.content["title_" + getLang]}</h2>
            <div dangerouslySetInnerHTML={{__html: this.state.content["text_" + getLang]}} />
            <Slider {...settings2}>
              {sliderCompanies}
            </Slider>
          </div>

        </div>
      </div>
    );
  }
});
