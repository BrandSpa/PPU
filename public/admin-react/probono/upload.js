'use strict';
const React = require('react');
const request = require('superagent');
const $ = require('jquery');

module.exports = React.createClass({
  uploadFile(event) {
    const file = event.target.files[0];
    const token = $("meta[name='csrf-token']").attr("content");
    const formData = new FormData();
    formData.append('slider_image', file);
    formData.append('name', this.props.name);
    formData.append('position', this.props.position);

    request
    .post('/api/sliders')
    .set('X-CSRF-Token', token)
    .send(formData)
    .end((err, res) => this.props.onAdd(res.body));
  },

  render() {
    return (
      <div>
        <input type="file" onChange={this.uploadFile} class="form-control"/>
      </div>
    );
  }
});
