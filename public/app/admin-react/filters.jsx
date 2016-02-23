'use strict';
var React = require('react');
var Select = require('react-select');
var _ = require('underscore');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      filters: {
        keyword: null,
        country: null,
        category: null,
        position: null,
        lang: null,
        paginate: 0
      }
    }
  },

  filter: function(newFilter) {
    this.setState({
      filters: _.extend(this.state.filters, newFilter)
    });

    this.props.onFilter(this.state.filters);
  },

  filterQuery: function() {
    var val = React.findDOMNode(this.refs.query).value;
    if(val === '') val = null;
    this.filter({keyword: val});
  },

  filterCountry: function(val) {
    if(val === '') val = null;
    this.filter({country: val});
  },

  filterArea: function(val) {
    if(val === '') val = null;
    this.filter({category: val});
  },

  filterLawyerType: function(val) {
    if(val === '') val = null;
    this.filter({position: val});
  },

  filterLang: function(val) {
    if(val === '') val = null;
    this.filter({lang: val});
  },

  render: function() {
    var countriesOptions = [
      {value: 'Colombia', label: 'Colombia'},
      {value: 'Chile', label: 'Chile'},
      {value: 'Perú', label: 'Perú'},
    ];

    var langs = [
      {value: 'es', label: 'Español'},
      {value: 'en', label: 'Ingles'}
    ];

    var areasOptions = [
      "Corporativo / M&A",
      "Competencia",
      "Bancario, Financiero y Mercado de Capitales",
      "Clientes Privados y Familia",
      "Inmobiliario",
      "Propiedad Intelectual / Ciencias de la vida",
      "Impuestos y Comercio Internacional",
      "Laboral",
      "Derecho Público",
      "Energía, Minería y Recursos Naturales",
      "Telecomunicaciones",
      "Infraestructura y Proyectos",
      "Litigios",
      "Resolución de Conflictos"
      ];

    var positionOptions = [
      "Asociado",
      "Senior Counsel",
      "Socio",
      "Consultor Extranjero",
      "Especialista"
    ];

    var positions = positionOptions.map(function(area) {
      return {value: area, label: area};
    });

    var areas = areasOptions.map(function(area) {
      return {value: area, label: area};
    });

    return (
      <div className="row" style={{background: "#002756"}}>
        <form className="col-lg-3">
              <input
                ref="query"
                type="text"
                className="form-control query"
                placeholder={"Buscar"}
                onChange={this.filterQuery}
                value={this.state.filters.keyword}
                />
            </form>

             <div className={"col-sm-2 countries"}>
              <Select
                  name="form-field-name"
                  placeholder={"Seleccionar Paìs"}
                  options={countriesOptions}
                  onChange={this.filterCountry}
                  value={this.state.filters.country}
              />
            </div>

             <div className={"col-sm-3 category"}>
              <Select
                  ref="area"
                  name="form-field-name"
                  placeholder={"Seleccionar Área"}
                  options={areas}
                  onChange={this.filterArea}
                  value={this.state.filters.category}
                />
            </div>

            <div className={this.props.position ? "hidden" : "col-sm-3 lang"}>
              <Select
                  ref="lang"
                  name="form-field-name"
                  placeholder={"Seleccionar Languaje"}
                  options={langs}
                  onChange={this.filterLang}
                  value={this.state.filters.lang}
                />
            </div>

            <div className={this.props.position ? "col-sm-3 position" : "hidden"}>
                <Select
                  name="form-field-name"
                  placeholder={"Seleccionar Cargo"}
                  options={positions}
                  onChange={this.filterLawyerType}
                  value={this.state.filters.position}
                  />
            </div>

      </div>
    );
  }
});