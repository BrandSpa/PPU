'use strict';
var React = require('react');
var Helmet = require('react-helmet');
var Footer = require('views/footer.jsx');
var NavMain = require('views/nav_main.jsx');
var NavMain = require('views/nav_main.jsx');
var NavMobile = require('views/nav_mobile.jsx');
var Posts = require('views/posts/section.jsx');

module.exports = React.createClass({
  render: function() {
    var pathname = this.props.location.pathname;
    window.scrollTo(0, 0);

    return (
      <div className="container app-container">
      <Helmet
          title="Philippi Prietocarrizosa &Uría - Noticias"
          meta={[
              {"name": "description", "content": " Noticias y actualidad de temas legales. Firma con 13 áreas de práctica; Con oficinas en Chile, Colombia. España, Portugal, Sao Paulo, Nueva York, Pekín, Londres y Bruselas."},
              {"name": "og:title", "content": "Philippi Prietocarrizosa &Uría - Noticias"},
              {"name": "og:description", "content": " Noticias y actualidad de temas legales. Firma con 13 áreas de práctica; Con oficinas en Chile, Colombia. España, Portugal, Sao Paulo, Nueva York, Pekín, Londres y Bruselas."}
          ]}
        />

        <div className="row">
          <NavMobile />
          <NavMain />

          <div className="col-lg-10" id="yield-container">
            {this.props.children || <Posts history={this.props.history} />}
          </div>

        </div>

        <Footer />
      </div>


    );
  }
});