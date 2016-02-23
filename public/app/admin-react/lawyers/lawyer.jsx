'use strict';
var React = require('react');
var _ = require('underscore');
var request = require('superagent');
var $ = require('jquery');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      lawyer: {},
      token: $("meta[name='csrf-token']").attr("content")
    }
  },

  componentDidMount: function() {
    this.setState({lawyer: this.props.lawyer});
  },

  togglePublish: function(e) {
    e.preventDefault();
    var lawyer = this.props.lawyer;
    var data = _.extend(lawyer, {published: !lawyer.published});
    request
    .put('/api/lawyers/' + lawyer.id)
    .set('X-CSRF-Token', this.state.token)
    .send({fields:  data})
    .end(function(err, res) {
      this.setState({lawyer: _.extend(this.props.lawyer, res.body)});
    }.bind(this));
  },

  render: function() {
    var translation;
    var lawyer = this.state.lawyer;
    var classPublished;
    var textPublished = "Publicar";

    if(lawyer.published) {
      classPublished = "btn-success";
      textPublished = "Publicado";
    }

    if(lawyer.translations && lawyer.translations.id) {
      translation = ( <a href={"/admin/lawyers/"+lawyer.translations.id+"/edit"} className="btn btn-xs">Editar Traducción</a>);
    }

    return (
      <tr>
        <td>{lawyer.name} {lawyer.lastname}</td>
        <td>{lawyer.position}</td>
        <td>{lawyer.country}</td>
        <td>
          <a href="#" className={"btn btn-xs " + classPublished} onClick={this.togglePublish}>{textPublished}</a>
        </td>

        <td><a href={"/admin/lawyers/"+lawyer.id+"/edit"} className="btn btn-xs">Editar</a></td>
        <td>
          {translation}
        </td>

      </tr>
    );
  }
});