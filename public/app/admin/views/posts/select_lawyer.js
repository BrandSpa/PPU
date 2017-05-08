$(function() {
	  ppu.admin.PostLawyerSelect = (function(superClass) {
      extend(PostLawyerSelect, superClass);

      function PostLawyerSelect() {
        return PostLawyerSelect.__super__.constructor.apply(this, arguments);
      }

      PostLawyerSelect.prototype.tagName = 'tr';

      PostLawyerSelect.prototype.template = $('#lawyer-select-template');

      PostLawyerSelect.prototype.events = {
        "click .append": "append"
      };

      PostLawyerSelect.prototype.render = function() {
        var source, template;
        source = this.template.html();
        template = Handlebars.compile(source);
        this.$el.html(template(this.model.toJSON()));
        return this;
      };

      PostLawyerSelect.prototype.append = function(e) {
        e.preventDefault();
        ppu.admin.postLawyersSelected = new ppu.admin.PostLawyersSelected({
          model: this.model
        });
        return ppu.admin.postLawyersSelected.render();
      };

      return PostLawyerSelect;

    })(Backbone.View);


    ppu.admin.PostLawyersSelect = (function(superClass) {
      extend(PostLawyersSelect, superClass);

      function PostLawyersSelect() {
        return PostLawyersSelect.__super__.constructor.apply(this, arguments);
      }

      PostLawyersSelect.prototype.el = $("#lawyers-result");

      PostLawyersSelect.prototype.events = {
        "": ""
      };

      PostLawyersSelect.prototype.initialize = function() {
        return this.listenTo(this.collection, 'reset', this.render);
      };

      PostLawyersSelect.prototype.render = function() {
        $("#lawyers-result").html('');
        return this.collection.each(function(model) {
          var view;
          view = new ppu.admin.PostLawyerSelect({
            model: model
          });
          return $("#lawyers-result").prepend(view.render().el);
        }, this);
      };

      PostLawyersSelect.prototype.search = function(query) {
        return this.collection.fetch({
          reset: true,
          data: {
            search: query
          }
        });
      };

      return PostLawyersSelect;

    })(Backbone.View);
		
});