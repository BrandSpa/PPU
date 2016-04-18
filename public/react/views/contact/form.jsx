'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var trans = require('langs/app');
var Select = require('react-select');
var request = require('superagent');
var $ = require('jquery');
var _ = require('underscore');

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
      name: ReactDOM.findDOMNode(this.refs.name).value,
      lastname: ReactDOM.findDOMNode(this.refs.lastname).value,
      email: ReactDOM.findDOMNode(this.refs.email).value,
      message: ReactDOM.findDOMNode(this.refs.message).value
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
    .end(function(errs, res) {
      if(errs) {

        _.keys(res.body).map(function(err) {
          $('input[name="' + err +'"], textarea[name="' + err +'"]').addClass('error');
        });

        res.body.map(function(err) {
          console.log(err);
        });

        return;
      };
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

            <label>{trans.name}</label>
            <input
              ref="name"
              name="name"
              type="text"
              className="form-control"
               onChange={this.handleChange}
            />
         </div>

       <div className="form-group">
          <label >{trans.lastname}</label>
          <input
            ref="lastname"
            name="lastname"
            type="text"
            className="form-control"
            onChange={this.handleChange}
          />
       </div>

       <div className="form-group">
          <label>Email</label>
          <input
            ref="email"
            name="email"
            type="text"
            className="form-control"
            onChange={this.handleChange}
          />

       </div>

        <div className="form-group">
            <label >{trans.message}</label>
            <textarea
            ref="message"
            name="message"
            rows="5"
            className="form-control"
            onChange={this.handleChange}></textarea>
        </div>


         <div className="form-group">
          <button
            style={{width: '100%', borderRadius: 0, background: '#19A1B2'}}
            className="btn btn-info pull-right contact-save" onClick={this.handleSubmit}>{trans.send}</button>
         </div>
       </form>
     </div>
    );
  }
});
