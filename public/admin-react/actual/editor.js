'use strict';
import React from 'React';
import jQuery from 'jquery';
window.$ = window.jQuery = jQuery;
import summernote from 'summernote';
import uid from 'uid';
require('summernote/lang/summernote-es-ES');
require('bootstrap');


export default React.createClass({
  getDefaultProps() {
      return {
        defaultValue: ""
      }
  },

  getInitialState() {
    return {
      id: `summernote-${uid()}`,
      editor: {},
      value: '',
      once: false
    }
  },

  shouldComponentUpdate() {
    return false;
  },

  componentWillReceiveProps(props) {
    if(!this.state.once) {
      $(`.${this.state.id}`).summernote('code', props.defaultValue);
      this.setState({once: true});
    }
  },

  componentDidMount() {
    this.mountEditor();
  },

  mountEditor() {
    let editor = $(`.${this.state.id}`).summernote({
      lang: 'es-ES',
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

  insertNode(node) {
    $(`.${this.state.id}`).summernote('insertText', node);
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

  destroy() {
    $(`.${this.state.id}`).summernote('destroy');
  },

  render() {

    return (
      <div
        className={this.state.id}
        dangerouslySetInnerHTML={{__html: this.props.defaultValue }}
      ></div>
    )
  }
});
