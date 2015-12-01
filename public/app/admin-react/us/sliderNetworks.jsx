'use strict';
var React = require('react');
var $ = require('jquery');
var request = require('superagent');
var Upload = require('upload.jsx');
var Sortable = require('sortablejs');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      sliderNetworks: [],
      csrf: $("meta[name='csrf-token']").attr("content")
    }
  },

  componentDidMount: function() {
    this.fetch();
     var _this = this;
    var el = document.getElementById('sliderNetworks');
    var sortable = Sortable.create(el, {
      onEnd: function (evt) {
        _this.updatePosition(evt.target);
      },
    });
  },

  fetch: function() {
    request
      .get('/api/sliders')
      .query({'name': 'usNetworks'})
      .end(function(err, res) {
        this.setState({sliderNetworks: res.body});
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
      sliderNetworks: this.state.sliderNetworks.concat([item])
    });
  },

  handleDelete: function(item, e) {
    e.preventDefault();

    request
    .del('/api/sliders/' + item.id)
    .set('X-CSRF-Token', this.state.csrf)
    .end(function(err, res) {
      var without = _.reject(this.state.sliderNetworks, function(slide) {return slide.id == item.id });
      this.setState({
        sliderNetworks: without
      });
    }.bind(this));
  },

  render: function() {
    var position;
    var sliderNetworks = this.state.sliderNetworks;
    var lastPosition = _.max(sliderNetworks, function(item){ return item.position; }).position;

    var sliderItems = sliderNetworks.map(function(item) {
      return (
        <tr key={item.id} data-id={item.id}>
          <td>
            <img src={item.slider_image.url} width="70"/>
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
        <div className="form-group">
        <label htmlFor="">Subir imágen</label>
        <Upload
          name="usNetworks"
          position={position}
          onAdd={this.handleAdd}
        />
      </div>

      <h5>Slider Redes</h5>
        <table className="table">
          <tbody id="sliderNetworks">
            {sliderItems}
          </tbody>
        </table>
      </div>

    );
  }
});