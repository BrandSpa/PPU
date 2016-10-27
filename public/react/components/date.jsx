'use strict';
var React = require('react');
var moment = require('moment');
var getLang = require('utils/get_lang');
require('moment/locale/es');

module.exports = React.createClass({

  render: function() {
    var date = moment(this.props.date).locale(getLang).format("dddd, MMMM D YYYY");

    return (
      <span className="date">{date}</span>
    );
  }
});
