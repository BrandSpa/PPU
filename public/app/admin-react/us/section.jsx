'use strict';
var React = require('react');
var request = require('superagent');
var SliderMain = require('us/sliderMain.jsx');
var SliderPhrases = require('us/sliderPhrases.jsx');
var SliderNetworks = require('us/sliderNetworks.jsx');
var SliderAwards = require('us/sliderAwards.jsx');
var TextEditor = require('textEditor.jsx');

module.exports = React.createClass({
   getInitialState: function() {
    return {
      content: {
        id: null,
        page: 'us',
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
    .query({page: 'us'})
    .end(function(err, res) {
      if(res.body) {
        this.setState({
          content: res.body || {}
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
  },

  handleTextEn: function(values) {
    var data = _.extend(this.state.content, {
      title_en: values.title,
      text_en: values.text
    });

    if(this.state.content.id) {
      this.update(data);
    } else {
      this.store(data);
    }
  },

  update: function(data) {
     request
      .put('/api/pages/' + this.state.content.id)
      .set('X-CSRF-Token', this.state.csrf)
      .send(data)
      .end(function(err, res) {
        this.setState({content: res.body});
      }.bind(this));
  },

  store: function(data) {
    request
      .post('/api/pages')
      .set('X-CSRF-Token', this.state.csrf)
      .send(data)
      .end(function(err, res) {
        this.setState({content: res.body});
      }.bind(this));
  },

  render: function() {
    return (
      <div className="panel">
        <div className="panel-body">
          <SliderMain />

           <TextEditor
              onChange={this.handleTextEs}
              title={this.state.content.title_es}
              text={this.state.content.text_es}
            />

            <TextEditor
              onChange={this.handleTextEn}
              title={this.state.content.title_en}
              text={this.state.content.text_en}
            />

            <SliderPhrases />
            <SliderAwards />
            <SliderNetworks />
        </div>
      </div>
    );
  }
});