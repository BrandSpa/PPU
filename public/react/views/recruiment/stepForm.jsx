'use strict';
var React = require('react');
var Select = require('react-select');
var trans = require('langs/app');
var areas = require('langs/areas');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      step: 1,
    }
  },

  onChangePreferredArea: function(values) {

  },

    next: function(e) {
    e.preventDefault();
    if(this.state.step < 3) {
       this.setState({
      step: this.state.step + 1
    });
    }

  },

  prev: function(e) {
    e.preventDefault();
    if(this.state.step > 1) {
      this.setState({
        step: this.state.step - 1
      });
    }

  },

  handleChange: function(){
    var data = {
      name: React.findDOMNode(this.refs.name).value,
      lastname: React.findDOMNode(this.refs.lastname).value,
      birthday: React.findDOMNode(this.refs.birthday).value,
      university: React.findDOMNode(this.refs.university).value,
      graduationYear: React.findDOMNode(this.refs.graduationYear).value
    }
  },

  render: function() {
     var stepOne = false;
    var stepTwo = false;
    var stepThree = false;

    var areaOptions = areas.map(function(item) {
      return {label: item, value: item};
    });

    var englishOptions = ['basico', 'intermedio', 'avanzado'].map(function(item) {
      return {label: item, value: item};
    });

    var trueFalseOptions = ['Si', 'No'].map(function(item) {
      return {label: item, value: item};
    });

   if(this.state.step == 1) {
    stepOne = true;
   } else if(this.state.step == 2) {
    stepTwo = true;
   } else if(this.state.step == 3) {
    stepThree = true
   }

    return (
      <div>
        <form action="#" className="form">
          <div className={stepOne ? "step-1 row" : "hidden"}>
            <div className="form-group col-md-6">
              <label htmlFor="">{trans.name}</label>
              <input ref="name" type="text" className="form-control" onChange={this.handleChange}/>
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="">{trans.lastname}</label>
              <input ref="lastname" type="text" className="form-control" onChange={this.handleChange}/>
            </div>

            <div className="form-group col-md-6">
              <label>Fecha nacimiento</label>
              <input ref="birthday" type="text" placeholder="02/10/1885" className="form-control" onChange={this.handleChange}/>
            </div>
          </div>

          <div className={stepTwo ? "step-2 row": "hidden"}>
              <div className="form-group col-md-6">
                <label htmlFor="">Universidad</label>
                <input ref="university" type="text"  className="form-control" onChange={this.handleChange}/>
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="">Año Egreso Pre grado</label>
                <input ref="graduationYear" type="text" className="form-control" onChange={this.handleChange}/>
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="">Nivel inglés hablado</label>
                <Select ref="speakEnglishLevel" options={englishOptions} />
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="">Nivel inglés escrito</label>
                <Select ref="writeEnglishLevel" options={englishOptions} />
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="">Examen de Grado rendido</label>
                <Select options={trueFalseOptions} />
              </div>

              <div className="form-group col-md-6">
                  <label htmlFor="">Práctica profesional terminada</label>
                  <Select options={trueFalseOptions} />
              </div>

              <div className="form-group col-md-6">
                  <label htmlFor="">Áreas de Preferencia</label>
                  <Select
                    options={areaOptions}
                    multi={true}
                    onChange={this.onChangePreferredArea}
                  />
              </div>
            </div>

            <div className={stepThree ? "step-3 row": "hidden"}>
              <div className="form-group col-md-6">
                <label htmlFor="">CV</label>
                <input ref="cv" type="file"/>
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="">Certificado de ranking de egreso</label>
                <input ref="certificationRanking" type="file"/>
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="">Concentración de notas</label>
                <input ref="gatheringNotes" type="file"/>
              </div>
            </div>

          </form>
          <div className="btn-group">
            <button onClick={this.prev} className="btn btn-primary">Atrás</button>
            <button onClick={this.next} className="btn btn-primary">Siguiente</button>
          </div>
        </div>
    );
  }
});