'use strict';
var React = require('react');
var $ = require('jquery');
var TextSlider = require('TextSlider.jsx');
var request = require('superagent');
var Sortable = require('sortablejs');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      sliderPhrases: [],
      csrf: $("meta[name='csrf-token']").attr("content")
    }
  },

  componentDidMount: function() {
    this.fetch();
    var _this = this;
    var el = document.getElementById('sliderPhrases');
    var sortable = Sortable.create(el, {
      onEnd: function (evt) {
        _this.updatePosition(evt.target);
      },
    });
  },

  fetch: function() {
    request
      .get('/api/sliders')
      .query({'name': 'usPhrases'})
      .end(function(err, res) {
        this.setState({sliderPhrases: res.body});
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
    console.log(item);
    this.setState({
      sliderPhrases: this.state.sliderPhrases.concat([item])
    });
  },

  handleDelete: function(item, e) {
    e.preventDefault();

    request
    .del('/api/sliders/' + item.id)
    .set('X-CSRF-Token', this.state.csrf)
    .end(function(err, res) {
      var without = _.reject(this.state.sliderPhrases, function(slide) {return slide.id == item.id });
      this.setState({
        sliderPhrases: without
      });
    }.bind(this));
  },

  render: function() {
    var sliderPhrases =  this.state.sliderPhrases;
    var lastPosition = _.max(sliderPhrases, function(item){ return item.position; }).position;

    var sliderNodes = sliderPhrases.map(function(item, i) {
      return (
        <tr key={item.id} data-id={item.id}>
          <td>{item.text}</td>
          <td>{item.title}</td>
          <td><button
              className="btn btn-sm btn-danger"
              onClick={this.handleDelete.bind(null, item)}
              >Eliminar</button></td>
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
        <TextSlider
          name="usPhrases"
          position={position}
          onAdd={this.handleAdd}
        />
        <table className="table">
          <tbody id="sliderPhrases">
            {sliderNodes}
          </tbody>
        </table>
      </div>
    );
  }
});