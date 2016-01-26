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
      hideForm: false
    }
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

  handleSubmit: function() {

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
              <div className={this.state.hideForm ? "hidden": ""}>
                <Form onSubmit={this.handleSubmit} />
              </div>
              <div className={this.state.hideForm ? "": "hidden"}>
                <h5 className="form_thanks">Gracias por comunicarse con nostros, pronto nos pondremos en contacto con usted.</h5>
              </div>
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
