'use strict';
var React = require('react');
var getLang = require('utils/get_lang');
var trans = require('langs/app');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      showNavbar: false
    }
  },

  toggleShowNavbar: function() {
    var show = this.state.showNavbar;

    if(show) {
      show = false;
    } else {
      show = true;
    }

    this.setState({
      showNavbar: show
    });
  },

  render: function() {
    return (
      <div className="col-md-12">
      <nav className="navbar navbar-default navbar-app hidden-lg" role="navigation" id="nav-responsive">
        <div className="container-fluid">
        <div className="navbar-header">
        <a href="#" className="change-lang-page">español</a>
        <button type="button" className="navbar-toggle collapsed" onClick={this.toggleShowNavbar}>
         <span>Menú</span> <i className="fa fa-bars"></i>
       </button>

       <a href="/" className="navbar-brand"><img src="/img/LogoSolo@2x.png" alt="" className="img-responsive" /></a>
     </div>

     <div className={this.state.showNavbar ? "navbar-collapse collapse in" : "navbar-collapse collapse"} >
      <ul className="nav navbar-nav">
        <li><a href="/abogados">{trans.lawyers}</a></li>
        <li><a href="/areas">{trans.practiceAreas}</a></li>
        <li><a href="/nosotros">{trans.aboutUs}</a></li>
        <li><a href="/experiencias">{trans.experience}</a></li>
        <li><a href="/trabaje-con-nosotros">{trans.recruitment}</a></li>
        <li><a href="/probono">Probono</a></li>
        <li><a href="/el-actual">El Actual Chile</a></li>
        <li><a href="/el-actual-colombia">El Actual Colombia</a></li>
      </ul>

      </div>
      </div>
    </nav>
    </div>


    );
  }
});