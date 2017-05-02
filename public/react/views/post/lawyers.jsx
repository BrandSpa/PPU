'use strict';
import React from 'react';

export default React.createClass({

  render: function() {
    var lawyerNodes = this.props.collection.map(function(lawyer) {
      return (
          <li key={lawyer.id}>
          <a href={"/abogados/" + lawyer.slug}>{lawyer.name} {lawyer.lastname}</a>
          </li>
        );
    });

    return (
      <ul className="lawyers">
        {lawyerNodes}
      </ul>
    );
  }
});