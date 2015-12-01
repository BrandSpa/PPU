'use strict';
var React = require('react');
var $ = require('jquery');
var createHistory = require('history').createHistory;
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var App = require('views/app.jsx');
var Post = require('views/post/section.jsx');
var lawyers = require('views/lawyers/section.jsx');
var lawyer = require('views/lawyer/section.jsx');
var areas = require('views/areas/section.jsx');
var area = require('views/area/section.jsx');
var experiences = require('views/experiences/section.jsx');
var experience = require('views/experience/section.jsx');
var probono = require('views/probono/section.jsx');
var us = require('views/us/section.jsx');
var theActual = require('views/posts/the_actual.jsx');
var theActualColombia = require('views/posts/the_actual_colombia.jsx');

React.render((
  <Router history={ createHistory() }>
    <Route path="/" component={App}>
      <Route path="/posts/:slug" component={Post} />
      <Route path="/abogados" component={lawyers} />
      <Route path="/abogados/:slug" component={lawyer} />
      <Route path="/areas" component={areas} />
      <Route path="/areas/:slug" component={area} />
      <Route path="/experiencias" component={experiences} />
      <Route path="/experencias/:slug" component={experience} />
      <Route path="/nosotros" component={us} />
      <Route path="/probono" component={probono}/>
      <Route path="/el-actual" component={theActual} />
      <Route path="/el-actual-colombia" component={theActualColombia} />
    </Route>

    <Route path="/admin">
    </Route>
  </Router>
), document.body);
