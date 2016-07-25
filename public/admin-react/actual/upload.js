'use strict';
import React from 'React';

export default React.createClass({

  getDefaultProps() {
    return {
      backgroundOver: '#002855',
      backgroundDefault: '#f1f1f1',
      backgroundDrop: '#f1f1f1',
    }
  },

  componentDidMount() {
    let form = document.getElementById('form-drag');
    let input = document.getElementById('form-drag__input');
    let events = "drag dragstart dragend dragover dragenter dragleave drop".split(" ");

    events.forEach(levent => {
      form.addEventListener(levent, (event) => {
        event.preventDefault();
        event.stopPropagation();
      }, false);
    });

    form.addEventListener('click', () => {
      input.click();
    });

    input.addEventListener('change', (e) => {

      this.onDrop(form, e.target.files[0]);
    });

    form.addEventListener('dragover', (event) => {
      event.target.style.background = this.props.backgroundOver;
      event.target.style.border = `2px dashed ${this.props.backgroundOver}`;
    });

    form.addEventListener('dragenter', (event) => {
      event.target.style.background = this.props.backgroundOver;
    });

    form.addEventListener('drop', (event) => {
      event.target.style.background = this.props.backgroundDrop;
      this.onDrop(form, event.dataTransfer.files[0]);
    });

  },

  onDrop(form, file) {
    event.target.style.border = "none";
    form.innerHTML = '';
    var img = document.createElement('img');

    img.onload = function() {
      if(this.height > 150) {
        this.height = 150;
      }
    };

    img.src = window.URL.createObjectURL(file);

    form.appendChild(img);
    if(typeof this.props.onChange === 'function') {
      this.props.onChange(file);
    }
  },

  setImg(src) {

  },

  componentWillUnmount() {
    let form = document.getElementById('form-drag');
    let input = document.getElementById('form-drag__input');
    let events = "drag dragstart dragend dragover dragenter dragleave drop".split(" ");

    events.forEach(levent => {
      form.removeEventListener(levent, (event) => {
        event.preventDefault();
        event.stopPropagation();
      }, false);
    });
  },

  render() {
    return (
      <form id="form-drag" action="" style={{
        overflow: 'hidden',
        color: '#333',
        fontSize: '22px',
        padding: '30px',
        height: '200px',
        'background': this.props.backgroundDefault,
        'textAlign': 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 500ms ease'
      }}>
      <input type="file" id="form-drag__input" style={{display: 'none'}}/>
        Arrastrar & Soltar
      </form>
    )
  }
});
