'use strict';
const React = require('react');
const request = require('superagent');
const TextEditor = require('../textEditor');

module.exports = React.createClass({
   getInitialState() {
    return {
      content: {
        id: null,
        page: 'recruitment_two',
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
    .query({page: 'recruitment_two'})
    .end((err, res) => {
      if(res.body) {
        this.setState({
          content: res.body || {}
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
  },

  handleTextEn(values) {
    const data = _.extend(this.state.content, {
      title_en: values.title,
      text_en: values.text
    });

    if(this.state.content.id) {
      this.update(data);
    } else {
      this.store(data);
    }
  },

  update(data) {
     request
      .put('/api/pages/' + this.state.content.id)
      .set('X-CSRF-Token', this.state.csrf)
      .send(data)
      .end((err, res) => this.setState({content: res.body}));
  },

  store(data) {
    request
      .post('/api/pages')
      .set('X-CSRF-Token', this.state.csrf)
      .send(data)
      .end((err, res) => this.setState({content: res.body}));
  },

  render() {
    return (
      <div className="panel">
        <div className="panel-body">
          <h5>Texto dos</h5>
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
        </div>
      </div>
    );
  }
});
