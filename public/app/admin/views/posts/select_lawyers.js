$(function() {
	    ppu.admin.PostSelectLawyers = (function(superClass) {
      extend(PostSelectLawyers, superClass);

      function PostSelectLawyers() {
        return PostSelectLawyers.__super__.constructor.apply(this, arguments);
      }

      PostSelectLawyers.prototype.el = $("#");

      PostSelectLawyers.prototype.template = "#lawyer-select";

      PostSelectLawyers.prototype.events = {
        "submit .search": "search"
      };

      PostSelectLawyers.prototype.render = function() {
        this.$el.find('.modal-body').html(app.compileTemplate(this.template));
        this.$el.modal();
        return this;
      };

      PostSelectLawyers.prototype.search = function(e) {
        var query;
        query = $(e.currentTarget).val();
        return this.collection.fetch({
          data: {
            query: query
          }
        });
      };

      return PostSelectLawyers;

    })(Backbone.View);

});