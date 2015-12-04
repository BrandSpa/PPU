'use strict';
var React = require('react');
var request = require('superagent');
var SliderMain = require('us/sliderMain.jsx');
var SliderPhrases = require('us/sliderPhrases.jsx');
var SliderNetworks = require('us/sliderNetworks.jsx');
var SliderAwards = require('us/sliderAwards.jsx');
var TextEditor = require('textEditor.jsx');
var VideoEditor = require('recruitment/videoEditor.jsx');
var TextOne  = require('recruitment/textOne.jsx');
var TextTwo  = require('recruitment/textTwo.jsx');
var TextThree  = require('recruitment/textThree.jsx');

module.exports = React.createClass({
   getInitialState: function() {
    return {
      content: {
        id: null,
        page: '',
        text_es: null,
        title_es: null,
        text_en: null,
        title_en: null,
      },

      csrf: $("meta[name='csrf-token']").attr("content")
    }
  },

  componentDidMount: function() {

  },

  render: function() {
    return (
      <div className="panel">
        <div className="panel-body">
          <VideoEditor />
          <TextOne />
          <TextTwo />
          <TextThree />
        </div>
      </div>
    );
  }
});