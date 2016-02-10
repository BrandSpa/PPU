'use strict';
var React = require('react');
var _ = require('lodash');
var $ = require('jquery');
var getLang = require('utils/get_lang');
var trans = require('langs/app');
var Select = require('react-select');
var areaOptions = require('langs/areas');
var lawyerTrans = require('langs/lawyer');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      toTop: false,
      showFilters: false,
      filters: {
        keyword: null,
        country: null,
        category: null,
        position: null
      }
    }
  },

  componentDidMount: function() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
  },

  componentWillUnmount: function() {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  },

  handleScroll: function() {
    var topPadding;

    if ($(window).width() < 768) {
      topPadding = 200;
    } else if ($(window).width() > 768 && $(window).width() <= 992) {
      topPadding = 150;
    } else if ($(window).width() > 992 && $(window).width() <= 1200) {
      topPadding = 35;
    } else {
      topPadding = 35;
    }

   if(document.body.scrollTop > topPadding || document.documentElement.scrollTop > topPadding) {
    this.setState({
      toTop: true
    });
   } else {
      this.setState({
      toTop: false
    });
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

  toggleFilters: function() {
    this.setState({showFilters: this.state.showFilters ? false : true});
  },

  goBack: function(e) {
    e.preventDefault();
    window.scrollTo(0, 0);
    window.history.back();
  },

  render: function() {
    var cityOptions = [
      {value: 'Colombia', label: 'Colombia'},
      {value: 'Chile', label: 'Chile'}
    ];

    var areas = areaOptions.map(function(area) {
      return {value: area, label: area};
    });

    var lawyerTypesOptions = [
      lawyerTrans.lawyer,
      lawyerTrans.seniorCounsel,
      lawyerTrans.partner,
      lawyerTrans.associated,
      lawyerTrans.foreignConsultant,
      lawyerTrans.specialist,
    ];

    var lawyerTypes = lawyerTypesOptions.map(function(option) {
      return {value: option, label: option};
    });

    var lang;
    var link;
    var pathname = this.props.pathname || window.location.pathname;
    if(getLang === 'es')
    {
      link = this.props.link || "http://en." + window.location.hostname + pathname;
      lang = <a href={link} className="change-lang-page">English</a>;
    } else {
      link = this.props.link || "http://" + window.location.hostname.replace('en.', '') + pathname;
      lang = <a href={link} className="change-lang-page">Español</a>;
    }

    return (
      <div className={this.state.toTop ? "top-bar-container to-top" : "top-bar-container"}>
      <div className={this.state.toTop ? "container" : ""}>
        <div className="row">

        <div className={this.state.toTop ? "col-lg-9 col-xs-12" : "col-lg-11 col-xs-12"}>
          <div id="top-bar">

          <a href="#" className={this.props.back ? "back" : "hidden"} onClick={this.goBack}>
            <span className="icon ion-ios-arrow-back"></span>
          </a>

            <h1>{this.props.title}</h1>
             <a href="#" className="open-filters" onClick={this.toggleFilters}><i className="fa fa-bars"></i> filtrar</a>

          <div className={this.props.hidden ? 'hidden' : ''} style={this.state.showFilters ? {background: '#002855', 'float': 'left', 'width': '100%', margin: '30px 0'} : {}}>

            <form className={this.state.showFilters ? "" : "form-group search"}>
              <input
                ref="query"
                type="text"
                className="form-control query"
                placeholder={trans.search}
                onChange={this.filterQuery}
                value={this.state.filters.keyword}
                />
            </form>

            <div className={this.state.showFilters ? "" : "col-sm-2 countries"}>
              <Select
                  name="form-field-name"
                  placeholder={trans.country}
                  options={cityOptions}
                  onChange={this.filterCountry}
                  value={this.state.filters.country}
              />
            </div>

            <div className={this.state.showFilters ? "" : "col-sm-3 category"}>
              <Select
                  ref="area"
                  name="form-field-name"
                  placeholder={trans.areas}
                  options={areas}
                  onChange={this.filterArea}
                  value={this.state.filters.category}
                />
            </div>
            <div className={this.props.position ? "" : "hidden"}>
              <div className={this.state.showFilters ? "" : "col-sm-3 position"}>
                <Select
                  name="form-field-name"
                  placeholder={trans.lawyerType}
                  options={lawyerTypes}
                  onChange={this.filterLawyerType}
                  value={this.state.filters.position}
                  />
              </div>
            </div>

            </div>
          </div>
        </div>

          <div className="col-lg-1 visible-lg change-lang-container">
          {lang}
          </div>

          </div>
        </div>
      </div>
    );
  }
});