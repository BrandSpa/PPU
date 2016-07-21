'use strict';
const Backbone = require('backbone');
const React = require('react');
const ReactDOM = require('react-dom');
const Probono = require('probono/section');
const Us = require('us/section');
const Recruitment = require('recruitment/section');
const Posts = require('posts/section');
const Lawyers = require('lawyers/section');
const Experiences = require('experiences/section');
const Sidebar = require('./sidebar');
const Login = require('./login');
const ActualCreate = require('actual/form');

const wrap = document.getElementById('wrap');

const Router = Backbone.Router.extend({
  routes: {

    'admin/probono': function() {
      ReactDOM.render(<Probono />, wrap);
    },

    'admin/nosotros': function() {
      ReactDOM.render( <Us />, wrap );
    },

    'admin/trabaje-con-nosotros': function() {
      ReactDOM.render( <Recruitment />, wrap );
    },

    'admin/posts2': function() {
      ReactDOM.render( <Posts />, wrap );
    },

    'admin/lawyers2': function() {
      ReactDOM.render( <Lawyers />, wrap );
    },

    'admin/experiences2': function() {
      ReactDOM.render( <Experiences />, wrap );
    },

    'users/sign_in': function() {
      ReactDOM.render( <Login />, wrap );
    },

    'admin/the-actual-pe/new': function() {
      ReactDOM.render(<ActualCreate />, wrap);
    }
  }
});

const Route = new Router;

if(window.location.pathname != "/users/sign_in") {
   ReactDOM.render(
    <Sidebar />,
    document.getElementById('admin-sidebar')
  );
}

Backbone.history.start({pushState: true});
