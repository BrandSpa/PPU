'use strict';
import React from 'react';
import request from 'superagent';
import {extend} from 'lodash';
import Waypoint from 'react-waypoint';
import Lawyer from 'views/lawyers/lawyer';
import TopBar from 'views/top_bar';
import trans from 'langs/app';
import getLang from 'utils/get_lang';

export default React.createClass({
  getInitialState() {
    var orderby = {
      order_by_spanish: '',
      order_by_english: null
    }

    if(getLang == "en") {
      var orderby = {
        order_by_spanish: null,
        order_by_english: '',
        lang: 'en'
      }
     }

    return {
      lawyers: [],
      loaded: false,
      filters: extend({
        published: 1,
        paginate: 0
      }, orderby)
    }
  },

  componentDidMount() {
    this.fetch();
  },

  handleFilter(filters) {
    var query = extend(this.state.filters, filters);

    var filters =
    request
      .get('/api/lawyers')
      .query(extend(query, {paginate: 0}))
      .end((err, res) => {
        this.setState({
          lawyers: res.body,
          loaded: true,
          filters: query
        });
      });
  },

  fetch(filters) {
    var query = this.state.filters;

    request
      .get('/api/lawyers')
      .query(query)
      .end((err, res) => {
        this.setState({
          lawyers: this.state.lawyers.concat(res.body),
          loaded: true
        });
      });
  },

  loadMore() {
    var query = this.state.filters;
    query = extend(query, {paginate: query.paginate + 20})

    request
    .get('/api/lawyers')
    .query(query)
    .end((err, res) => {
      this.setState({
      lawyers: this.state.lawyers.concat(res.body),
      filters: query
      });
    });
  },

  render() {

    var lawyerNodes =  this.state.lawyers.map((lawyer, i) => {
      return (<Lawyer key={i} lawyer={lawyer} router={this.props.router} />);
    });

    return (
      <div>
        <TopBar
          title={trans.lawyers}
          onFilter={this.handleFilter}
          position
          />
        <div id="lawyers" className="padding-top">
        
         {lawyerNodes}

        <div style={{'float': 'left', 'width': '100%'}}>
          {this.state.loaded ? <Waypoint onEnter={this.loadMore} threshold={2} /> : ''}
        </div>

        </div>
      </div>
    );
  }
});