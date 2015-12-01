'use strict';
var React = require('react');

module.exports = React.createClass({

  render: function() {
    return (
     <form action="#" className="form-horizontal">
     <div className="form-group">
     <label for="fields[country]" className="col-sm-2 control-label">country</label>

     <div className="col-sm-10 country-container">
     <select name="fields[country]" className="selectpicker">
       <option value="">select_country</option>
       <option value="Colombia">Colombia</option>
       <option value="Chile">Chile</option>
     </select>
     </div>
     </div>

     <div className="form-group">
     <label for="fields[name]" className="col-sm-2 control-label">form_footer.name</label>
      <div className="col-sm-10">
      <input type="text" className="form-control" name="fields[name]" />
     </div>
     </div>

     <div className="form-group">
      <label for="fields[lastname]" className="col-sm-2 control-label">form_footer.lastname</label>
       <div className="col-sm-10">
       <input type="text" className="form-control" name="fields[lastname]" />
       </div>
     </div>

     <div className="form-group">
      <label for="fields[email]" className="col-sm-2 control-label">Email</label>
       <div className="col-sm-10">
        <input type="text" className="form-control" name="fields[email]" />
       </div>
     </div>

     <div className="form-group">
     <label for="fields[email]" className="col-sm-2 control-label"></label>
       <div className="col-sm-10">
        <textarea name="fields[message]" rows="3" className="form-control"></textarea>
       </div>
     </div>

     <div className="form-group">
      <a href="#" className="btn btn-info pull-right contact-save"><i className="fa fa-chevron-right"></i></a>
     </div>
     </form>
    );
  }
});