$(function() {
	 ppu.admin.PostEdit = (function(superClass) {
      extend(PostEdit, superClass);

      function PostEdit() {
        return PostEdit.__super__.constructor.apply(this, arguments);
      }

      PostEdit.prototype.el = $("#post-edit");

      PostEdit.prototype.template = $("#post-create-template");

      PostEdit.prototype.removeImg = false;

      PostEdit.prototype.removeGallery = false;

      PostEdit.prototype.events = {
        "click button.update": "update",
        "click .open-gallery": "openGallery",
        "keydown input[name='query']": "searchLawyer",
        "change .form-control": "removeError",
        "keydown .form-control": "removeError",
        "click .remove-img": "removeImg",
        "click .remove-gallery": "removeGallery"
      };

      PostEdit.prototype.initialize = function() {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'error', this.renderPostErrors, this);
        app.pubsub.bind('gallery:selected', this.appendSelectedGallery, this);
        return app.pubsub.on('post:socialPublished', this.redirectTo, this);
      };

      PostEdit.prototype.render = function() {
        var template;
        template = app.compile(this.template);
        this.$el.find('.panel-body').html(template(this.model.toJSON()));
        ppu.appendDatePicker(this.el);
        ppu.appendSummernote(this.el);
        this.getCategories();
        return this.showLawyers();
      };

      PostEdit.prototype.removeImg = function(e) {
        e.preventDefault();
        this.removeImg = true;
        return $(this.el).find('.img-name').remove();
      };

      PostEdit.prototype.removeGallery = function(e) {
        e.preventDefault();
        this.removeGallery = true;
        return $(this.el).find('.gallery-img').remove();
      };

      PostEdit.prototype.update = function(e) {
        var $form, content, data, options, that;
        e.preventDefault();
        that = this;
        $form = this.$el.find('form');
        content = $(this.el).find('.summernote').code();
        data = new FormData($form[0]);
        if (this.removeImg === true) {
          data.append("fields[remove_img_name]", true);
        }
        if (this.removeGallery === true) {
          data.append("fields[gallery_id]", null);
        }
        data.append("fields[content]", content);
        options = ppu.ajaxOptions("PUT", data);
        return this.model.save(data, $.extend({}, options)).done(function(model) {
          return that.updated(model, that);
        });
      };

      PostEdit.prototype.updated = function(model, that) {
        return window.location = "/admin/posts/" + model.id + "/edit";
      };

      PostEdit.prototype.redirectTo = function() {
        return window.location = '/admin/posts';
      };

      PostEdit.prototype.getCategories = function() {
        var el, modelCategories;
        ppu.categories = new ppu.Categories;
        el = this.$el;
        modelCategories = this.model.get('categories');
        return ppu.categories.fetch({
          data: {
            locale: app.lang
          }
        }).done(function(collection) {
          var source, template;
          source = $('#lawyer-categories-template').html();
          template = Handlebars.compile(source);
          $('#categories-checkbox').html(template(collection));
          return _.each(modelCategories, function(category) {
            return $(el).find("#categories-checkbox input[value='" + category.id + "']").attr("checked", "checked");
          });
        });
      };

      PostEdit.prototype.showLawyers = function() {
        var lawyers;
        lawyers = this.model.get('lawyers');
        return _.each(lawyers, function(lawyer) {
          var view;
          view = new ppu.admin.PostLawyersSelected;
          return view.renderObject(lawyer);
        });
      };

      PostEdit.prototype.openGallery = function(e) {
        e.preventDefault();
        ppu.admin.galleryPostModal = new ppu.admin.GalleryPostModal({
          collection: ppu.admin.galleries
        });
        return ppu.admin.galleryPostModal.render();
      };

      PostEdit.prototype.appendSelectedGallery = function(gallery_id) {
        $(this.el).find('.gallery_id').val(gallery_id);
        return ppu.admin.galleryPostModal.closeModal();
      };

      PostEdit.prototype.searchLawyer = function(e) {
        var collection, query;
        query = $(e.currentTarget).val();
        if (query.length > 3) {
          collection = new ppu.Lawyers;
          ppu.admin.postLawyersSelect = new ppu.admin.PostLawyersSelect({
            collection: collection
          });
          return ppu.admin.postLawyersSelect.search(query);
        }
      };

      return PostEdit;

    })(Backbone.View);
});