'use strict';
const React = require('react');
const $ = require('jquery');
const Upload = require('../upload');
const request = require('superagent');
const Sortable = require('sortablejs');

module.exports = React.createClass({

  getInitialState() {
    return {
      sliderAwards: [],
      csrf: $("meta[name='csrf-token']").attr("content")
    }
  },

  componentDidMount() {
    this.fetch();
    const _this = this;
    const el = document.getElementById('sliderAwards');
    const sortable = Sortable.create(el, {
      onEnd(evt) {
        _this.updatePosition(evt.target);
      },
    });
  },

  fetch() {
    request
      .get('/api/sliders')
      .query({'name': 'usAwards'})
      .end((err, res) => this.setState({sliderAwards: res.body}));
  },

  updatePosition(target) {
    $.map($(target).find('tr'), item => {
      const pos = $(item).index();
      const id = $(item).data('id');

      request
        .put('/api/sliders/' + id)
        .set('X-CSRF-Token', this.state.csrf)
        .send({position: pos})
        .end((err, res) => {

        });
    });
  },

  handleAdd(item) {

    this.setState({
      sliderAwards: this.state.sliderAwards.concat([item])
    });
  },

  handleDelete(item, e) {
    e.preventDefault();

    request
    .del('/api/sliders/' + item.id)
    .set('X-CSRF-Token', this.state.csrf)
    .end((err, res) => {
      const without = _.reject(this.state.sliderAwards, slide => slide.id == item.id);
      this.setState({
        sliderAwards: without
      });
    });
  },

  handleChangeText(item, e) {
    request
      .put('/api/sliders/' + item.id)
      .set('X-CSRF-Token', this.state.csrf)
      .send({text: React.findDOMNode(this.refs["text-" + item.id]).value})
      .end((err, res) => {

      });
  },

  render() {
    const sliderAwards =  this.state.sliderAwards;
    const lastPosition = _.max(sliderAwards, item => item.position).position;

    const sliderNodes = sliderAwards.map((item, i) => <tr key={item.id} data-id={item.id}>
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
              </tr>);

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
