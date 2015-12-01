'use strict';
var React = require('react');
var request = require('superagent');
var $ = require('jquery');

module.exports = React.createClass({
  uploadFile: function(event) {
    var file = event.target.files[0];
    var token = $("meta[name='csrf-token']").attr("content");
    var formData = new FormData();
    formData.append('slider_image', file);
    formData.append('name', this.props.name);
    formData.append('position', this.props.position);

    request
    .post('/api/sliders')
    .set('X-CSRF-Token', token)
    .send(formData)
    .end(function(err, res) {
      this.props.onAdd(res.body);
    }.bind(this));
  },

  render: function() {
    return (
      <div>
        <input type="file" onChange={this.uploadFile} class="form-control"/>
      </div>
    );
  }
});
