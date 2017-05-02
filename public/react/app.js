'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Router, Route, browserHistory} from 'react-router';

import App from 'views/app';
import Post from 'views/post/section';
import lawyers from 'views/lawyers/section';
import lawyer from 'views/lawyer/section';
import areas from 'views/areas/section';
import area from 'views/area/section';
import experiences from 'views/experiences/section';
import experience from 'views/experience/section';
import probono from 'views/probono/section';
import us from 'views/us/section';
import recruiment from 'views/recruiment/section';
import theActual from 'views/posts/the_actual';
import theActualColombia from 'views/posts/the_actual_colombia';
import theActualPeru from 'views/posts/the_actual_peru';
import contact from 'views/contact/section';

ReactDOM.render((
  <Router history={ browserHistory }>
    <Route path="/" component={App}>
      <Route path="/posts/:slug" component={Post} />
      <Route path="/abogados" component={lawyers} />
      <Route path="/abogados/:slug" component={lawyer} />
      <Route path="/areas" component={areas} />
      <Route path="/areas/:slug" component={area} />
      <Route path="/experiencias" component={experiences} />
      <Route path="/experiencias/:slug" component={experience} />
      <Route path="/nosotros" component={us} />
      <Route path="/probono" component={probono}/>
      <Route path="/trabaje-con-nosotros" component={recruiment}/>
      <Route path="/contacto" component={contact}/>
      <Route path="/el-actual" component={theActual} />
      <Route path="/el-actual-colombia" component={theActualColombia} />
      <Route path="/el-actual-peru" component={theActualPeru} />
    </Route>
    <Route path="/admin">
    </Route>
  </Router>
), document.getElementById('app'));
