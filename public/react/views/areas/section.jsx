'use strict';
import React from 'react';
import request from 'superagent';
import _ from 'lodash';
import TopBar from 'views/top_bar.jsx';
import trans from 'langs/app';
import Area from 'views/areas/area.jsx';
import getLang from 'utils/get_lang';

export default React.createClass({
  getInitialState() {
    return {
      areas: []
    }
  },

  componentDidMount() {
    request
      .get('/api/categories')
      .query({'lang': getLang})
      .end(function(err, res) {
        this.setState({
          areas: this.state.areas.concat(res.body)
        });
      }.bind(this));
  },

  render() {
    var areaNodes = this.state.areas.map(function(area) {
      return (<Area key={area.id} area={area} history={this.props.router} />);
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
