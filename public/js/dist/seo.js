var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  return ppu.Seo = (function(_super) {
    __extends(Seo, _super);

    function Seo() {
      return Seo.__super__.constructor.apply(this, arguments);
    }

    Seo.prototype.el = $("#ppu");

    Seo.prototype.template = $("#seo-template");

    Seo.prototype.initialize = function() {
      return app.pubsub.bind("seo:render", this.render, this);
    };

    Seo.prototype.render = function(data) {
      return console.log(data);
    };

    return Seo;

  })(Backbone.View);
});
