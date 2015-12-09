'use strict';
var React = require('react');
var Slider = require('react-slick');
var Phrases = require('views/us/phrases.jsx');
var Awards = require('views/us/awards.jsx');
var Networks = require('views/us/networks.jsx');
var request = require('superagent');
var getLang = require('get_lang');
var TopBar = require('views/top_bar.jsx');
var trans = require('langs/app');
var Helmet = require('react-helmet');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      sliderMain: [],
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
    .query({name: 'usMain'})
    .end(function(err, res) {
      this.setState({
        sliderMain: res.body
      });
    }.bind(this));
  },

  fetchContent: function() {
    request
    .get('/api/pages')
    .query({page: 'us'})
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

    var settings = {
      autoplay: true,
      infinite: true,
      speed: 800,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    return (
      <div>
      <Helmet
          title={"Philippi Prietocarrizosa &Uría - Nosotros"}
          meta={[
              {"name": "description", "content": "Philippi, Prietocarrizosa & Uría es la primera gran firma iberoamericana, resultado de la fusión entre el estudio chileno Philippi, Yrarrázaval, Pulido & Brunner y la firma colombiana Prietocarrizosa, en lo que supone la primera unión en Latinoamérica de dos estudios líderes en sus respectivos países. La prestigiosa firma de España y Portugal, Uría Menéndez, se ha asociado al nuevo estudio"},
              {"name": "og:title", "content": "Philippi Prietocarrizosa &Uría - Nosotros"},
              {"name": "og:description", "content": "Philippi, Prietocarrizosa & Uría es la primera gran firma iberoamericana, resultado de la fusión entre el estudio chileno Philippi, Yrarrázaval, Pulido & Brunner y la firma colombiana Prietocarrizosa, en lo que supone la primera unión en Latinoamérica de dos estudios líderes en sus respectivos países. La prestigiosa firma de España y Portugal, Uría Menéndez, se ha asociado al nuevo estudio"}
          ]}
        />

        <TopBar title={trans.aboutUs} hidden />

        <div className="padding-top"></div>

          <div id="us">
            <Slider {...settings}>
              {sliderMain}
            </Slider>
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
