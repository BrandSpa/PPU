'use strict';
var React = require('react');
var Helmet = require('react-helmet');
var TopBar = require('views/top_bar.jsx');
var trans = require('langs/app');
var areas = require('langs/areas');
var Form = require('views/recruiment/form.jsx');
var request = require('superagent');
var getLang = require('get_lang');
var $ = require('jquery');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      video: {},
      textOne: {},
      textTwo: {},
      textThree: {},
      showForm: false,
      country: "Colombia"
    }
  },

  componentDidMount: function() {
    this.getVideo();
    this.getTextOne();
    this.getTextTwo();
    this.getTextThree();
  },

  selectCountry: function(e, t) {
    e.preventDefault();
    $('.select-country-btns').find('button').removeClass('active');
    $(e.currentTarget).addClass('active');
    var val = $(e.currentTarget).text();
    this.setState({country: val});
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

  handleSubmit: function() {
    this.setState({showForm: this.state.showForm ? false : true});
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

              <h4>{this.state.textTwo["title_" + getLang]}</h4>

              <h4 className="title-form">Por favor seleccione el país en el que desea aplicar</h4>

              <div
                className="btn-group btn-group-justified select-country-btns"
                role="group">

                <div className="btn-group" role="group">
                  <button
                    type="button"
                    className="btn btn-default active"
                    onClick={this.selectCountry}>Colombia</button>
                </div>

                <div className="btn-group" role="group">
                  <button
                    type="button"
                    className="btn btn-default"
                    onClick={this.selectCountry}>Chile</button>
                </div>

                <div className="btn-group" role="group">
                  <button
                    type="button"
                    className="btn btn-default"
                    onClick={this.selectCountry}>Perú</button>
                </div>
              </div>

              <div className={this.state.showForm ? "hidden" : ""}>
                <Form onSubmit={this.handleSubmit} country={this.state.country} />
              </div>

              <div className={this.state.showForm ? "" : "hidden"}>
              <h4>Gracias por comunicarse con nostros, pronto nos pondremos en contacto con usted.</h4>

              </div>

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
