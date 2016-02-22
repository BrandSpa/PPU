'use strict';
var React = require('react');
var trans = require('langs/app');
var Select = require('react-select');
var request = require('superagent');
var $ = require('jquery');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      country: null,
      name: null,
      lastname: null,
      email: null,
      message: null,
      showMessage: false
    }
  },

  selectCountry: function(value) {
    this.setState({country: value});
  },

  handleChange: function() {
    var data = {
      name: React.findDOMNode(this.refs.name).value,
      lastname: React.findDOMNode(this.refs.lastname).value,
      email: React.findDOMNode(this.refs.email).value,
      message: React.findDOMNode(this.refs.message).value
    }
    this.setState(data);
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var csrf = $("meta[name='csrf-token']").attr("content");

    request
    .post('/api/contacts')
    .set('X-CSRF-Token', csrf)
    .send(this.state)
    .end(function(err, res) {
      this.setState({showMessage: true});
    }.bind(this));
  },

  render: function() {
    var cityOptions = [
      {value: 'Colombia', label: 'Colombia'},
      {value: 'Chile', label: 'Chile'},
      {value: 'Perú', label: 'Perú'}
    ];

    return (
      <div>
      <h5 className={this.state.showMessage ? "form_thanks" : "hidden"}>{trans.formThanks}</h5>
       <form action="#" className={this.state.showMessage ? "hidden" : "form-horizontal" }>
       <div className="form-group">
         <label className="col-sm-2 control-label">{trans.country}</label>

         <div className="col-sm-10 select-country">
          <Select
            name="country"
            placeholder={trans.selectCountry}
            options={cityOptions}
            onChange={this.selectCountry}
            value={this.state.country}
            />
         </div>
       </div>

       <div className="form-group">
         <label className="col-sm-2 control-label">{trans.name}</label>
          <div className="col-sm-10">
            <input
              ref="name"
              type="text"
              className="form-control"
               onChange={this.handleChange}
            />
         </div>
       </div>

       <div className="form-group">
        <label  className="col-sm-2 control-label">{trans.lastname}</label>
         <div className="col-sm-10">
          <input
            ref="lastname"
            type="text"
            className="form-control"
            onChange={this.handleChange}
          />
         </div>
       </div>

       <div className="form-group">
        <label className="col-sm-2 control-label">Email</label>
         <div className="col-sm-10">
          <input
            ref="email"
            type="text"
            className="form-control"
            onChange={this.handleChange}
          />
         </div>
       </div>

        <div className="form-group">
          <label  className="col-sm-2 control-label">{trans.message}</label>
          <div className="col-sm-10">
            <textarea
            ref="message"
            rows="3"
            className="form-control"
            onChange={this.handleChange}></textarea>
          </div>
        </div>

         <div className="form-group">
          <button
            className="btn btn-info pull-right contact-save" onClick={this.handleSubmit}>{trans.send}</button>
         </div>
       </form>
     </div>
    );
  }
});