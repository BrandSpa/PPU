'use strict';
var React = require('react');
var request = require('superagent');
var $ = require('jquery');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      id: null,
      text_es: null,
      text_en: null,
      page: null
    }
  },

  componentDidMount: function() {
    request
    .get('/api/pages')
    .query({page: 'recruiment_video'})
    .end(function(err, res) {
      this.setState(res.body);
    }.bind(this));
  },

  handleChange: function() {
    var data = {
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

  update: function(data) {
    request
    .put('/api/pages/' + this.state.id)
    .set('X-CSRF-Token', $("meta[name='csrf-token']").attr("content"))
    .send(data)
    .end(function(err, res) {
      this.setState(res.body);
    }.bind(this));
  },

  store: function(data) {
    request
    .post('/api/pages')
    .set('X-CSRF-Token', $("meta[name='csrf-token']").attr("content"))
    .send(data)
    .end(function(err, res) {
      this.setState(res.body);
    }.bind(this));
  },

  render: function() {
    return (
      <div>
        <div className="form-group">
          <label htmlFor="">Video embed</label>
          <input ref="text" type="text" className="form-control" placeholder='<iframe src="https://player.vimeo.com/video/115685496" width="500" height="209" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>' onChange={this.handleChange} value={this.state.text_es} />
        </div>
      </div>
    );
  }
});