'use strict';
const React = require('react');
const request = require('superagent');
const $ = require('jquery');

module.exports = React.createClass({
  getInitialState() {
    return {
      id: null,
      text_es: null,
      text_en: null,
      page: null
    }
  },

  componentDidMount() {
    request
    .get('/api/pages')
    .query({page: 'recruiment_video'})
    .end((err, res) => this.setState(res.body));
  },

  handleChange() {
    const data = {
      text_es: React.findDOMNode(this.refs.text).value,
      text_en: React.findDOMNode(this.refs.text).value,
      page: "recruiment_video"
    };

    this.setState(data);

    if(this.state.id) {
      this.update(data);
    } else {
      this.store(data);
    }
  },

  update(data) {
    request
    .put(`/api/pages/${this.state.id}`)
    .set('X-CSRF-Token', $("meta[name='csrf-token']").attr("content"))
    .send(data)
    .end((err, res) => this.setState(res.body));
  },

  store(data) {
    request
    .post('/api/pages')
    .set('X-CSRF-Token', $("meta[name='csrf-token']").attr("content"))
    .send(data)
    .end((err, res) => this.setState(res.body));
  },

  render() {
    return (
      <div>
        <h5>Video</h5>
        <div className="form-group">
          <input ref="text" type="text" className="form-control" placeholder='<iframe src="https://player.vimeo.com/video/115685496" width="500" height="209" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>' onChange={this.handleChange} value={this.state.text_es} />
        </div>
      </div>
    );
  }
});