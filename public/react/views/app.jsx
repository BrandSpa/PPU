'use strict';
import React from 'react';
import Footer from 'views/footer';
import NavMain from 'views/nav_main';
import NavMobile from 'views/nav_mobile';
import Posts from 'views/posts/section';

export default React.createClass({
  render() {
    var pathname = this.props.location.pathname;
    window.scrollTo(0, 0);

    console.log(this.props);

    return (
      <div className="container app-container">

        <div className="row">
          <NavMobile />
          <NavMain />

          <div className="col-lg-10" id="yield-container">
            {this.props.children || <Posts {...this.props} />}
          </div>

        </div>

        <Footer />
      </div>
    );
  }
});
