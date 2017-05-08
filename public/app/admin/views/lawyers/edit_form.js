    ppu.lawyerEdit = (function(superClass) {
      extend(lawyerEdit, superClass);

      function lawyerEdit() {
        return lawyerEdit.__super__.constructor.apply(this, arguments);
      }

      lawyerEdit.prototype.el = $("#lawyer-edit-modal");

      lawyerEdit.prototype.template = $("#lawyer-form-template");

      lawyerEdit.prototype.events = {
        "click .lawyer-edit-update": "update",
        "click .modal-close": "close",
        "keydown .form-control": "removeError"
      };

      lawyerEdit.prototype.initialize = function() {
        this.listenTo(this.model, 'error', this.renderErrors);
        this.listenTo(this.model, 'sync', this.updated);
        return this.getCategories();
      };

      lawyerEdit.prototype.getCategories = function() {
        var categories, el;
        ppu.categories = new ppu.Categories;
        el = $(this.el);
        categories = this.model.get('categories');
        
        return ppu.categories.fetch({
          data: {
            locale: app.lang
          }
        }).done(function(collection) {
          var source, template;
          source = $('#lawyer-categories-template').html();
          template = Handlebars.compile(source);
          $(el).find('#categories-checkbox').html(template(collection));
          return _.each(categories, function(category) {
            return $(el).find("#categories-checkbox input[value='" + category.id + "']").attr("checked", "checked");
          });
        });
      };

      lawyerEdit.prototype.render = function() {
        var el, level, position, source, t;
        el = $("#lawyer-edit-modal");
        source = this.template.html();
        position = this.model.get('position');
        level = this.model.get('level');
        t = Handlebars.compile(source);
        $(this.el).find('.modal-body').html(t(this.model.toJSON()));
        if (level >= 6) {
          $('.lawyer-description').removeClass('hidden');
        }
        if (position === "Senior Counsel") {
          $('.lawyer-description').removeClass('hidden');
        }
        if (position === "Especialista" || position === "Specialist") {
          $('.lawyer-description').removeClass('hidden');
        }
        if (position === "Socio" || position === "Partner") {
          $('.lawyer-description').removeClass('hidden');
        }
        return $(this.el).modal({
          backdrop: 'static'
        });
      };

      lawyerEdit.prototype.update = function(e) {
        var $forms, data;
        e.preventDefault();
        $forms = $(this.el).find("form");
        data = new FormData($forms[0]);
        return this.model.save(data, $.extend({}, ppu.ajaxOptions("PUT", data)));
      };

      lawyerEdit.prototype.updated = function(model) {
        if (model.id) {
          return this.closeModal();
        }
      };

      lawyerEdit.prototype.close = function(e) {
        e.preventDefault();
        return this.closeModal();
      };

      return lawyerEdit;

    })(Backbone.View);