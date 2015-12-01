'use strict';
var React = require('react');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      collection: []
    }
  },

  render: function() {
    var awardNodes = this.props.collection.map(function(model) {
      return (
        <div className="award">
        <div className="img-container">
          <img src={model.img_name.url} alt={model.title} />
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