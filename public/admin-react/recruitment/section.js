'use strict';
const React = require('react');
const VideoEditor = require('recruitment/videoEditor');
const TextOne  = require('recruitment/textOne');
const TextTwo  = require('recruitment/textTwo');
const TextThree  = require('recruitment/textThree');

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
