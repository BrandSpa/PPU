'use strict';
var React = require('react');
var request = require('superagent');
var Helmet = require('react-helmet');
var getLang = require('utils/get_lang');
var Experience = require('experiences/experience.jsx');
var Lawyer = require('views/lawyers/lawyer.jsx');
var moment = require('moment');
var trans = require('langs/experience');
var TopBar = require('views/top_bar.jsx');
var _ = require('lodash');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      model: {
        img_name: null
      },
      experiences: [],
      filters: {
        without: null,
        category: null
      }
    }
  },

  componentWillReceiveProps: function(props) {
    this.fetch(props.params.slug);
  },

  componentDidMount: function() {
    this.fetch(this.props.params.slug);
  },

  fetch: function(slug) {
     request
    .get('/api/experiences/' + slug)
    .end(function(err, res) {
      this.setState({
        model: res.body,
        filters: {
          without: res.body.id,
          category: res.body.categories[0] ? res.body.categories[0].name : ""
        }
      });
      this.getRelated();
    }.bind(this));
  },

  getRelated: function() {
    request
    .get('/api/experiences')
    .query(this.state.filters)
    .end(function(err, experiences) {
      this.setState({
        experiences: experiences.body
      });
    }.bind(this));
  },

  render: function() {
    var model = this.state.model;
    var img;
    var link;
    var lawyerNodes;
    var title;

    if(model.lawyers) {
      lawyerNodes = model.lawyers.map(function(lawyer, i) {
        return (<Lawyer key={i} lawyer={lawyer} history={this.props.history} />);
      }.bind(this));

      if(!_.isEmpty(model.lawyers)) {
        title = trans.contact;
      }
    }

    var experienceNodes = this.state.experiences.map(function(experience, i) {
      return (
        <Experience
          key={i}
          model={experience}
          history={this.props.history}
        />
      );
    }.bind(this));

    var imgUrl;

    if (model.gallery && model.gallery.img_name) {
       imgUrl =  model.gallery.img_name.url;
    } else if(model.img_name && model.img_name.url) {
      imgUrl = model.img_name.url;
    }

    if(model.translations && model.translations.slug) {
      link = model.translations.slug;
    }

    if(model.translation && model.translation.slug) {
      link = model.translation.slug;
    }

    return (
      <div>
        <Helmet
          title={"Philippi Prietocarrizosa &Uría - " + model.title}
          meta={[
              {"name": "description", "content": model.excerpt},
              {"name": "og:title", "content": "Philippi Prietocarrizosa &Uría - " + model.title},
              {"name": "og:description", "content": model.excerpt},
              {"name": "og:image", "content": imgUrl}
          ]}
        />

        <TopBar title={trans.name} hidden back pathname={"/experiencias/" + link} />

        <div id="experience" className="padding-top">
          <div className="experience-header">
            <img src={imgUrl} />
            <h1>{model.title}</h1>
            <span className="company-name">{model.company_name}</span>
            <span className="company-web">
              <a href={model.company_web} target="_new">{model.company_web}</a>
            </span>
          </div>

          <div className="content col-lg-12">
           <span className="year">{model.country} - {moment(model.date).format('YYYY')}</span>
            <div dangerouslySetInnerHTML={{__html: model.content}} />

            <h4>{title}</h4>

            <div className="lawyers">
              {lawyerNodes}
            </div>

          </div>
        </div>

        <div className="related-title">
          <h3>{trans.related}</h3>
        </div>

        <div id="experiences-related">
          {experienceNodes}
        </div>
      </div>
    );
  }
});