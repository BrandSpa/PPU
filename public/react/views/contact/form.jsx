'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import trans from 'langs/app';
import Select from 'react-select';
import request from 'superagent';
import $ from 'jquery';
import {extend, keys} from 'underscore';

export default React.createClass({
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

  componentDidMount() {
    this.setState({country: this.props.country});
  },

  componentWillReceiveProps(props) {
    this.setState({country: props.country});
  },

  handleChange: function(field, e) {
    let val = e.currentTarget.value;
    var data = extend(this.state, {[field]: val});
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

        keys(res.body).map(function(err) {
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
               onChange={this.handleChange.bind(null, 'name')}
            />
         </div>

       <div className="form-group">
          <label >{trans.lastname}</label>
          <input
            ref="lastname"
            name="lastname"
            type="text"
            className="form-control"
            onChange={this.handleChange.bind(null, 'lastname')}
          />
       </div>

       <div className="form-group">
          <label>Email</label>
          <input
            ref="email"
            name="email"
            type="text"
            className="form-control"
            onChange={this.handleChange.bind(null, 'email')}
          />

       </div>

        <div className="form-group">
            <label >{trans.message}</label>
            <textarea
            ref="message"
            name="message"
            rows="5"
            className="form-control"
            onChange={this.handleChange.bind(null, 'message')}></textarea>
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
