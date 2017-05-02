'use strict';
import React from 'react';

export default React.createClass({
  getDefaultProps() {
    return {
      collection: []
    }
  },

  render() {

    var awardNodes = this.props.collection.map(function(model) {
      return (
        <div className="award">
        <div className="img-container">
          <img src={model.img_name.url} className={model.img_name.url ? "" : "hidden"} />

        </div>
        <h5>{model.title}</h5>
      </div>
      );
    });

    return (
       <div>
       {awardNodes}
       </div>
    );
  }
});