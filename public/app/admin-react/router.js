var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var Probono = require('probono/section.jsx');
var Us = require('us/section.jsx');
var Recruitment = require('recruitment/section.jsx');
var Posts = require('posts/section.jsx');

var Lawyers = require('lawyers/section.jsx');
var Experiences = require('experiences/section.jsx');
var Sidebar = require('sidebar.jsx');
var Login = require('login.jsx');

var Router = Backbone.Router.extend({
  routes: {

    'admin/probono': function() {
      ReactDOM.render(<Probono />, document.getElementById('wrap'));
    },

    'admin/nosotros': function() {
      ReactDOM.render(
        <Us />,
        document.getElementById('wrap')
      );
    },

    'admin/trabaje-con-nosotros': function() {
      ReactDOM.render(
        <Recruitment />,
        document.getElementById('wrap')
      );
    },

    'admin/posts2': function() {
      ReactDOM.render(
        <Posts />,
        document.getElementById('wrap')
      );
    },

    'admin/lawyers2': function() {
      ReactDOM.render(
        <Lawyers />,
        document.getElementById('wrap')
      );
    },

    'admin/experiences2': function() {
      ReactDOM.render(
        <Experiences />,
        document.getElementById('wrap')
      );
    },

    'users/sign_in': function() {
      ReactDOM.render(
        <Login />,
        document.getElementById('wrap')
      );
    }
  }
});

var Route = new Router;

if(window.location.pathname != "/users/sign_in") {
   ReactDOM.render(
    <Sidebar />,
    document.getElementById('admin-sidebar')
  );
}
