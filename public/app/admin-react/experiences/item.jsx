'use strict';
var React = require('react');
var _ = require('underscore');
var request = require('superagent');
var $ = require('jquery');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      model: {},
      token: $("meta[name='csrf-token']").attr("content")
    }
  },

  componentDidMount: function() {
    this.setState({model: this.props.model});
  },

  togglePublish: function(e) {
    e.preventDefault();
    var model = this.props.model;
    var data = _.extend(model, {published: !model.published});

    request
    .put('/api/experiences/' + model.id)
    .set('X-CSRF-Token', this.state.token)
    .send({fields:  data})
    .end(function(err, res) {
      this.setState({model: _.extend(this.props.model, res.body)});
    }.bind(this));
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
      translation = ( <a href={"/admin/models/"+model.translations.id+"/edit"} className="btn btn-xs">Editar Traducción</a>);
    }

    return (
      <tr>
        <td>{model.name} {model.lastname}</td>
        <td>{model.position}</td>
        <td>{model.country}</td>
        <td>
          <a href="#" className={"btn btn-xs " + classPublished} onClick={this.togglePublish}>{textPublished}</a>
        </td>

        <td><a href={"/admin/models/"+model.id+"/edit"} className="btn btn-xs">Editar</a></td>
        <td>
          {translation}
        </td>

      </tr>
    );
  }
});
