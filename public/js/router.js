var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  ppu.Workspace = (function(_super) {
    __extends(Workspace, _super);

    function Workspace() {
      return Workspace.__super__.constructor.apply(this, arguments);
    }

    Workspace.prototype.routes = {
      "abogados": "lawyers",
      ":lang/abogados": "lawyers",
      "abogados/:id": "lawyer"
    };

    Workspace.prototype.lawyers = function(lang) {
      ppu.lawyers = new ppu.Lawyers;
      if (lang) {
        ppu.lawyers.fetch({
          reset: true,
          data: {
            lang: lang
          }
        });
      } else {
        ppu.lawyers.fetch({
          reset: true
        });
      }
      ppu.lawyersFilters = new ppu.LawyersFilters;
      return ppu.lawyersView = new ppu.LawyersView({
        collection: ppu.lawyers
      });
    };

    Workspace.prototype.lawyer = function() {};

    return Workspace;

  })(Backbone.Router);
  new ppu.Workspace;
  return Backbone.history.start({
    pushState: true
  });
});
