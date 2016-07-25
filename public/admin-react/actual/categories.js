'use strict';
import React from 'React';
import request from 'superagent';

export default React.createClass({
  getInitialState() {
      return {
        categories: [],
        selected: []
      }
  },

  componentDidMount() {
      request
      .get('/api/categories')
      .end((err, res) => {
        this.setState({categories: res.body});
      });
  },

  add(e) {
    let val = parseInt(e.currentTarget.value);
    let categories = this.state.selected;
    let index = categories.indexOf(val);

    if(index == -1) {
      categories = categories.concat([val]);
    } else {
      categories = categories.filter(cat => cat !== val);
    }

    this.props.onChange(categories);

    this.setState({selected: categories});
  },

  render() {

    let options = this.state.categories.map(category => {
      
    let selected = false;

    if(this.state.selected.indexOf(category.id) !== -1) {
      selected = true;
    }

      return (
        <div className="col-md-4" key={category.id}>
          <div className="checkbox">
            <label htmlFor="">
              <input
                type="checkbox"
                value={category.id}
                onClick={this.add}
                checked={selected}
              />
              {category.name}
            </label>
          </div>
        </div>
      )
    });

    return (
      <div>
        {options}
      </div>
    )
  }
});
