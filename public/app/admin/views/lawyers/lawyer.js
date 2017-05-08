ppu.admin.LawyerView = (function(superClass) {
  extend(LawyerView, superClass);

  function LawyerView() {
    return LawyerView.__super__.constructor.apply(this, arguments);
  }

  LawyerView.prototype.tagName = "tr";

  LawyerView.prototype.template = $("#lawyer-dashbord-template");

  LawyerView.prototype.events = {
    "click .confirm-translate": "confirmTranslate",
    "click .publish": "publish",
    "click .unpublish": "unpublish"
  };

  LawyerView.prototype.initialize = function() {
    this.listenTo(this.model, "change", this.render);
    this.listenTo(this.model, "error", this.showErrors);
    return app.pubsub.bind("lawyer:translate", this.translate, this);
  };

  LawyerView.prototype.render = function() {
    var source, t;
    source = this.template.html();
    t = Handlebars.compile(source);
    $(this.el).html(t(this.model.toJSON()));
    return this;
  };

  LawyerView.prototype.publish = function(e) {
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

  LawyerView.prototype.unpublish = function(e) {
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

  LawyerView.prototype.confirmTranslate = function(e) {
    var v;
    e.preventDefault();
    v = new ppu.lawyerConfirmTranslate();
    return v.render();
  };

  LawyerView.prototype.translate = function(e) {
    var id;
    id = this.model.id;
    return $.post("/api/lawyers/" + id + "/duplicate").done(function(model) {
      return (window.location = "/en/admin/lawyers/" + mod.id + "/edit");
    });
  };

  return LawyerView;
})(Backbone.View);
