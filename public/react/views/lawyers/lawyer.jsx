'use strict';
var React = require('react');


module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      lawyer: {}
    }
  },

  open: function() {
    this.props.history.pushState(null, '/abogados/' + this.props.lawyer.slug);
  },

  render: function() {
    var lawyer = this.props.lawyer;
    var lawyerImage;
    var position = lawyer.position;

    if(lawyer.translation) {
      lawyerImage = <img src={lawyer.translation.img_name.url } alt={ lawyer.name +" "+ lawyer.lastname +"translation"} />;
    }

    if(lawyer.img_name && lawyer.img_name.url) {
      lawyerImage =  <img src={ lawyer.img_name.url } alt={ lawyer.name +" "+ lawyer.lastname } />;
    } else {
      lawyerImage = <img src={"/img/lawyer_placeholder.jpg"} alt={ lawyer.name +" "+ lawyer.lastname } />;
    }

    if(position == "Abogado") {
      position = "Asociado";
    } else if(position == "Lawyer") {
      position = "Associate";
    }

    return (
      <div className="col-sm-6 col-xs-12 lawyer-item" onClick={this.open}>
      <div className="img-container">
        {lawyerImage}
      </div>
        <div className="content">
          <span className="position">{ position }</span>
          <h3>{ lawyer.name +" "+ lawyer.lastname }</h3>
          <span className="country">{ lawyer.country }</span>
          <a href={"tel:" + lawyer.phone } className="phone">{ lawyer.phone }</a>
          <a href={"mailto:" + lawyer.email } className="email">{ lawyer.email }</a>
        </div>
      </div>
    );
  }
});