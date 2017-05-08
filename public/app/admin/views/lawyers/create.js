ppu.LawyerCreateView = (function(superClass) {
  extend(LawyerCreateView, superClass);

  function LawyerCreateView() {
    return LawyerCreateView.__super__.constructor.apply(this, arguments);
  }

  LawyerCreateView.prototype.el = $("#lawyer-create");

  LawyerCreateView.prototype.events = {
    "click .lawyer-store": "store",
    "change .lawyer-lang": "changeLang",
    "keydown .form-control": "removeError",
    "change .form-control": "removeError"
  };

  LawyerCreateView.prototype.initialize = function() {
    return ppu.appendDatePickerYear(this.el);
  };

  LawyerCreateView.prototype.store = function(e) {
    e.preventDefault();
    return ppu.lawyerCreateForm.store();
  };

  return LawyerCreateView;
})(Backbone.View);
