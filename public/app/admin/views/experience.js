    ppu.admin.ExperienceSelectLawyers = (function(superClass) {
      extend(ExperienceSelectLawyers, superClass);

      function ExperienceSelectLawyers() {
        return ExperienceSelectLawyers.__super__.constructor.apply(this, arguments);
      }

      ExperienceSelectLawyers.prototype.el = $("#");

      ExperienceSelectLawyers.prototype.template = "#lawyer-select";

      ExperienceSelectLawyers.prototype.events = {
        "submit .search": "search"
      };

      ExperienceSelectLawyers.prototype.render = function() {
        this.$el.find('.modal-body').html(app.compileTemplate(this.template));
        this.$el.modal();
        return this;
      };

      ExperienceSelectLawyers.prototype.search = function(e) {
        var query;
        query = $(e.currentTarget).val();
        return this.collection.fetch({
          data: {
            query: query
          }
        });
      };

      return ExperienceSelectLawyers;

    })(Backbone.View);
    
    ppu.admin.ExperienceLawyerSelect = (function(superClass) {
      extend(ExperienceLawyerSelect, superClass);

      function ExperienceLawyerSelect() {
        return ExperienceLawyerSelect.__super__.constructor.apply(this, arguments);
      }

      ExperienceLawyerSelect.prototype.tagName = 'tr';

      ExperienceLawyerSelect.prototype.template = $('#lawyer-select-template');

      ExperienceLawyerSelect.prototype.events = {
        "click .append": "append"
      };

      ExperienceLawyerSelect.prototype.render = function() {
        var source, template;
        source = this.template.html();
        template = Handlebars.compile(source);
        this.$el.html(template(this.model.toJSON()));
        return this;
      };

      ExperienceLawyerSelect.prototype.append = function(e) {
        e.preventDefault();
        ppu.admin.experienceLawyersSelected = new ppu.admin.ExperienceLawyersSelected({
          model: this.model
        });
        return ppu.admin.experienceLawyersSelected.render();
      };

      return ExperienceLawyerSelect;

    })(Backbone.View);

    ppu.admin.ExperienceLawyersSelect = (function(superClass) {
      extend(ExperienceLawyersSelect, superClass);

      function ExperienceLawyersSelect() {
        return ExperienceLawyersSelect.__super__.constructor.apply(this, arguments);
      }

      ExperienceLawyersSelect.prototype.el = $("#lawyers-result");

      ExperienceLawyersSelect.prototype.events = {
        "": ""
      };

      ExperienceLawyersSelect.prototype.initialize = function() {
        return this.listenTo(this.collection, 'reset', this.render);
      };

      ExperienceLawyersSelect.prototype.render = function() {
        $("#lawyers-result").html('');
        return this.collection.each(function(model) {
          var view;
          view = new ppu.admin.ExperienceLawyerSelect({
            model: model
          });
          return $("#lawyers-result").prepend(view.render().el);
        }, this);
      };

      ExperienceLawyersSelect.prototype.search = function(query) {
        return this.collection.fetch({
          reset: true,
          data: {
            search: query
          }
        });
      };

      return ExperienceLawyersSelect;

    })(Backbone.View);
    
    ppu.admin.ExperienceLawyersSelected = (function(superClass) {
      extend(ExperienceLawyersSelected, superClass);

      function ExperienceLawyersSelected() {
        return ExperienceLawyersSelected.__super__.constructor.apply(this, arguments);
      }

      ExperienceLawyersSelected.prototype.template = $('#lawyer-selected-template');

      ExperienceLawyersSelected.prototype.tagName = 'tr';

      ExperienceLawyersSelected.prototype.events = {
        "click .remove": "destroy"
      };

      ExperienceLawyersSelected.prototype.render = function() {
        var source, template;
        source = this.template.html();
        template = Handlebars.compile(source);
        return $('#lawyers-selected tbody').append(this.$el.html(template(this.model.toJSON())));
      };

      ExperienceLawyersSelected.prototype.renderObject = function(model) {
        var source, template;
        source = this.template.html();
        template = Handlebars.compile(source);
        return $('#lawyers-selected tbody').append(this.$el.html(template(model)));
      };

      ExperienceLawyersSelected.prototype.destroy = function(e) {
        e.preventDefault();
        return this.$el.remove();
      };

      return ExperienceLawyersSelected;

    })(Backbone.View);
