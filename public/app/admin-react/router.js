var Backbone = require('backbone');
var React = require('react');
var Probono = require('probono/section.jsx');
var Us = require('us/section.jsx');
var Recruitment = require('recruitment/section.jsx');
var Posts = require('posts/section.jsx');
var Lawyers = require('lawyers/section.jsx');

var Router = Backbone.Router.extend({
  routes: {
    'admin/probono': function() {
      React.render(
        <Probono />,
        document.getElementById('wrap')
      );
    },

    'admin/nosotros': function() {
      React.render(
        <Us />,
        document.getElementById('wrap')
      );
    },

    'admin/trabaje-con-nosotros': function() {
      React.render(
        <Recruitment />,
        document.getElementById('wrap')
      );
    },

    'admin/posts2': function() {
      React.render(
        <Posts />,
        document.getElementById('wrap')
      );
    },

    'admin/lawyers2': function() {
      React.render(
        <Lawyers />,
        document.getElementById('wrap')
      );
    },
  }
});

var Route = new Router;

Backbone.history.start({pushState: true});