'use strict';
var React = require('react');
var request = require('superagent');
var Helmet = require('react-helmet');
var Lawyer = require('views/lawyers/lawyer.jsx');
var Experience = require('views/experiences/experience.jsx');
var getLang = require('utils/get_lang');
var TopBar = require('views/top_bar.jsx');
var trans = require('langs/area');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      model: {
        gallery: {},
        experiences: []
      },
      lawyers: []
    }
  },

  componentDidMount: function() {
    this.fetch();
  },

  fetch: function() {
     request
    .get('/api/categories/' + this.props.params.slug)
    .query({'lang': getLang})
    .end(function(err, res) {
      this.setState({model: res.body});
      this.fetchLawyersRelated(res.body.name);
    }.bind(this));
  },

  fetchLawyersRelated: function(category) {
    var position = 'Socio';
    if(getLang == 'en') {
      position = "Partner";
    }

    request
      .get('/api/lawyers')
      .query({
        lang: getLang,
        category: category,
        position: position,
        published: 1
      })
      .end(function(err, res) {
        this.setState({lawyers: res.body});
      }.bind(this));
  },

  render: function() {
    var model = this.state.model;
    var img;
    var link;

    if(model.translations && model.translations.slug) {
      link = model.translations.slug;
    }

    if(model.translation && model.translation.slug) {
      link = model.translation.slug;
    }

    if(model.gallery && model.gallery.img_name) {
      img = <img src={model.gallery.img_name.url } alt={model.name} />;
    }

    var lawyerNodes = this.state.lawyers.map(function(lawyer, i) {
      return (<Lawyer key={i} lawyer={lawyer} history={this.props.history} />);
    }.bind(this));

    var experienceNodes = model.experiences.map(function(experience, i) {
      return (<Experience key={i} model={experience} history={this.props.history} />);
    }.bind(this));

    return (
      <div>
      <Helmet
          title={"Philippi Prietocarrizosa &Uría - " + model.name}
          meta={[
              {"name": "description", "content": model.excerpt},
              {"name": "og:title", "content": "Philippi Prietocarrizosa &Uría - " + model.name},
              {"name": "og:description", "content": model.excerpt}
          ]}
        />

        <TopBar title={trans.name} hidden back pathname={"/areas/" + link} />

        <div id="category" className="padding-top">
        <div className="category-header">
          {img}
          <h1>{model.name}</h1>
        </div>
          <div className="content">
            <div className="row">
              <div className="col-lg-12">
              <div dangerouslySetInnerHTML={{__html: model.description}} />
                <h4>{trans.contact}</h4>
                <div id="lawyers">
                  {lawyerNodes}
                </div>
              </div>
            </div>
          </div>
          <div className="relationship-title">
            <h3>{trans.related}</h3>
            <div id="experiences">
              {experienceNodes}
            </div>
          </div>
        </div>
      </div>
    );
  }
});