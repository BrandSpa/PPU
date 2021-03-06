'use strict';
var React = require('react');
var request = require('superagent');
var $ = require('jquery');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      showError: false
    }
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var data = {user: {email: null, password: null}};
    var inputs = $(e.currentTarget).find('input');
    var username = $(inputs[0]).val();
    var password = $(inputs[1]).val();

    data["user"]["email"] = username;
    data["user"]["password"] = password;

    var csrf = $("meta[name='csrf-token']").attr("content");

    request
    .post('/users/sign_in')
    .set('X-CSRF-Token', csrf)
    .send(data)
    .end(function(err, res) {
      if(res.xhr.responseURL.indexOf('dashboard') != -1) {
        window.location = "/dashboard";
      } else {
        this.setState({showError: !this.state.showError})
      }
    }.bind(this));
  },

  render: function() {
    return (
      <div className="panel" style={{maxWidth: "500px", "margin": "0 auto"}}>
        <div className="panel-body">
          <h4>Login</h4>
          <hr/>
          <form action="" onSubmit={this.handleSubmit}>

            <div className="form-group">
                <input type="text" placeholder="usuario" className="form-control"/>
            </div>
            <div className="form-group">
                <input type="password" placeholder="contraseña" className="form-control"/>
            </div>
            <button className="btn btn-info">Ingresar</button>

            <span style={{"margin-left": "15px"}} className={this.state.showError ? "alert alert-danger" : "hidden"}>Error en el usuario o contraseña</span>
          </form>
        </div>
      </div>
    );
  }
});