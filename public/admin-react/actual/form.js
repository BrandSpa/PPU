'use strict';
import React from 'React';
import Editor from 'actual/editor';
import Lawyers from 'actual/lawyers';
import Upload from 'actual/upload';
import Gallery from 'actual/gallery';
import DatePicker from 'actual/date';
import Categories from 'actual/categories';

module.exports = React.createClass({
  componentDidMount() {
      console.log('actual form');
  },

  getInitialState() {
    return {
      content: '',
      showGallery: false,
      image: '',
      data: {
        author: '',
        country: '',
        lang: 'es',
        date: '',
        content: '',
        img_name: '',
        gallery_id: '',
        category_ids: [],
        lawyer_ids: []
      }
    }
  },

  handleChangeText(html) {
    this.setState({content: html});
  },

  handleSubmit(e) {
    e.preventDefault();
    this.setState({content: 'new content!!'});
  },

  handleLawyers(lawyer_ids) {
    console.log(lawyer_ids);
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
                />
              </div>

              <div className="form-group col-sm-6">
                  <input
                  type="text"
                  className="form-control"
                  placeholder="Autor"
                  />
              </div>

              <div className="form-group col-sm-6">
                <select className="form-control">
                  <option value="es">Español</option>
                  <option value="en">English</option>
                </select>
              </div>

              <div className="form-group col-sm-6">
                <select className="form-control">
                  <option value="Colombia">Colombia</option>
                  <option value="Chile">Chile</option>
                  <option value="Perú">Perú</option>
                  <option value="Global">Global</option>
                </select>
              </div>

              <div className="form-group col-sm-6">
                <DatePicker dateFormat="Y/m/d" styles="form-control" />
              </div>
            </div>
              <Editor onChange={this.handleChangeText} defaultValue={this.state.content} />
              <Categories onChange={category_ids => this.setState({category_ids})} />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">

          </div>

          <div className="col-sm-6">
            <div className="panel" style={{minHeight: '300px'}}>
              <div className="panel-body">
                <Lawyers onChange={this.handleLawyers} />
              </div>
            </div>
          </div>

          <div className="col-sm-6">
            <div className="panel" style={{minHeight: '300px'}}>
              <div className="panel-body">
              <div className="form-group">
                <button className="btn" onClick={e => this.setState({showGallery: !this.state.showGallery})}>Seleccionar Imagén</button>
              </div>
              <img src={this.state.image ? this.state.image.img_name.url : ''} />
                <Gallery onSelect={img => this.setState({image: img, showGallery: false})} show={this.state.showGallery} />
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
