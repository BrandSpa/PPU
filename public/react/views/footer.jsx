'use strict';
var React = require('react');
var Social = require('footer_social.jsx');
var ContactForm = require('footer_contact_form.jsx');
var trans = require('langs/app');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      showContact: false
    }
  },

  toggleContact: function(e) {
    e.preventDefault();
    this.setState({
      showContact: this.state.showContact ? false : true
    });
  },

  render: function() {
    return (
      <div className="footer-container">
      <div className="container">
        <div className="row">
          <div className="col-lg-2"></div>
          <div className="col-lg-10">
            <div id="footer">
              <div className={this.state.showContact ? "collapse in" : "collapse"} id="footer-content">
                <a href="#footer-content" className="close-footer" onClick={this.toggleContact}><i className="fa fa-times"></i></a>

              <hr/>
              <div className="row">
                <div className="col-lg-6">

                  <div id="city-info">
                     <div className="row">
                      <div className="col-lg-3">
                        <h4>Santiago de Chile</h4>
                      </div>
                      <div className="col-lg-8">
                        <span>El Golf 40 Piso 20</span>
                        <span>Las Condes C.P. 7550107</span>
                        <span>Tel: +562 23643700</span>
                        <span>Fax: +562 23643796</span>
                        <span>infoCL@ppulegal.com</span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3">
                        <h4>Barranquilla</h4>
                      </div>
                      <div className="col-lg-8">
                        <span>Calle 77B # 59-61 Oficina 1202</span>
                        <span>Centro Empresarial Las Américas II</span>
                        <span>Tel.: +575 3694040</span>
                        <span>Fax: +575 3694140</span>
                        <span>infoCO@ppulegal.com</span>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3">
                        <h4>Bogotá</h4>
                      </div>
                      <div className="col-lg-8">
                        <span>Carrera 9 # 74-08 Oficina 105</span>
                        <span>Tel.: +571 3268600</span>
                        <span>Fax: +571 3268610</span>
                        <span>infoCO@ppulegal.com</span>
                      </div>
                    </div>
                     <div className="row">
                      <div className="col-lg-3">
                        <h4>Lima</h4>
                      </div>
                      <div className="col-lg-8">
                        <span>Av. Santa Cruz No. 888  Piso 4</span>
                        <span>Tel.: +511 513-7200</span>
                        <span>infoCO@ppulegal.com</span>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="col-lg-6">
                  <ContactForm />
                </div>
              </div>

            </div>

             <a
              href="#"
              className="open-contact open-contact-footer" onClick={this.toggleContact}>{trans.contact} <i className={this.state.showContact ? "fa fa-chevron-down" : "fa fa-chevron-up" }></i></a>
              <div className="pull-right">
                <a href="#" className="policy">{trans.dataProcessingPolicy}</a>
              </div>
              <Social />

            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});