    ppu.admin.CategoryCheckbox = (function(superClass) {
      extend(CategoryCheckbox, superClass);

      function CategoryCheckbox() {
        return CategoryCheckbox.__super__.constructor.apply(this, arguments);
      }

      CategoryCheckbox.prototype.template = $("#category-checkbox-template");

      CategoryCheckbox.prototype.className = "checkbox";

      CategoryCheckbox.prototype.render = function() {
        var template;
        template = app.compile(this.template);
        this.$el.html(template(this.model.toJSON()));
        return this;
      };

      return CategoryCheckbox;

    })(Backbone.View);