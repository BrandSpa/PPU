'use strict';
import React from 'react';
import {Link} from 'react-router';

import trans from 'langs/app';

export default React.createClass({
  getInitialState() {
    return {
      showSubMenu: false
    }
  },

  showSubMenu() {
    var show;
    if(this.state.showSubMenu) {
      show = false;
    } else {
      show = true;
    }

    this.setState({showSubMenu: show});
  },

  render() {
    return (
      <div id="nav-main-container" className="col-lg-2 visible-lg">
        <ul className="nav-main col-lg-1">
          <Link to={'/'}>
            <img src="/img/Logo@2x.png" alt="ppu logo" className="img-responsive" />
          </Link>
          <li>
            <Link
              to={'/abogados'}
              activeClassName="active">{trans.lawyers}
            </Link>
          </li>
          <li>
            <Link
              to={'/areas'}
              activeClassName="active">{trans.practiceAreas}
            </Link>
          </li>
          <li>
            <Link
              to={'/experiencias'}
              activeClassName="active">{trans.experience}
            </Link>
          </li>
          <li>
            <Link
              to={'/nosotros'}
              activeClassName="active">{trans.aboutUs}
            </Link>
          </li>
          <li>
            <Link
              to={'/probono'}
              activeClassName="active">Probono
            </Link>
          </li>
          <li>
            <Link
              to={'/trabaje-con-nosotros'}
              activeClassName="active">{trans.recruitment}</Link>
          </li>

          <li>
            <Link
              to={'/contacto'}
              activeClassName="active">{trans.contact}</Link>
          </li>

          <li className={this.state.showSubMenu ? "dropdown open" : "dropdown"}>
            <a href="#" onClick={this.showSubMenu}>El Actual <i className={this.state.showSubMenu ? "fa fa-angle-up" :"fa fa-angle-down"}></i></a>
              <ul className="dropdown-menu" style={{background: "#fff", width: "100%"}} role="menu">
                <li><Link to={"/el-actual"}>Chile</Link></li>
                <li><Link to={"/el-actual-colombia"}>Colombia</Link></li>
                <li><Link to={"/el-actual-peru"}>Perú</Link></li>
              </ul>
          </li>
        </ul>
      </div>
    );
  }
});
