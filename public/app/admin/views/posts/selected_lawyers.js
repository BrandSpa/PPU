$(function() {
	    ppu.admin.PostLawyersSelected = (function(superClass) {
      extend(PostLawyersSelected, superClass);

      function PostLawyersSelected() {
        return PostLawyersSelected.__super__.constructor.apply(this, arguments);
      }

      PostLawyersSelected.prototype.template = $('#lawyer-selected-template');

      PostLawyersSelected.prototype.tagName = 'tr';

      PostLawyersSelected.prototype.events = {
        "click .remove": "destroy"
      };

      PostLawyersSelected.prototype.render = function() {
        var source, template;
        source = this.template.html();
        template = Handlebars.compile(source);
        return $('#lawyers-selected tbody').append(this.$el.html(template(this.model.toJSON())));
      };

      PostLawyersSelected.prototype.renderObject = function(model) {
        var source, template;
        source = this.template.html();
        template = Handlebars.compile(source);
        return $('#lawyers-selected tbody').append(this.$el.html(template(model)));
      };

      PostLawyersSelected.prototype.destroy = function(e) {
        e.preventDefault();
        return this.$el.remove();
      };

      return PostLawyersSelected;

    })(Backbone.View);
});