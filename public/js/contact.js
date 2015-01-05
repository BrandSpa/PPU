var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  ppu.Contact = (function(_super) {
    __extends(Contact, _super);

    function Contact() {
      return Contact.__super__.constructor.apply(this, arguments);
    }

    Contact.prototype.urlRoot = "/api/contacts";

    return Contact;

  })(Backbone.Model);
  ppu.Contacts = (function(_super) {
    __extends(Contacts, _super);

    function Contacts() {
      return Contacts.__super__.constructor.apply(this, arguments);
    }

    Contacts.prototype.url = "/api/contacts";

    Contacts.prototype.model = ppu.Contact;

    return Contacts;

  })(Backbone.Collection);
  return ppu.FooterContactCreate = (function(_super) {
    __extends(FooterContactCreate, _super);

    function FooterContactCreate() {
      return FooterContactCreate.__super__.constructor.apply(this, arguments);
    }

    FooterContactCreate.prototype.el = $("#footer");

    FooterContactCreate.prototype.events = {
      "click .contact-save": "store",
      "keydown .form-control": "removeError"
    };

    FooterContactCreate.prototype.initialize = function() {
      this.listenTo(this.model, "sync", this.stored);
      return this.listenTo(this.model, "error", this.renderErrors, this);
    };

    FooterContactCreate.prototype.store = function(e) {
      var $forms, datas, options;
      e.preventDefault();
      $forms = $(this.el).find('form');
      datas = new FormData($forms[0]);
      options = ppu.ajaxOptions("POST", datas);
      return this.model.save(datas, $.extend({}, options));
    };

    FooterContactCreate.prototype.stored = function(model) {
      if (model) {
        $(this.el).find('form').fadeOut("fast");
        return $(this.el).find('.form_thanks').removeClass("hidden");
      }
    };

    return FooterContactCreate;

  })(Backbone.View);
});
