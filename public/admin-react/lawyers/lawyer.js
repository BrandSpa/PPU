'use strict';
const React = require('react');
const _ = require('underscore');
const request = require('superagent');
const $ = require('jquery');

module.exports = React.createClass({
  getInitialState() {
    return {
      lawyer: {},
      token: $("meta[name='csrf-token']").attr("content")
    }
  },

  componentDidMount() {
    this.setState({lawyer: this.props.lawyer});
  },

  togglePublish(e) {
    e.preventDefault();
    const lawyer = this.props.lawyer;
    const data = _.extend(lawyer, {published: !lawyer.published});
    request
    .put(`/api/lawyers/${lawyer.id}`)
    .set('X-CSRF-Token', this.state.token)
    .send({fields:  data})
    .end((err, res) => this.setState({lawyer: _.extend(this.props.lawyer, res.body)}));
  },

  render() {
    let translation;
    const lawyer = this.state.lawyer;
    let classPublished;
    let textPublished = "Publicar";

    if(lawyer.published) {
      classPublished = "btn-success";
      textPublished = "Publicado";
    }

    if(lawyer.translations && lawyer.translations.id) {
      translation = ( <a href={`/admin/lawyers/${lawyer.translations.id}/edit`} className="btn btn-xs">Editar Traducción</a>);
    }

    return (
      <tr>
        <td>{lawyer.name} {lawyer.lastname}</td>
        <td>{lawyer.position}</td>
        <td>{lawyer.country}</td>
        <td>
          <a href="#" className={`btn btn-xs ${classPublished}`} onClick={this.togglePublish}>{textPublished}</a>
        </td>

        <td><a href={`/admin/lawyers/${lawyer.id}/edit`} className="btn btn-xs">Editar</a></td>
        <td>
          {translation}
        </td>

      </tr>
    );
  }
});