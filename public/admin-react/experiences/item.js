'use strict';
const React = require('react');
const _ = require('underscore');
const request = require('superagent');
const $ = require('jquery');
const Verification = require('verification');

module.exports = React.createClass({
  getInitialState() {
    return {
      model: {},
      token: $("meta[name='csrf-token']").attr("content"),
      showVerification: false
    }
  },

  componentDidMount() {
    this.setState({model: this.props.model});
  },

  togglePublish(e) {
    e.preventDefault();
    const model = this.props.model;
    const published = !model.published;
    const data = _.extend(model, {published});
    this.update(model.id, data, true);

    if(model.translations && model.translations.id) {
      this.update(model.translations.id, {published}, null);
    }

    if(model.translation && model.translation.id) {
      this.update(model.translation.id, {published}, null);
    }

  },

  update(id, data, updateState) {
    request
    .put(`/api/experiences/${id}`)
    .set('X-CSRF-Token', this.state.token)
    .send({fields:  data})
    .end((err, res) => {
      if(updateState) {
        this.setState({model: _.extend(this.props.model, res.body)});
      }

    });
  },

  translate(model) {
    request
    .post(`/api/experiences/${this.state.model.id}/duplicate`)
    .set('X-CSRF-Token', this.state.token)
    .end((err, res) => window.location = `/en/admin/experiences/${res.body.id}/edit`);textEditor.jsx
  },

  showVerification() {
    this.setState({showVerification: true});
  },

  handleContinue() {

    const model = this.state.model;

    this.destroy(model.id);

    if(model.translations && model.translations.id) {
      this.destroy(model.translations.id);
    }

    if(model.translation && model.translation.id) {
      this.destroy(model.translation.id);
    }

  },

  destroy(id) {
    request
    .del(`/api/experiences/${id}` )
    .set('X-CSRF-Token', this.state.token)
    .end((err, res) => {
      this.handleCancel();
      this.props.onDestroy(id);
    });
  },

  handleCancel() {
    this.setState({showVerification: false});
  },

  render() {
    let translation;
    const model = this.state.model;
    let classPublished;
    let textPublished = "Publicar";
    let editUrl = `/admin/experiences/${model.id}/edit`;

    if(model.published) {
      classPublished = "btn-success";
      textPublished = "Publicado";
    }

    if(model.translations && model.translations.id) {
      translation = ( <a href={`/en/admin/experiences/${model.translations.id}/edit`} className="btn btn-xs">Editar Traducción</a>);
    }

    if(!model.translations && model.lang != 'en') {
      translation = (<button className="btn btn-xs" onClick={this.translate}>Traducir</button>);
    }

    if(model.lang == 'en') {
      editUrl = `/en${editUrl}`;
    }

    return (
      <tr>
        <td>{model.company_name} - {model.title}</td>
        <td>{model.country}</td>
        <td>
          <a href="#" className={`btn btn-xs ${classPublished}`} onClick={this.togglePublish}>{textPublished}</a>
        </td>

        <td><a href={editUrl} className="btn btn-xs">Editar</a></td>
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
