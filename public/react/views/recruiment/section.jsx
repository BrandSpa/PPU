'use strict';
var React = require('react');
var TopBar = require('views/top_bar.jsx');
var trans = require('langs/app');
var areas = require('langs/areas');
var StepForm = require('views/recruiment/stepForm.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return {
    }
  },


  render: function() {
    return (
      <div>
        <TopBar title={trans.recruitment} hidden />
        <div id="work-with-us">
          <StepForm />
        </div>
      </div>
    );
  }
});
