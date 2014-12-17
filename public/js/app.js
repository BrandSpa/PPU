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
      "click .change-lang-page": 'changeLangPage'
    };

    AppView.prototype.changeLangPage = function(e) {
      e.preventDefault();
      if (ppu.lang === 'en') {
        return window.location = "http://ppulegal.com" + app.pathname;
      } else {
        return window.location = "http://en.ppulegal.com" + app.pathname;
      }
    };

    return AppView;

  })(Backbone.View);
});
