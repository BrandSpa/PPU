'use strict';
var React = require('react');
var request = require('superagent');
var _ = require('lodash');
var TopBar = require('views/top_bar.jsx');
var trans = require('langs/app');
var Area = require('views/areas/area.jsx');
var getLang = require('utils/get_lang');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      areas: []
    }
  },

  componentDidMount: function() {
    request
      .get('/api/categories')
      .query({'lang': getLang})
      .end(function(err, res) {
        this.setState({
          areas: this.state.areas.concat(res.body)
        });
      }.bind(this));
  },

  render: function() {
    var areaNodes = this.state.areas.map(function(area) {
      return (<Area key={area.id} area={area} history={this.props.history} />);
    }.bind(this));

    return (
      <div>
        <TopBar title={trans.practiceAreas} hidden={true} />
        <div id="categories">
        {areaNodes}
      </div>
      </div>

    );
  }
});
