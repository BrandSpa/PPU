'use strict';
var React = require('react');
var _ = require('underscore');
var request = require('superagent');
var $ = require('jquery');
var summernote = require('summernote/dist/summernote');

const PostCreate = React.createClass({
	getInitialState() {
		return {
			title: '',
			content: '',
			country: '',
			author: '',
			date: '',
			lang: '',
			lawyers: []
		}
	},

	componentDidMount() {
		$('.summernote-editor').summernote();
	},

	handleChange(field, e) {
		console.log(e.currentTarget.value)
	},

	render() {
		return (
			<div>
				<div className="form-group">
					<input type="text" onChange={this.handleChange.bind(null, 'title')} value={this.state.title}/>
				</div>
				<div className="summernote-editor"></div>
				<button>Store</button>
			</div>
		
		)
	}
});

module.exports = PostCreate;