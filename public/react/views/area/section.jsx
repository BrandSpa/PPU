'use strict';
import React from 'react';
import request from 'superagent';
import Lawyer from 'views/lawyers/lawyer.jsx';
import Experience from 'views/experiences/experience.jsx';
import getLang from 'utils/get_lang';
import TopBar from 'views/top_bar.jsx';
import trans from 'langs/area';

export default React.createClass({
  getInitialState() {
    return {
      model: {
        gallery: {},
        experiences: []
      },
      lawyers: []
    }
  },

  componentDidMount() {
    this.fetch();
  },

  fetch() {
     request
    .get('/api/categories/' + this.props.params.slug)
    .query({'lang': getLang})
    .end(function(err, res) {
      this.setState({model: res.body});
      this.fetchLawyersRelated(res.body.name);
    }.bind(this));
  },

  fetchLawyersRelated(category) {
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

  render() {
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
