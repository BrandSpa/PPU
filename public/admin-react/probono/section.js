'use strict';
const React = require('react');
const request = require('superagent');
const $ = require('jquery');
const TextEditor = require('../textEditor');
const SliderMain = require('probono/sliderMain');
const SliderCompanies = require('probono/SliderCompanies');

module.exports = React.createClass({
  getInitialState() {
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

  componentDidMount() {
    this.fetchPageContent();
  },

  fetchPageContent() {
    request
    .get('/api/pages')
    .query({page: 'probono'})
    .end((err, res) => {
      if(res.body) {
        this.setState({
          content: res.body
        });
      }
    });
  },


  handleTextEs(values) {
    const data = _.extend(this.state.content, {
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

  handleTextEn(values) {
    console.log(values);

    const data = _.extend(this.state.content, {
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

  update(data) {
     request
      .put('/api/pages/' + this.state.content.id)
      .set('X-CSRF-Token', this.state.csrf)
      .send(data)
      .end((err, res) => {

      });
  },

  store(data) {
    request
      .post('/api/pages')
      .set('X-CSRF-Token', this.state.csrf)
      .send(data)
      .end((err, res) => {

      });
  },

  render() {

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
