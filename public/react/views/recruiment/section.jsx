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
      textThree: {},
      showForm: false
    }
  },

  componentDidMount: function() {
    this.getVideo();
    this.getTextOne();
    this.getTextTwo();
    this.getTextThree();
  },

  updateState: function(url, query, fieldToUpdate) {
    var objToUpdate = {};

    request
    .get(url)
    .query(query)
    .end(function(err, res) {
      if(res.body) {
        objToUpdate[fieldToUpdate] = res.body;
        this.setState(objToUpdate)
      }
    }.bind(this));
  },

  getVideo: function() {
    var url = '/api/pages';
    var query = {page: 'recruiment_video'};
    var field = "video";
    this.updateState(url, query, field);
  },

  getTextOne: function() {
    var url = '/api/pages';
    var query = {page: 'recruitment_one'};
    var field = "textOne";
    this.updateState(url, query, field);
  },

  getTextTwo: function() {
    var url = '/api/pages';
    var query = {page: 'recruitment_two'};
    var field = "textTwo";
    this.updateState(url, query, field);
  },

  getTextThree: function() {
     var url = '/api/pages';
    var query = {page: 'recruitment_three'};
    var field = "textThree";
    this.updateState(url, query, field);
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
          <div
            dangerouslySetInnerHTML={{__html: this.state.video["text_es"]}}
          />
            <div className="col-lg-12">

              <h4>{this.state.textOne["title_" + getLang]}</h4>
              <div
                dangerouslySetInnerHTML={{__html: this.state.textOne["text_" + getLang]}}
              />

              <br/>

              <div className={this.showForm ? "hidden" : ""}>
                <Form onSubmit={this.handleSubmit} />
              </div>

              <div className={this.showForm ? "" : "hidden"}>
              <h4>Gracias por comunicarse con nostros, pronto nos pondremos en contacto con usted.</h4>
              </div>


              <h4>{this.state.textTwo["title_" + getLang]}</h4>
              <div
                dangerouslySetInnerHTML={{__html: this.state.textTwo["text_" + getLang]}}
              />

              <h4>{this.state.textThree["title_" + getLang]}</h4>
              <div
                dangerouslySetInnerHTML={{__html: this.state.textThree["text_" + getLang]}}
              />
            </div>
        </div>
      </div>
    );
  }
});
