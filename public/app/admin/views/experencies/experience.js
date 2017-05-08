ppu.admin.ExperienceView = (function(superClass) {
  extend(ExperienceView, superClass);

  function ExperienceView() {
    return ExperienceView.__super__.constructor.apply(this, arguments);
  }

  ExperienceView.prototype.template = $("#experience-admin-template");

  ExperienceView.prototype.tagName = "tr";

  ExperienceView.prototype.events = {
    "click .publish": "publish",
    "click .unpublish": "unpublish",
    "click .translate": "translate"
  };

  ExperienceView.prototype.initialize = function() {
    return this.listenTo(this.model, "change", this.render);
  };

  ExperienceView.prototype.render = function() {
    var source, t;
    source = this.template.html();
    t = Handlebars.compile(source);
    $(this.el).html(t(this.model.toJSON()));
    return this;
  };

  ExperienceView.prototype.publish = function(e) {
    e.preventDefault();
    return this.model.save({
      published: true
    });
  };

  ExperienceView.prototype.unpublish = function(e) {
    e.preventDefault();
    return this.model.save({
      published: true
    });
  };

  ExperienceView.prototype.translate = function(e) {
    var id;
    e.preventDefault();
    id = this.model.id;
    return $.post("/api/experiences/" + id + "/duplicate").done(function(
      model
    ) {
      return (window.location = "/en/admin/experiences/" + model.id + "/edit");
    });
  };

  return ExperienceView;
})(Backbone.View);
