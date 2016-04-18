'use srict';
var React = require('react');
var GMaps = require('gmaps');
var markersOptions = require('utils/markers');
var $ = require('jquery');
var _ = require('lodash');
var Form = require('contact/form.jsx');
var countriesInfo = require('utils/countries_info');
var gmapsStyle = require('utils/gmaps_styles');
var TopBar = require('views/top_bar.jsx');
var trans = require('langs/app');

module.exports = React.createClass({

  getInitialState() {
    return {
      gmaps: {
         el: '#map',
         zoom: 5,
         lat: 4.6577943,
         lng: -74.0575952,
         styles: gmapsStyle
      },
      map: null,
      country: 'colombia'
    }
  },

  componentDidMount() {
      console.log(this.state.gmaps);
    this.setMap(this.state.gmaps, this.state.country);
  },

  setMap(options, country) {
    var map = new GMaps(options);
    var markers = markersOptions[country];

   markers.map((data) => {
    return  map.addMarker(data);
  });
  },

  selectCountry(e) {
    e.preventDefault();
    $('.select-country-btns').find('button').removeClass('active');
    $(e.currentTarget).addClass('active');
    var country = $(e.currentTarget).text().toLowerCase().replace('ú', 'u');
    this.setState({country: country});
    $("#map").empty();

    if(country == 'colombia') {
      this.setMap({
         el: '#map',
         zoom: 5,
         lat: 4.6577943,
         lng: -74.0575952,
         styles: gmapsStyle
      }, country);
    }

    if(country == 'chile') {
      this.setMap({
         el: '#map',
         zoom: 15,
         lat: -33.4161579,
         lng:-70.5945958,
         styles: gmapsStyle
      }, country);
    }

    if(country == 'peru') {
      this.setMap({
         el: '#map',
         zoom: 15,
         lat: -12.1659004,
         lng: -76.9508611,
         styles: gmapsStyle
      }, country);
    }
  },

  render() {
    var country = this.state.country;

    var countryData = countriesInfo[this.state.country].map((item, i) => {
    if(i == 0) {
      return (
        <div key={i} style={{color: '#fff', fontWeight: 200}}>
        <h3 style={{textTransform: 'capitalize'}}>{country}</h3>
        <hr/>
        <b style={{display: 'block', color: '#002855', margin: '15px 0'}}>{item.city}</b>
        <p>{item.address}</p>
        <p>{item.address2}</p>
        <p>{item.phone}</p>
        <p>{item.fax}</p>
        <p style={{fontWeight:'normal'}}>{item.mail}</p>
        <br/>
        </div>
      )
    } else {
      return (
        <div key={i} style={{color: '#fff',fontWeight: 200}}>
        <b style={{display: 'block', color: '#002855', margin: '15px 0'}}>{item.city}</b>
        <p>{item.address}</p>
        <p>{item.address2}</p>
        <p>{item.phone}</p>
        <p>{item.fax}</p>
        <p style={{fontWeight:'normal'}}>{item.mail}</p>
        </div>
      )
    }

  })
    return (
      <div>
        <TopBar title={trans.contact} hidden={true} />

      <div id="contact" style={{background: '#fff', paddingTop: '30px'}}>
      <div
        className="btn-group btn-group-justified select-country-btns"
        role="group"
        >

        <div className="btn-group" role="group">
          <button
            type="button"
            className="btn btn-default active"
            onClick={this.selectCountry}>Colombia</button>
        </div>

        <div className="btn-group" role="group">
          <button
            type="button"
            className="btn btn-default"
            onClick={this.selectCountry}>Chile</button>
        </div>

        <div className="btn-group" role="group">
          <button
            type="button"
            className="btn btn-default"
            onClick={this.selectCountry}>Perú</button>
        </div>
      </div>

      <div id="map" style={{ width: '100%',height: '400px', paddingTop: '30px'}}></div>
        <div className="row" >
          <div className="col-md-7">
            <div style={{ padding: '30px'}}>
            <Form />
            </div>
          </div>
          <div className="col-md-5">
            <div style={{ padding: '30px', background: '#19A1B2', 'minHeight': '500px'}}>
            {countryData}

            </div>
          </div>
        </div>
      </div>
      </div>
    )
  }
});
