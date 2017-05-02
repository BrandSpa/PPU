'use strict';
import React from 'react';
import Slider from 'react-slick';
import request from 'superagent';
import Phrases from 'views/us/phrases';
import Awards from 'views/us/awards';
import Networks from 'views/us/networks';
import getLang from 'get_lang';
import TopBar from 'views/top_bar';
import trans from 'langs/app';

export default React.createClass({
  getInitialState() {
    return {
      sliderMain: [],
      content: {}
    }
  },

  componentDidMount() {
    this.fetchSliders();
    this.fetchContent();
  },

  fetchSliders() {
    request
    .get('/api/sliders')
    .query({name: 'usMain'})
    .end((err, res) => {
      this.setState({
        sliderMain: res.body
      });
    });
  },

  fetchContent() {
    request
    .get('/api/pages')
    .query({page: 'us'})
    .end((err, res) => {
      this.setState({
        content: res.body
      });
    });
  },

  render() {

    var sliderMain = this.state.sliderMain.map(function(slide) {
      return (
        <div key={slide.id}>
          <img src={slide.slider_image.url} className="img-responsive"/>
        </div>
      );
    });

    var settings = {
      autoplay: true,
      infinite: true,
      speed: 800,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    return (
      <div>

        <TopBar title={trans.aboutUs} hidden />

        <div className="padding-top"></div>

          <div id="us">
          {this.state.sliderMain.length > 0 ? 
                <Slider {...settings}>
              {sliderMain}
            </Slider>
            : <div></div>}
          
            <div className="content">
              <div dangerouslySetInnerHTML={{__html: this.state.content["text_" + getLang]}} />
            </div>
            <Phrases />
            <h3>{trans.recognitions}</h3>
            <Awards />
            <h3>{trans.networks}</h3>
            <Networks />
          </div>
      </div>
    );
  }
});
