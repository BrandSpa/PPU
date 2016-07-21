'use strict';
const React = require('react');
const $ = require('jquery');
const request = require('superagent');
const Upload = require('probono/upload');
const Sortable = require('sortablejs');

module.exports = React.createClass({
  getInitialState() {
    return {
      sliderMain: [],
      csrf: $("meta[name='csrf-token']").attr("content")
    }
  },

  componentDidMount() {
    this.fetch();
     const _this = this;
    const el = document.getElementById('sortable');
    const sortable = Sortable.create(el, {
      onEnd(evt) {
        _this.updatePosition(evt.target);
      },
    });
  },

  fetch() {
    request
      .get('/api/sliders')
      .query({'name': 'probonoCompanies'})
      .end((err, res) => this.setState({sliderMain: res.body}));
  },

  updatePosition(target) {
    $.map($(target).find('tr'), item => {
      const pos = $(item).index();
      const id = $(item).data('id');

      request
        .put(`/api/sliders/${id}`)
        .set('X-CSRF-Token', this.state.csrf)
        .send({position: pos})
        .end((err, res) => {

        });
    });
  },

  handleAdd(item) {
    this.setState({
      sliderMain: this.state.sliderMain.concat([item])
    });
  },

  handleDelete(item, e) {
    e.preventDefault();

    request
    .del(`/api/sliders/${item.id}`)
    .set('X-CSRF-Token', this.state.csrf)
    .end((err, res) => {
      const without = _.reject(this.state.sliderMain, slide => slide.id == item.id);
      this.setState({
        sliderMain: without
      });
    });
  },

  render() {
    var position;
    const lastPosition = _.max(sliderMain, item => item.position).position;

    var sliderMain = this.state.sliderMain;

    const sliderItems = sliderMain.map(item => <tr key={item.id} data-id={item.id}>
                <td>
        <img src={item.slider_image.url} width="70"/>
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
