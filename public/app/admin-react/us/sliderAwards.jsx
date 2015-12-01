'use strict';
var React = require('react');
var $ = require('jquery');
var Upload = require('upload.jsx');
var request = require('superagent');
var Sortable = require('sortablejs');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      sliderAwards: [],
      csrf: $("meta[name='csrf-token']").attr("content")
    }
  },

  componentDidMount: function() {
    this.fetch();
    var _this = this;
    var el = document.getElementById('sliderAwards');
    var sortable = Sortable.create(el, {
      onEnd: function (evt) {
        _this.updatePosition(evt.target);
      },
    });
  },

  fetch: function() {
    request
      .get('/api/sliders')
      .query({'name': 'usAwards'})
      .end(function(err, res) {
        this.setState({sliderAwards: res.body});
      }.bind(this));
  },

  updatePosition: function(target) {
    $.map($(target).find('tr'), function(item) {
      var pos = $(item).index();
      var id = $(item).data('id');

      request
        .put('/api/sliders/' + id)
        .set('X-CSRF-Token', this.state.csrf)
        .send({position: pos})
        .end(function(err, res) {

        });
    }.bind(this));
  },

  handleAdd: function(item) {

    this.setState({
      sliderAwards: this.state.sliderAwards.concat([item])
    });
  },

  handleDelete: function(item, e) {
    e.preventDefault();

    request
    .del('/api/sliders/' + item.id)
    .set('X-CSRF-Token', this.state.csrf)
    .end(function(err, res) {
      var without = _.reject(this.state.sliderAwards, function(slide) {return slide.id == item.id });
      this.setState({
        sliderAwards: without
      });
    }.bind(this));
  },

  handleChangeText: function(item, e) {
    request
      .put('/api/sliders/' + item.id)
      .set('X-CSRF-Token', this.state.csrf)
      .send({text: React.findDOMNode(this.refs["text-" + item.id]).value})
      .end(function(err, res) {

      });
  },

  render: function() {
    var sliderAwards =  this.state.sliderAwards;
    var lastPosition = _.max(sliderAwards, function(item){ return item.position; }).position;

    var sliderNodes = sliderAwards.map(function(item, i) {

      return (
        <tr key={item.id} data-id={item.id}>
          <td><img src={item.slider_image.url} width="70"/></td>
          <td>{item.title}</td>
          <td>
            <div className="form-group">
              <label>Texto</label>
              <input
                ref={"text-" + item.id}
                type="text"
                className="form-control"
                value={item.text}
                onChange={this.handleChangeText.bind(null, item)}
              />
            </div>
          </td>
          <td>
            <button
              className="btn btn-sm btn-danger"
              onClick={this.handleDelete.bind(null, item)}
              >Eliminar</button>
          </td>
        </tr>
      );
    }.bind(this));

    if(lastPosition >= 0) {
      var position = parseInt(lastPosition) + 1;
    } else {
      position = 0;
    }

    return (
      <div>
        <Upload
          name="usAwards"
          position={position}
          onAdd={this.handleAdd}
        />

        <table className="table">
          <tbody id="sliderAwards">
            {sliderNodes}
          </tbody>
        </table>
      </div>
    );
  }
});