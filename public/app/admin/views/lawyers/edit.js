ppu.LawyerEditView = (function(superClass) {
  extend(LawyerEditView, superClass);

  function LawyerEditView() {
    return LawyerEditView.__super__.constructor.apply(this, arguments);
  }

  LawyerEditView.prototype.el = $(".container-lawyer");

  LawyerEditView.prototype.template = $("#lawyer-template");

  LawyerEditView.prototype.events = {
    "click .open-edit-lawyer": "openEdit",
    "click .open-share": "openShare",
    "click .confirm-translate": "confirmTranslate",
    "click .translate": "translate",
    "click .publish": "publish",
    "click .unpublish": "unpublish"
  };

  LawyerEditView.prototype.initialize = function() {
    this.listenTo(this.model, "change", this.render);
    this.listenTo(this.model, "change", this.renderCategories);
    return app.pubsub.bind("lawyer:translate", this.translate, this);
  };

  LawyerEditView.prototype.render = function() {
    var id, source, t;
    id = this.model.get("id");
    source = this.template.html();
    t = Handlebars.compile(source);
    $(this.el).html(t(this.model.toJSON()));
    $("#lawyer-finish").removeClass("hidden");
    return (ppu.currentLawyerId = id);
  };

  LawyerEditView.prototype.renderCategories = function() {
    var source, t;
    source = $("#lawyer-category-template").html();
    t = Handlebars.compile(source);
    return $("#lawyer-category-edit").find("ul").html(t(this.model.toJSON()));
  };

  LawyerEditView.prototype.openEdit = function(e) {
    var view;
    e.preventDefault();
    view = new ppu.lawyerEdit({
      model: this.model
    });
    return view.render();
  };

  LawyerEditView.prototype.confirmTranslate = function(e) {
    var v;
    e.preventDefault();
    v = new ppu.lawyerConfirmTranslate();
    return v.render();
  };

  LawyerEditView.prototype.translate = function(e) {
    var id;
    id = this.model.id;
    return $.post("/api/lawyers/" + id + "/duplicate").done(function(model) {
      return (window.location = "/en/admin/lawyers/" + model.id + "/edit");
    });
  };

  LawyerEditView.prototype.openShare = function(e) {
    return $("#share-modal").modal();
  };

  LawyerEditView.prototype.publish = function(e) {
    var id;
    e.preventDefault();
    this.model.save({
      fields: {
        published: true
      }
    });
    id = this.model.get("translations").id;
    return $.ajax({
      url: "/api/lawyers/" + id,
      type: "PUT",
      data: {
        fields: {
          published: true
        }
      }
    });
  };

  LawyerEditView.prototype.unpublish = function(e) {
    var id;
    e.preventDefault();
    this.model.save({
      fields: {
        published: false
      }
    });
    id = this.model.get("translations").id;
    return $.ajax({
      url: "/api/lawyers/" + id,
      type: "PUT",
      data: {
        fields: {
          published: false
        }
      }
    });
  };

  return LawyerEditView;
})(Backbone.View);
