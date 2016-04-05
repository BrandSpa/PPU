'use strict';
var React = require('react');
var Social = require('footer_social.jsx');
var ContactForm = require('footer_contact_form.jsx');
var trans = require('langs/app');

module.exports = React.createClass({
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
              <div className="pull-right">
                <a href="#" className="policy">{trans.dataProcessingPolicy}</a>
              </div>
              <Social />

            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
