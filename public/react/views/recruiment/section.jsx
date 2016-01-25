'use strict';
var React = require('react');
var Helmet = require('react-helmet');
var TopBar = require('views/top_bar.jsx');
var trans = require('langs/app');
var areas = require('langs/areas');
var Form = require('views/recruiment/form.jsx');
var request = require('superagent');
var getLang = require('get_lang');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      video: {},
      textOne: {},
      textTwo: {},
      textThree: {}
    }
  },

  componentDidMount: function() {
    this.getVideo();
    this.getTextOne();
    this.getTextTwo();
    this.getTextThree();
  },

  getVideo: function() {
    request
    .get('/api/pages')
    .query({page: 'recruiment_video'})
    .end(function(err, res) {
      if(res.body) {
        this.setState({
          video: res.body
        })
      }
    }.bind(this));
  },

  getTextOne: function() {
    request
    .get('/api/pages')
    .query({page: 'recruitment_one'})
    .end(function(err, res) {
      if(res.body) {
        this.setState({
         textOne: res.body
        })
      }

    }.bind(this));
  },

  getTextTwo: function() {
    request
    .get('/api/pages')
    .query({page: 'recruitment_two'})
    .end(function(err, res) {
      if(res.body) {
        this.setState({
          textTwo: res.body
        })
      }

    }.bind(this));
  },

  getTextThree: function() {
    request
    .get('/api/pages')
    .query({page: 'recruitment_three'})
    .end(function(err, res) {
      if(res.body) {
        this.setState({
          textThree: res.body
        })
      }

    }.bind(this));
  },

  render: function() {
    return (
      <div>
      <Helmet
          title={"Philippi Prietocarrizosa &Uría - Trabaje con nosotros"}
          meta={[
              {"name": "description", "content": "Buscamos profesionales que combinen el talento con la disciplina, personas que estén comprometidas con su profesión, con ganas de aprender y hacerse una carrera junto a los mejores abogados de la región. Bolsa de empleo. Vacantes."},
              {"name": "og:title", "content": "Philippi Prietocarrizosa &Uría - Trabaje con nosotros"},
              {"name": "og:description", "content": "Buscamos profesionales que combinen el talento con la disciplina, personas que estén comprometidas con su profesión, con ganas de aprender y hacerse una carrera junto a los mejores abogados de la región. Bolsa de empleo. Vacantes."}
          ]}
        />

        <TopBar title={trans.recruitment} hidden />
        <div id="work-with-us" >
          <div dangerouslySetInnerHTML={{__html: this.state.video["text_es"]}} />
            <div className="col-lg-12">

              <h4>{this.state.textOne["title_" + getLang]}</h4>
              <div dangerouslySetInnerHTML={{__html: this.state.textOne["text_" + getLang]}} />

              <br/>

              <Form />

              <h4>{this.state.textTwo["title_" + getLang]}</h4>
              <div dangerouslySetInnerHTML={{__html: this.state.textTwo["text_" + getLang]}} />

              <h4>{this.state.textThree["title_" + getLang]}</h4>
              <div dangerouslySetInnerHTML={{__html: this.state.textThree["text_" + getLang]}} />
            </div>
        </div>
      </div>
    );
  }
});
