'use strict';
const React = require('react');
const $ = require('jquery');
const request = require('superagent');
const Sortable = require('sortablejs');
const TextSlider = require('../TextSlider');

module.exports = React.createClass({

  getInitialState() {
    return {
      sliderPhrases: [],
      csrf: $("meta[name='csrf-token']").attr("content")
    }
  },

  componentDidMount() {
    this.fetch();
    const _this = this;
    const el = document.getElementById('sliderPhrases');
    const sortable = Sortable.create(el, {
      onEnd(evt) {
        _this.updatePosition(evt.target);
      },
    });
  },

  fetch() {
    request
      .get('/api/sliders')
      .query({name: 'usPhrases'})
      .end((err, res) => this.setState({sliderPhrases: res.body}));
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
    console.log(item);
    this.setState({
      sliderPhrases: this.state.sliderPhrases.concat([item])
    });
  },

  handleDelete(item, e) {
    e.preventDefault();

    request
    .del(`/api/sliders/${item.id}`)
    .set('X-CSRF-Token', this.state.csrf)
    .end((err, res) => {
      const without = _.reject(this.state.sliderPhrases, slide => slide.id == item.id);
      this.setState({
        sliderPhrases: without
      });
    });
  },

  render() {
    const sliderPhrases =  this.state.sliderPhrases;
    const lastPosition = _.max(sliderPhrases, item => item.position).position;

    const sliderNodes = sliderPhrases.map((item, i) => <tr key={item.id} data-id={item.id}>
                <td>{item.text}</td>
                <td>{item.title}</td>
                <td><button
          className="btn btn-sm btn-danger"
          onClick={this.handleDelete.bind(null, item)}
          >Eliminar</button></td>
              </tr>);

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
