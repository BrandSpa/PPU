var Backbone = require('backbone');
var React = require('react');
var Probono = require('probono/section.jsx');
var Us = require('us/section.jsx');
var Recruitment = require('recruitment/section.jsx');

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
  }
});

var Route = new Router;

Backbone.history.start({pushState: true});