'use strict';
var React = require('react');
var request = require('superagent');
var Helmet = require('react-helmet');
var trans = require('langs/app');
var transLawyer = require('langs/lawyer');
var Social = require('views/lawyer/social.jsx');
var Categories = require('views/lawyer/categories.jsx');
var Education = require('views/lawyer/education.jsx');
var ProfessionalExperience = require('views/lawyer/professional_experience.jsx');
var Conferences = require('views/lawyer/conference.jsx');
var Membership = require('views/lawyer/membership.jsx');
var Academic = require('views/lawyer/academic.jsx');
var Language = require('views/lawyer/language.jsx');
var Phrase = require('views/lawyer/phrase.jsx');
var Award = require('views/lawyer/award.jsx');
var Post = require('views/lawyer/post.jsx');
var Article = require('views/lawyer/article.jsx');
var TopBar = require('views/top_bar.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      lawyer: {}
    }
  },

  componentDidMount: function() {
    request
    .get('/api/lawyers/'+ this.props.params.slug)
    .end(function(err, res){
      this.setState({lawyer: res.body});
    }.bind(this));
  },

  render: function() {
    var lawyer = this.state.lawyer;
    var lawyerImage;

    if(lawyer.translation) {
      lawyerImage = <img src={lawyer.translation.img_name.url } alt={ lawyer.name +" "+ lawyer.lastname } />;
    }

    if(lawyer.img_name) {
      lawyerImage = lawyer.img_name.url;
    } else {
      lawyerImage = "/img/lawyer_placeholder.jpg";
    }

    return (
      <div>
      <Helmet
          title={"Philippi Prietocarrizosa &Uría - " + lawyer.name +" "+ lawyer.lastname}
          meta={[
              {"name": "description", "content": lawyer.description},
              {"name": "og:title", "content": "Philippi Prietocarrizosa &Uría - " + lawyer.name +" "+ lawyer.lastname},
              {"name": "og:description", "content": lawyer.description},
              {"name": "og:image", "content": lawyerImage}
          ]}
        />
      <TopBar title={trans.lawyers} hidden={true} back />

      <div className="padding-top"></div>

      <div id="lawyer">
        <div className="lawyer-header">
          <img src={lawyerImage} alt={ lawyer.name +" "+ lawyer.lastname } />
          <div className="content-left">
            <p>{lawyer.position}</p>
            <h1>{lawyer.name} {lawyer.lastname}</h1>
            <span>{lawyer.country}</span>
            <a href={"tel:"+lawyer.phone} className="lawyer-phone">{lawyer.phone}</a>
            <a href={"mailto:" +lawyer.email} className="lawyer-email">{lawyer.email}</a>
          </div>

          <div className="content-right">
          <Social model={lawyer}/>
          </div>
      </div>

        <p className="lawyer-description">{lawyer.description}</p>
        <div className="row">
          <div className="col-lg-6 lawyer-left">
            <h3><i className="icon ion-briefcase"></i>{transLawyer.generalInformation}</h3>

            <Categories
              title={trans.practiceAreas}
              collection={lawyer.categories}
            />

            <Education
              title={transLawyer.education}
              collection={lawyer.educations}
            />

            <ProfessionalExperience
              title={transLawyer.professionalExperience}
              collection={lawyer.jobs}
            />

            <Conferences
              title={transLawyer.conferences}
              collection={lawyer.recognitions}
            />

            <Membership
              title={transLawyer.memberships}
              collection={lawyer.institutions}
            />

            <Academic
              title={transLawyer.academic}
              collection={lawyer.academics}
            />

            <Categories
              title={transLawyer.languages}
              collection={lawyer.languages}
            />

            <Phrase
              title={''}
              collection={lawyer.phrases}
            />




          </div>

          <div className="col-lg-6 lawyer-right">
            <h3><i className="icon ion-ribbon-b"></i> {transLawyer.awardsRecognitions}</h3>
            <Award
              collection={lawyer.awards}
            />
            <h3><i className="icon ion-ios-paper"></i> {transLawyer.publications}</h3>

            <Post
              title={''}
              collection={lawyer.posts}
            />

            <Article
              title={''}
              collection={lawyer.articles}
            />
          </div>

        </div>
      </div>
      </div>

    )
  }
});