'use strict';
const React = require('react');
const _ = require('underscore');
const request = require('superagent');
const $ = require('jquery');

module.exports = React.createClass({
  componentDidMount() {
    this.set(this.props.post);
  },

  componentWillReceiveProps(props) {
    this.set(props.post);
  },

  getInitialState() {
    return {
      post: {},
      token: $("meta[name='csrf-token']").attr("content")
    }
  },

  set(post) {
    this.setState({post});
  },

  translate(e) {
    e.preventDefault();
    const post = this.props.post;
    request
    .post(`/api/posts/${post.id}/duplicate`)
    .set('X-CSRF-Token', this.state.token)
    .end((err, res) => window.location = `/en/admin/posts/${res.body.id}/edit`);
  },

  togglePublish(e) {
    e.preventDefault();
    const post = this.props.post;
    const data = _.extend(post, {published: !post.published});
    request
    .put(`/api/posts/${post.id}`)
    .set('X-CSRF-Token', this.state.token)
    .send({fields:  data})
    .end((err, res) => this.set(res.body));
  },

  featured(e) {
    e.preventDefault();
    const post = this.props.post;
    request
    .post(`/api/posts/${post.id}/featured`)
    .set('X-CSRF-Token', this.state.token)
    .end((err, res) => this.props.fetch());

  },

  render() {
    const post = this.state.post;
    let textStarred = "Destacar";
    let iconStarred = "fa-star-o";
    const textTrans = "Editar Traducción";
    let textPublished = "Publicar";
    let classPublished;
    let classFeatured;

    if(post.featured) {
      textStarred = "Destacado";
      iconStarred = "fa-star";
      classFeatured = "btn-warning";
    }

    let btnTrans;

    if(post.translations) {
      btnTrans = <a href={`/en/admin/posts/${post.translations.id}/edit`} className="btn btn-default btn-xs"><i class="fa fa-pencil-square-o"></i> Editar traducción</a>
    } else {
      btnTrans = <a href="#" className="btn btn-default btn-xs"onClick={this.translate}><i class="fa fa-globe"></i> Traducir</a>
    }

    if(post.published) {
      textPublished = "Publicado";
      classPublished = "btn-success";
    }

    return (
      <tr>
        <td>{post.title}</td>
        <td>{post.country}</td>
        <td>{post.area}</td>
        <td>
          <a href="#" className={`btn btn-xs ${classFeatured}`} onClick={this.featured}><i className={`fa ${iconStarred}`}></i> {textStarred}</a>
        </td>

        <td>
          <a href="#" className={`btn btn-xs ${classPublished}`} onClick={this.togglePublish}>{textPublished}</a>
        </td>

        <td>
          <a href={`/admin/posts/${post.id}/edit`} className="btn btn-default btn-xs"> <i className="fa fa-pencil-square-o"></i> Editar </a>
        </td>

        <td>
          {btnTrans}
        </td>

        <td>
          <a
            className="btn btn-xs"
            href={`https://www.facebook.com/sharer/sharer.php?u=http://ppulegal.com/posts/${post.slug}`}
          >
          <i className="fa fa-facebook-square"></i> Compartir en FB
          </a>
        </td>
      </tr>
    );
  }
});