'use strict';
import React from 'react';
import trans from 'langs/app';
import request from 'superagent';
import Categories from 'views/post/categories';
import Social from 'views/post/social';
import TopBar from 'views/top_bar';
import PostDate from 'components/date';

export default React.createClass({
  getInitialState: function() {
    return {
      post: {}
    }
  },

  componentDidMount: function() {
    request
    .get('/api/posts/' + this.props.params.slug)
    .end(function(err, res) {
      this.setState({post: res.body});
    }.bind(this));
  },

  render: function() {
    var post = this.state.post;
    var postImage;
    var lawyers = (<h5>{ post.author }</h5>);
    var count;
    var divider = "|";
    if(post && post.lawyers) {
      count = post.lawyers.length - 1;
      lawyers = post.lawyers.map(function(lawyer, i) {
        if(count > 0 && i < count) {
          return (<h5><a href={"/abogados/" + lawyer.slug}>{lawyer.name} {lawyer.lastname}</a>{divider}</h5>  );
        } else {
          return (<h5><a href={"/abogados/" + lawyer.slug}>{lawyer.name} {lawyer.lastname}</a></h5>  );
        }
      });
    }

    if(post.img_name && post.img_name.url) {
      postImage = post.img_name.url;
    } else if(post.gallery && post.gallery.img_name) {
      postImage = post.gallery.img_name.url;
    }

    return (
      <div>
      <TopBar title={trans.news} hidden back />
      <div className="padding-top"></div>
      <div id="post-detail">
      <div className="post-header">
        <div className="thumb-container">
          <img  src={postImage} alt={ post.title }/>
        </div>

        <div className="data">
          <h1>{post.title}</h1>
          {lawyers}
          <Categories collection={post.categories} />
        </div>
      </div>

  <div className="content">
  <div className="meta">
     <div>
      <span className="country">{post.country}</span> <PostDate date={post.date} />
    </div>

     <Social model={post} />
  </div>


    <div dangerouslySetInnerHTML={{__html: post.content}} />
  </div>
  </div>
  </div>
    )
  }
});