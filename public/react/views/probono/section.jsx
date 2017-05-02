'use strict';
import React from 'react';
import Slider from 'react-slick';
import request from 'superagent';
import getLang from 'get_lang';
import TopBar from 'views/top_bar';

export default React.createClass({
  getInitialState() {
    return {
      sliderMain: [],
      sliderCompanies: [],
      content: {}
    }
  },

  componentDidMount() {
    this.fetchContent();
    this.fetchSliders();
  },

  fetchSliders() {
    request
    .get('/api/sliders')
    .query({name: 'probonoMain'})
    .end((err, res) => {
      this.setState({
        sliderMain: res.body
      });
    });

    request
    .get('/api/sliders')
    .query({name: 'probonoCompanies'})
    .end((err, res) => {
      this.setState({
        sliderCompanies: res.body
      });
    });

  },

  fetchContent() {
    request
    .get('/api/pages')
    .query({page: 'probono'})
    .end((err, res) => {
      this.setState({ content: res.body });
    });
  },

  render() {
    let slider1 = this.state.sliderMain.map(function(slide) {
      return (
        <div key={slide.id}>
          <img src={slide.slider_image.url} className="img-responsive"/>
        </div>
      )
    });

    const slider2 = this.state.sliderCompanies.map(function(slide){
      return (
        <div key={slide.id} style={{padding: '0 30px'}}>
          <img src={slide.slider_image.url} width="200"/>
        </div>
      )
    });

    const settings1 = {
      autoplay: true,
      speed: 900,
      slidesToShow: 1,
      slidesToScroll: 1
    };

     const settings2 = {
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

       	   {
            this.state.sliderMain.length > 0 ? 
              <Slider {...settings1}> {slider1} </Slider> 
              : <div></div> 
          }

          <div className="content">
            <h2>{ this.state.content["title_" + getLang] }</h2>
            <div dangerouslySetInnerHTML={{__html: this.state.content["text_" + getLang]}} />
          
          </div>

        </div>
      </div>
    );
  }
});
