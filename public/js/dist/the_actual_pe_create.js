var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$(function() {
  return ppu.admin.TheActualPeCreate = (function(superClass) {
    extend(TheActualPeCreate, superClass);

    function TheActualPeCreate() {
      return TheActualPeCreate.__super__.constructor.apply(this, arguments);
    }

    TheActualPeCreate.prototype.el = $("#post-create");

    TheActualPeCreate.prototype.template = $("#the-actual-create-template");

    TheActualPeCreate.prototype.events = {
      "click button.store": "store",
      "click .open-gallery": "openGallery",
      "keydown input[name='query']": "searchLawyer",
      "change .form-control": "removeError",
      "keydown .form-control": "removeError"
    };

    TheActualPeCreate.prototype.initialize = function() {
      this.listenTo(this.model, 'error', this.renderPostErrors, this);
      this.listenTo(this.model, 'sync', this.stored);
      app.pubsub.bind('gallery:selected', this.appendSelectedGallery, this);
      return app.pubsub.on('post:socialPublished', this.redirectTo, this);
    };

    TheActualPeCreate.prototype.render = function() {
      var source, template;
      source = this.template.html();
      template = Handlebars.compile(source);
      this.$el.find('.panel-body').html(template());
      ppu.appendDatePicker(this.el);
      return ppu.appendSummernote(this.el);
    };

    TheActualPeCreate.prototype.store = function(e) {
      var $form, content, data, options;
      e.preventDefault();
      $form = this.$el.find('form');
      content = $(this.el).find('.summernote').code();
      data = new FormData($form[0]);
      data.append("fields[content]", content);
      data.append("fields[lang]", app.lang);
      data.append("fields[country]", "Perú");
      data.append('fields[the_actual_pe]', 1);
      options = ppu.ajaxOptions("POST", data);
      return this.model.save(data, $.extend({}, options));
    };

    TheActualPeCreate.prototype.stored = function(model) {
      return window.location = "/posts/" + (this.model.get('slug'));
    };

    TheActualPeCreate.prototype.publishFb = function(model) {
      var published, url;
      url = setSubdomain(model.get('lang')) + ("posts/" + (model.get('slug')));
      return published = fb_check_and_publish(model.get('title'), url);
    };

    TheActualPeCreate.prototype.redirectTo = function() {
      return window.location = '/admin/posts';
    };

    TheActualPeCreate.prototype.getCategories = function() {
      ppu.categories = new ppu.Categories;
      return ppu.categories.fetch({
        data: {
          lang: app.lang
        }
      }).done(function(collection) {
        var source, template;
        source = $('#lawyer-categories-template').html();
        template = Handlebars.compile(source);
        return $('#categories-checkboxes').html(template(collection));
      });
    };

    TheActualPeCreate.prototype.openGallery = function(e) {
      e.preventDefault();
      ppu.admin.galleryPostModal = new ppu.admin.GalleryPostModal({
        collection: ppu.admin.galleries
      });
      return ppu.admin.galleryPostModal.render();
    };

    TheActualPeCreate.prototype.appendSelectedGallery = function(gallery_id) {
      $(this.el).find('.gallery_id').val(gallery_id);
      return ppu.admin.galleryPostModal.closeModal();
    };

    TheActualPeCreate.prototype.searchLawyer = function(e) {
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

    return TheActualPeCreate;

  })(Backbone.View);
});
