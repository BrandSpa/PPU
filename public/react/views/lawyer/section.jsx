'use strict';
import React from 'react';
import request from 'superagent';
import trans from 'langs/app';
import transLawyer from 'langs/lawyer';
import Social from 'views/lawyer/social';
import Categories from 'views/lawyer/categories';
import Education from 'views/lawyer/education';
import ProfessionalExperience from 'views/lawyer/professional_experience';
import Conferences from 'views/lawyer/conference';
import Membership from 'views/lawyer/membership';
import Academic from 'views/lawyer/academic';
import Language from 'views/lawyer/language';
import Phrase from 'views/lawyer/phrase';
import Award from 'views/lawyer/award';
import Post from 'views/lawyer/post';
import Article from 'views/lawyer/article';
import TopBar from 'views/top_bar';

export default React.createClass({
  getInitialState() {
    return {
      lawyer: {}
    }
  },

  componentDidMount() {
    request
    .get('/api/lawyers/'+ this.props.params.slug)
    .end(function(err, res){
      this.setState({lawyer: res.body});
    }.bind(this));
  },

  render() {
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
              title={transLawyer.academicActivities}
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
