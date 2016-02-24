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
      english: null,
      university: null,
      areas: null
     },
      data: {},
      sendText: "Enviar"
    }
  },

handleSelect: function(e, a) {
  var obj = {};
  obj[e] = a;
  this.setState({selects: _.extend(this.state.selects, obj)});
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
    $.ajaxSetup({
      headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      }
    });

    $.ajax({
      url: "/api/curriculums",
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      beforeSend: this.handleLoading
    })
    .then(function(res) {
      this.props.onSubmit();
    }.bind(this));

  },

  handleLoading: function() {
    this.setState({sendText: "Enviando..."});
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

    var showColombia = false;

    if(this.props.country == "Colombia") {
      showColombia = true;
    }

    return (
      <div>
        <form action="#" className="form form-recruitment" onSubmit={this.handleSubmit}>
          <input name="country" type="hidden" value={this.props.country}/>
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="">{trans.name}</label>
              <input
                name="name"
                type="text"
                className="form-control" onChange={this.handleChange}/>
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="">{trans.lastname}</label>
              <input
              name="lastname"
              type="text"
              className="form-control"
              onChange={this.handleChange}/>
            </div>

            <div className="form-group col-md-6">
              <label>Fecha nacimiento</label>
              <input
              name="birthday"
              type="text"
              placeholder="02/10/1885"
              className="form-control"
              onChange={this.handleChange}/>
            </div>

            <div className="form-group col-md-6">
                <label htmlFor="">Año Egreso Pre-grado</label>
                <input
                  name="graduation_year"
                  type="text"
                  className="form-control"
                  onChange={this.handleChange}/>
              </div>

              </div>
              <div className="row">
              <div className={showColombia ? "form-group col-md-6" : "hidden"}>
                <label htmlFor="">Universidad</label>
                <Select
                  name="university_colombia"
                  options={ universityOptions}
                  placeholder="Seleccionar universidad"
                  onChange={this.handleSelect.bind(null, "university")}
                  value={this.state.selects.university}
                  />
              </div>

              <div className={"form-group col-md-6"}>
                <label htmlFor="">Universidad</label>
                <input
                  name="university_chile"
                  type="text"
                  className="form-control"
                  onChange={this.handleChange}/>
              </div>


                   <div className="form-group col-md-6">
                <label htmlFor="">Nivel inglés</label>
                <Select
                  name="english"
                  options={englishOptions}
                  placeholder="Seleccionar nivel"
                  onChange={this.handleSelect.bind(null, "english")}
                  value={this.state.selects.english}
                  />
              </div>

              <div className="form-group col-md-6">
                  <label htmlFor="">Áreas de Preferencia</label>
                  <Select
                    name="areas"
                    options={areaOptions}
                    multi={true}
                    placeholder="Seleccionar áreas"
                    onChange={this.handleSelect.bind(null, "areas")}
                    value={this.state.selects.areas}
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
                <input
                  name="file_name"
                  ref="cv"
                  onChange={this.handleFile}
                  type="file" />
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="">Certificado de ranking de egreso (pdf, docx)</label>
                <input
                name="certification_ranking"
                ref="certificationRanking"
                onChange={this.handleFile}
                type="file" />
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="">Concentración de notas / egreso (pdf, docx) </label>
                <input
                  name="gathering_notes"
                  ref="gatheringNotes"
                  onChange={this.handleFile}
                  type="file" />
              </div>
            </div>

            <button className="btn send-cv" >{this.state.sendText}</button>
          </form>

        </div>
    );
  }
});