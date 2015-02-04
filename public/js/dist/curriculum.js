var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  ppu.Curriculum = (function(_super) {
    __extends(Curriculum, _super);

    function Curriculum() {
      return Curriculum.__super__.constructor.apply(this, arguments);
    }

    Curriculum.prototype.urlRoot = "/api/curriculums";

    return Curriculum;

  })(Backbone.Model);
  ppu.Curriculums = (function(_super) {
    __extends(Curriculums, _super);

    function Curriculums() {
      return Curriculums.__super__.constructor.apply(this, arguments);
    }

    Curriculums.prototype.url = "/api/curriculums";

    Curriculums.prototype.model = ppu.Curriculum;

    return Curriculums;

  })(Backbone.Collection);
  return ppu.CurriculumCreate = (function(_super) {
    __extends(CurriculumCreate, _super);

    function CurriculumCreate() {
      return CurriculumCreate.__super__.constructor.apply(this, arguments);
    }

    CurriculumCreate.prototype.el = $("#work-with-us");

    CurriculumCreate.prototype.events = {
      "click .send-cv": "saveCV"
    };

    CurriculumCreate.prototype.initialize = function() {
      this.listenTo(this.model, "sync", this.stored);
      return this.listenTo(this.model, "error", this.renderErrors, this);
    };

    CurriculumCreate.prototype.saveCV = function(e) {
      var $forms, datas, options;
      e.preventDefault();
      $forms = $(this.el).find('form');
      datas = new FormData($forms[0]);
      options = ppu.ajaxOptions("POST", datas);
      return this.model.save(datas, $.extend({}, options));
    };

    CurriculumCreate.prototype.stored = function(model) {
      var $forms;
      if (model) {
        $forms = $(this.el).find('form').fadeOut();
        return $(this.el).find(".form_thanks").removeClass("hidden");
      }
    };

    return CurriculumCreate;

  })(Backbone.View);
});
