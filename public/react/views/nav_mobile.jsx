'use strict';
import React from 'react';
import getLang from 'utils/get_lang';
import trans from 'langs/app';

export default React.createClass({
  getInitialState() {
    return {
      showNavbar: false
    }
  },

  toggleShowNavbar() {
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

  render() {
    var lang;
    var link;
    var pathname = this.props.pathname || window.location.pathname;
    if(getLang === 'es')
    {
      link = this.props.link || "http://en." + window.location.hostname + pathname;
      lang = <a href={link} className="change-lang-page">English</a>;
    } else {
      link = this.props.link || "http://" + window.location.hostname.replace('en.', '') + pathname;
      lang = <a href={link} className="change-lang-page">Español</a>;
    }

    return (
      <div className="col-md-12">
      <nav className="navbar navbar-default navbar-app hidden-lg" role="navigation" id="nav-responsive">
        <div className="container-fluid">
        <div className="navbar-header">
        {lang}
        <button type="button" className="navbar-toggle collapsed" onClick={this.toggleShowNavbar}>
         <span>{trans.menu}</span> <i className="fa fa-bars"></i>
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
        <li><a href="/contacto">{trans.contact}</a></li>
        <li><a href="/probono">Probono</a></li>
        <li><a href="/el-actual">El Actual Chile</a></li>
        <li><a href="/el-actual-colombia">El Actual Colombia</a></li>
        <li><a href="/el-actual-peru">El Actual Perú</a></li>
      </ul>
      </div>
      </div>
    </nav>
    </div>


    );
  }
});
