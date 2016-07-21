'use strict';
import React from 'React';
import jQuery from 'jquery';
window.$ = window.jQuery = jQuery;
import summernote from 'summernote';
import uid from 'uid';
require('bootstrap');

export default React.createClass({
  getDefaultProps() {
      return {
        defaultValue: "what"
      }
  },

  getInitialState() {
    return {
      id: `summernote-${uid()}`,
      editor: {},
      value: ''
    }
  },

  shouldComponentUpdate() {
    return false;
  },

  componentWillReceiveProps(props) {
    this.setState({value: 'a new value'});
  },

  componentDidMount() {
    let editor = $(`.${this.state.id}`).summernote({
      callbacks: {
        onChange: (contents) => {
          if(typeof this.props.onChange === 'function') {
            this.props.onChange(contents);
          }
        },
        onImageUpload: (files, editor, welEditable) => {
          this.updloadImage(files[0]);
        }
      }
    });

    this.setState({editor: editor});
  },

  insertImage(url) {
    $(`.${this.state.id}`).summernote('insertImage', url);
  },

  updloadImage(file) {
    let data = new FormData();
    data.append("gallery[name]", "post_content");
    data.append("gallery[img_name]", file);

    let token = $("meta[name='csrf-token']").attr("content");

    $.ajax({
      data: data,
      type: "POST",
      url: "/api/galleries",
      headers: {
        "X-CSRF-Token": token
      },
      cache: false,
      contentType: false,
      processData: false,
    }).then(url => this.insertImage(url));
  },

  render() {

    return (
      <div className={this.state.id} dangerouslySetInnerHTML={{__html: this.props.defaultValue }} ></div>
    )
  }
});
