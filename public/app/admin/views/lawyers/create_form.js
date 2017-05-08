ppu.LawyerCreateForm = (function(superClass) {
  extend(LawyerCreateForm, superClass);

  function LawyerCreateForm() {
    return LawyerCreateForm.__super__.constructor.apply(this, arguments);
  }

  LawyerCreateForm.prototype.el = $("#lawyer-form-create");

  LawyerCreateForm.prototype.template = $("#lawyer-form-template");

  LawyerCreateForm.prototype.events = {
    "change .change-level": "toggleDescriptionByLevel",
    "change .change-position": "toggleDescriptionByPosition",
    "change .change-position": "toggleDescriptionByPosition",
    "click .publish": "publish",
    "click .unpublish": "unpublish"
  };

  LawyerCreateForm.prototype.initialize = function() {
    this.listenTo(this.model, "error", this.renderErrors, this);
    this.listenTo(this.model, "error", this.toErrors, this);
    return this.listenTo(this.model, "sync", this.stored, this);
  };

  LawyerCreateForm.prototype.render = function() {
    var source, template;
    source = this.template.html();
    template = Handlebars.compile(source);
    return $(this.el).find(".panel-body").html(template());
  };

  LawyerCreateForm.prototype.toggleDescriptionByLevel = function(e) {
    var el, val;
    el = $(e.currentTarget);
    val = el.val();
    if (val >= 6) {
      return $(".lawyer-description").removeClass("hidden").hide().slideDown();
    } else {
      return $(".lawyer-description").fadeOut();
    }
  };

  LawyerCreateForm.prototype.toggleDescriptionByPosition = function(e) {
    var el, val;
    el = $(e.currentTarget);
    val = el.val();
    if (val === "Senior Counsel" || val === "Especialista" || val === "Socio") {
      return $(".lawyer-description").removeClass("hidden").hide().slideDown();
    } else {
      return $(".lawyer-description").fadeOut();
    }
  };

  LawyerCreateForm.prototype.store = function(e) {
    var $forms, datas, options;
    if (e) {
      e.preventDefault();
    }
    $forms = $("#lawyer-form-create").find("form");
    datas = new FormData($forms[0]);
    options = ppu.ajaxOptions("POST", datas);
    return this.model.save(datas, $.extend({}, options));
  };

  LawyerCreateForm.prototype.toErrors = function() {
    return (window.location = "#lawyer-form-create");
  };

  LawyerCreateForm.prototype.stored = function(model) {
    return (window.location = "/admin/lawyers/" + model.id + "/edit");
  };

  LawyerCreateForm.prototype.publish = function(e) {
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

  LawyerCreateForm.prototype.unpublish = function(e) {
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

  return LawyerCreateForm;
})(Backbone.View);
