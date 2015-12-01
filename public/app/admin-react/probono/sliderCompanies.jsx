'use strict';
var React = require('react');
var $ = require('jquery');
var request = require('superagent');
var Upload = require('probono/upload.jsx');
var Sortable = require('sortablejs');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      sliderMain: [],
      csrf: $("meta[name='csrf-token']").attr("content")
    }
  },

  componentDidMount: function() {
    this.fetch();
     var _this = this;
    var el = document.getElementById('sortable');
    var sortable = Sortable.create(el, {
      onEnd: function (evt) {
        _this.updatePosition(evt.target);
      },
    });
  },

  fetch: function() {
    request
      .get('/api/sliders')
      .query({'name': 'probonoCompanies'})
      .end(function(err, res) {
        this.setState({sliderMain: res.body});
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
      sliderMain: this.state.sliderMain.concat([item])
    });
  },

  handleDelete: function(item, e) {
    e.preventDefault();

    request
    .del('/api/sliders/' + item.id)
    .set('X-CSRF-Token', this.state.csrf)
    .end(function(err, res) {
      var without = _.reject(this.state.sliderMain, function(slide) {return slide.id == item.id });
      this.setState({
        sliderMain: without
      });
    }.bind(this));
  },

  render: function() {
    var position;
    var lastPosition = _.max(sliderMain, function(item){ return item.position; }).position;

    var sliderMain = this.state.sliderMain;

    var sliderItems = sliderMain.map(function(item) {
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
        name="probonoCompanies"
        position={position}
        onAdd={this.handleAdd}
        />
      </div>

      <h5>Slider Principal</h5>
        <table className="table">
          <tbody id="sortable">
            {sliderItems}
          </tbody>
        </table>
      </div>

    );
  }
});