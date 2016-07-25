'use strict';
import React from 'React';
import request from 'superagent';

export default React.createClass({
  getInitialState() {
    return {
      gallery: []
    }
  },

  componentDidMount() {
    request
    .get('/api/galleries')
    .query({name: 'post_header'})
    .end((err, res) => {
      this.setState({gallery: res.body});
    });
  },

  handleClick(img, e) {
    e.preventDefault();
    this.props.onSelect(img);
  },

  render() {
    let gallery = this.state.gallery.map(img =>
      <img
        key={img.id}
        className='col-sm-2'
        style={{paddingBottom: '30px'}}
        onClick={this.handleClick.bind(null, img)}
        src={img.img_name.url}
      />
    );

    return (
      <div className="row"  style={this.props.show ? {display: 'block'} : {display: 'none'}}>
        {gallery}
      </div>

    )
  }
});
