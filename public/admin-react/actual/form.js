'use strict';
import React from 'React';
import Editor from 'actual/editor';
import Lawyers from 'actual/lawyers';
import Upload from 'actual/upload';
import Gallery from 'actual/gallery';
import DatePicker from 'actual/date';
import Categories from 'actual/categories';
import $ from 'jquery';
import _ from 'underscore';

module.exports = React.createClass({
  componentWillMount() {

    if(this.props.post_id) {
      this.fetch();
    }
  },

  fetch() {
    $.ajax({
      type: 'get',
      url: `/api/posts/${this.props.post_id}`
    })
    .then(res => this.setState({fields: _.extend(this.state.fields, res)}));
  },

  getInitialState() {
    return {
      content: '',
      showGallery: false,
      image: '',
      fields: {
        author: '',
        country: '',
        lang: 'es',
        date: '',
        title: '',
        content: '',
        img_name: '',
        gallery_id: '',
        category_ids: [],
        lawyer_ids: []
      }
    }
  },

  handleChangeText(html) {
    this.handleChange({content: html});
  },

  handleSubmit(e) {
    e.preventDefault();
    let formData = new FormData();
    let data = Object.keys(this.state.fields)
    .forEach(key => {
      let val = this.state.fields[key];

      if(Array.isArray(val)) {
        val.forEach(i => formData.append(`fields[${key}][]`, i) );
      } else {
        formData.append(`fields[${key}]`, val);
      }

    });

    const token = $("meta[name='csrf-token']").attr("content");

    if(this.props.post_id) {
      this.update(formData, token);
    } else {
      this.store(formData, token);
    }

  },

  update(formData, token) {
    $.ajax({
      type: 'put',
      url: `/api/posts/${this.props.post_id}`,
      data: formData,
      headers: {'X-CSRF-Token': token},
      processData: false,
      cache: false,
      contentType: false
    })
    .then(res => console.log(res));
  },

  store(formData, token) {
    $.ajax({
      type: 'post',
      url: '/api/posts',
      data: formData,
      headers: {'X-CSRF-Token': token},
      processData: false,
      cache: false,
      contentType: false
    })
    .then(res => {
      console.log(res);
    });
  },

  handleLawyers(lawyers, lawyer_ids) {
    this.handleChange({lawyers, lawyer_ids});
  },

  handleCategories(category_ids) {
    this.handleChange({category_ids});
  },

  handleChange(data) {
    let fields = _.extend(this.state.fields, data);
    this.setState({fields});
  },

  toggleGallery(e) {
    e.preventDefault();
    this.setState({showGallery: !this.state.showGallery})
  },

  render() {
    return (
      <div>
        <div className="panel">
          <div className="panel-body">
            <div className="row">
              <div className="form-group col-sm-12">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Título"
                  onChange={e => this.handleChange({title: e.currentTarget.value})}
                  value={this.state.fields.title}
                />
              </div>

              <div className="form-group col-sm-6">
                  <input
                  type="text"
                  className="form-control"
                  placeholder="Autor"
                  onChange={e => this.handleChange({author: e.currentTarget.value})}
                  value={this.state.fields.author}
                  />
              </div>

              <div className="form-group col-sm-6">
                <select className="form-control" value={this.state.fields.lang}>
                  <option value="es">Español</option>
                  <option value="en">English</option>
                </select>
              </div>

              <div className="form-group col-sm-6">
                <select className="form-control" value={this.state.fields.country}>
                  <option value="Colombia">Colombia</option>
                  <option value="Chile">Chile</option>
                  <option value="Perú">Perú</option>
                  <option value="Global">Global</option>
                </select>
              </div>

              <div className="form-group col-sm-6">
                <DatePicker
                  default={this.state.fields.date}
                  styles="form-control"
                  onChange={(obj, str) => this.handleChange({date: str})}
                  />
              </div>
            </div>
              <Editor
                onChange={this.handleChangeText}
                defaultValue={this.state.fields.content}
              />

          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
          <div className="panel">
            <div className="panel-body">
            <Categories
              onChange={this.handleCategories}
              categories={this.state.fields.categories}
            />
            </div>
          </div>

          </div>

          <div className="col-sm-6">
            <div className="panel" style={{minHeight: '300px'}}>
              <div className="panel-body">
                <Lawyers
                  lawyers={this.state.fields.lawyers}
                  onChange={this.handleLawyers}
                  />
              </div>
            </div>
          </div>

          <div className="col-sm-6">
            <div className="panel" style={{minHeight: '300px'}}>
              <div className="panel-body">

              <div className="form-group">
                <button className="btn" onClick={this.toggleGallery}>Seleccionar Imagén</button>
              </div>

                <Gallery onSelect={img => this.setState({image: img, showGallery: false})} show={this.state.showGallery} />
                <img src={this.state.fields.img_name ? this.state.fields.img_name.url : ''} className="img-responsive" />
                <Upload onChange={file => console.log(file)} />
              </div>
            </div>
          </div>

        </div>
        <button className="btn btn-primary pull-right" onClick={this.handleSubmit}>Guardar</button>
      </div>
    )
  }
});
