'use strict';
var React = require('react');
var request = require('superagent');
var $ = require('jquery');
var TextEditor = require('TextEditor.jsx');
var SliderMain = require('probono/sliderMain.jsx');
var SliderCompanies = require('probono/SliderCompanies.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      content: {
        id: null,
        page: 'probono',
        text_es: null,
        title_es: null,
        text_en: null,
        title_en: null,
      },

      csrf: $("meta[name='csrf-token']").attr("content")
    }
  },

  componentDidMount: function() {
    this.fetchPageContent();
  },

  fetchPageContent: function() {
    request
    .get('/api/pages')
    .query({page: 'probono'})
    .end(function(err, res) {
      if(res.body) {
        this.setState({
          content: res.body
        });
      }
    }.bind(this));
  },


  handleTextEs: function(values) {
    var data = _.extend(this.state.content, {
      title_es: values.title,
      text_es: values.text
    });

    if(this.state.content.id) {
      this.update(data);
    } else {
      this.store(data);
    }
    this.setState({content: data});
  },

  handleTextEn: function(values) {
    console.log(values);

    var data = _.extend(this.state.content, {
      title_en: values.title,
      text_en: values.text
    });

    if(this.state.content.id) {
      this.update(data);
    } else {
      this.store(data);
    }
    this.setState({content: data});
  },

  update: function(data) {
     request
      .put('/api/pages/' + this.state.content.id)
      .set('X-CSRF-Token', this.state.csrf)
      .send(data)
      .end(function(err, res) {

      }.bind(this));
  },

  store: function(data) {
    request
      .post('/api/pages')
      .set('X-CSRF-Token', this.state.csrf)
      .send(data)
      .end(function(err, res) {

      }.bind(this));
  },

  render: function() {

    return (
      <div className="panel">
        <div className="panel-body">
        <SliderMain />
        <b>Español</b>
          <TextEditor
            onChange={this.handleTextEs}
            title={this.state.content.title_es}
            text={this.state.content.text_es}
          />
          <hr/>
          <b>Inglés</b>
          <TextEditor
            onChange={this.handleTextEn}
            title={this.state.content.title_en}
            text={this.state.content.text_en}
          />

          <SliderCompanies/>
        </div>
      </div>
    );
  }
});
