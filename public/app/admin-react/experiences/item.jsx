'use strict';
var React = require('react');
var _ = require('underscore');
var request = require('superagent');
var $ = require('jquery');
var Verification = require('verification.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      model: {},
      token: $("meta[name='csrf-token']").attr("content"),
      showVerification: false
    }
  },

  componentDidMount: function() {
    this.setState({model: this.props.model});
  },

  togglePublish: function(e) {
    e.preventDefault();
    var model = this.props.model;
    var published = !model.published;
    var data = _.extend(model, {published: published});
    this.update(model.id, data);

    if(model.translations && model.translations.id) {
      this.update(model.translations.id, {published: published});
    }

    if(model.translation && model.translation.id) {
      this.update(model.translation.id, {published: published});
    }

  },

  update: function(id, data, updateState) {
    request
    .put('/api/experiences/' + id)
    .set('X-CSRF-Token', this.state.token)
    .send({fields:  data})
    .end(function(err, res) {
      this.setState({model: _.extend(this.props.model, res.body)});
    }.bind(this));
  },

  translate: function(model) {
    request
    .post("/api/experiences/" + this.state.model.id + "/duplicate")
    .set('X-CSRF-Token', this.state.token)
    .end(function(err, res) {
      window.location = "/en/admin/experiences/" + res.body.id + "/edit";
    });textEditor.jsx
  },

  showVerification: function() {
    this.setState({showVerification: true});
  },

  handleContinue: function() {

    var model = this.state.model;

    this.destroy(model.id);

    if(model.translations && model.translations.id) {
      this.destroy(model.translations.id);
    }

    if(model.translation && model.translation.id) {
      this.destroy(model.translation.id);
    }

  },

  destroy: function(id) {
    request
    .del("/api/experiences/" + id )
    .set('X-CSRF-Token', this.state.token)
    .end(function(err, res) {
      this.handleCancel();
      this.props.onDestroy(id);
    }.bind(this));
  },

  handleCancel: function() {
    this.setState({showVerification: false});
  },

  render: function() {
    var translation;
    var model = this.state.model;
    var classPublished;
    var textPublished = "Publicar";

    if(model.published) {
      classPublished = "btn-success";
      textPublished = "Publicado";
    }

    if(model.translations && model.translations.id) {
      translation = ( <a href={"/en/admin/experiences/"+model.translations.id+"/edit"} className="btn btn-xs">Editar Traducción</a>);
    }

    if(!model.translations && model.lang != 'en') {
      translation = (<button className="btn btn-xs" onClick={this.translate}>Traducir</button>);
    }

    return (
      <tr>
        <td>{model.company_name} - {model.title}</td>
        <td>{model.country}</td>
        <td>
          <a href="#" className={"btn btn-xs " + classPublished} onClick={this.togglePublish}>{textPublished}</a>
        </td>

        <td><a href={"/admin/experiences/"+model.id+"/edit"} className="btn btn-xs">Editar</a></td>
        <td>
          {translation}
        </td>

        <td><button onClick={this.showVerification} className="btn btn-xs btn-danger">Eliminar</button></td>

        <Verification
          show={this.state.showVerification}
          onContinue={this.handleContinue}
          onCancel={this.handleCancel}
          />
      </tr>
    );
  }
});
