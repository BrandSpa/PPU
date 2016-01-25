'use strict';
var React = require('react');
var Select = require('react-select');
var trans = require('langs/app');
var areas = require('langs/areas');
var $ = require('jquery');
var _ = require('lodash');

module.exports = React.createClass({
  getInitialState: function() {
    return {
     files: {
      cv: null,
      certificationRanking: null,
      gatheringNotes: null,
     },
     selects: {
      englishLevel: null,
      university: null,
     },
      data: {}
    }
  },

  onChangePreferredArea: function(values) {

  },

  handleChange: function(e){
    var name = $(e.target).attr('name');
    var val = $(e.target).val();

  },

  handleFile: function(e) {
   var name = $(e.target).attr('name');
    var file = $(e.target)[0].files[0];
    var obj = {};
    obj[name] = file;

    this.setState({files: _.extend(this.state.files, obj)});
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var form = $(e.target)[0];
    var formData = new FormData(form);

    $.ajax({
      url: "/api/curriculums",
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false
      })
    .then(function(res) {
      return next(res);
    });
  },

  render: function() {

    var areaOptions = areas.map(function(item) {
      return {label: item, value: item};
    });

    var englishOptions = ['basico', 'intermedio', 'avanzado'].map(function(item) {
      return {label: item, value: item};
    });

    var universityOptions = [
    'Universidad de Los Andes',
    'Colegio de Nuestra Señora Universidad del  Rosario',
    'Universidad Externado de Colombia',
    'Pontificia Universidad Javeriana',
    'Otras / Escriba Cual. (Otro campo)'
    ].map(function(item) {
      return {label: item, value: item};
    });

    return (
      <div>
        <form action="#" className="form form-recruitment" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="">{trans.name}</label>
              <input name="name" type="text" className="form-control" onChange={this.handleChange}/>
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="">{trans.lastname}</label>
              <input name="lastname" type="text" className="form-control" onChange={this.handleChange}/>
            </div>

            <div className="form-group col-md-6">
              <label>Fecha nacimiento</label>
              <input name="birthday" type="text" placeholder="02/10/1885" className="form-control" onChange={this.handleChange}/>
            </div>

              <div className="form-group col-md-6">
                <label htmlFor="">Año Egreso Pre-grado</label>
                <input name="graduationYear" type="text" className="form-control" onChange={this.handleChange}/>
              </div>

              </div>

              <div className="row">
              <div className="form-group col-md-6">
                <label htmlFor="">Universidad *Aplica Colombia</label>
                <Select
                  name="university"
                  options={ universityOptions}
                  placeholder="Seleccionar universidad"
                  />
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="">Universidad *Aplica Chile</label>
                <input name="Another_university" type="text"  className="form-control" onChange={this.handleChange}/>
              </div>
              </div>

              <div className="row">
                   <div className="form-group col-md-6">
                <label htmlFor="">Nivel inglés</label>
                <Select
                  name="englishLevel"
                  options={englishOptions}
                  placeholder="Seleccionar nivel"
                  />
              </div>

              <div className="form-group col-md-6">
                  <label htmlFor="">Áreas de Preferencia</label>
                  <Select
                    options={areaOptions}
                    multi={true}
                    onChange={this.onChangePreferredArea}
                    placeholder="Seleccionar áreas"
                  />
              </div>
              </div>

              <div className="row">
                 <div className="form-group col-md-6">
                <label htmlFor="">Examen de Grado rendido</label>
                <br/>
                <label htmlFor="grade_approved" className="checkbox-inline">
                  <input type="radio" name="grade_approved" value="si"/>  Si
                </label>

                <label htmlFor="grade_approved" className="checkbox-inline">
                   <input type="radio" name="grade_approved" value="no"/> No
                </label>

              </div>
              </div>
              <div className="row">
              <div className="form-group col-md-6">
                <label htmlFor="">Currículum (pdf, docx)</label>
                <input name="cv" ref="cv" onChange={this.handleFile} type="file" />
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="">Certificado de ranking de egreso (pdf, docx)</label>
                <input name="certificationRanking" ref="certificationRanking" onChange={this.handleFile} type="file" />
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="">Concentración de notas / egreso (pdf, docx) </label>
                <input name="gatheringNotes" ref="gatheringNotes" onChange={this.handleFile} type="file" />
              </div>
            </div>
            <button className="btn send-cv">Enviar</button>
          </form>

        </div>
    );
  }
});