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

             <label>{trans.name}</label>
            <input
              ref="name"
              type="text"
              className="form-control"
               onChange={this.handleChange}
            />
         </div>

       <div className="form-group">
          <label >{trans.lastname}</label>
          <input
            ref="lastname"
            type="text"
            className="form-control"
            onChange={this.handleChange}
          />
       </div>

       <div className="form-group">
          <label>Email</label>
          <input
            ref="email"
            type="text"
            className="form-control"
            onChange={this.handleChange}
          />

       </div>

        <div className="form-group">
            <label >{trans.message}</label>
            <textarea
            ref="message"
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
