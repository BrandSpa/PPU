var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  return ppu.AppView = (function(_super) {
    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.prototype.el = $("#ppu-app");

    AppView.prototype.events = {
      'click .change-lang-page': 'changeLangPage'
    };

    AppView.prototype.initialize = function() {
      return app.pubsub.bind("filter:aplied", this.paginateOff, this);
    };

    AppView.prototype.paginateOff = function() {
      return this.$el.data("paginate");
    };

    AppView.prototype.changeLangPage = function(e) {
      var urlTranslation;
      e.preventDefault();
      urlTranslation = window.urlTranslation;
      if (app.lang === 'en') {
        if (urlTranslation === "") {
          return window.location = "http://ppulegal.com" + app.pathname;
        } else {
          return window.location = "http://ppulegal.com/" + ppu.pathUrl[1] + "/" + urlTranslation;
        }
      } else {
        if (urlTranslation === "") {
          return window.location = "http://en.ppulegal.com" + app.pathname;
        } else {
          return window.location = "http://en.ppulegal.com/" + ppu.pathUrl[1] + "/" + urlTranslation;
        }
      }
    };

    return AppView;

  })(Backbone.View);
});
