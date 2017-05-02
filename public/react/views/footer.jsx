'use strict';
import React from 'react';
import Social from './footer_social.jsx';
import trans from 'langs/app';

export default React.createClass({
  getInitialState: function() {
    return {
      showContact: false
    }
  },

  toggleContact: function(e) {
    e.preventDefault();
    this.setState({
      showContact: this.state.showContact ? false : true
    });
  },

  render: function() {
    return (
      <div className="footer-container">
      <div className="container">
        <div className="row">
          <div className="col-lg-2"></div>
          <div className="col-lg-10">
            <div id="footer">
            <a href="http://brandspa.com" target="_blank" style={{'float': 'right', 'paddingLeft': '15px', opacity: '.3'}} >
                <img width="20" src="http://brandspa.com/wp-content/uploads/GotaWhite.svg" alt="brandspa" />
              </a>
              <div className="pull-left">
                <Social />
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
