var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$(function() {
  return ppu.admin.TheActualCreate = (function(superClass) {
    extend(TheActualCreate, superClass);

    function TheActualCreate() {
      return TheActualCreate.__super__.constructor.apply(this, arguments);
    }

    TheActualCreate.prototype.el = $("#post-create");

    TheActualCreate.prototype.template = $("#the-actual-create-template");

    TheActualCreate.prototype.events = {
      "click button.store": "store",
      "click .open-gallery": "openGallery",
      "keydown input[name='query']": "searchLawyer",
      "change .form-control": "removeError",
      "keydown .form-control": "removeError"
    };

    TheActualCreate.prototype.initialize = function() {
      this.listenTo(this.model, 'error', this.renderPostErrors, this);
      this.listenTo(this.model, 'sync', this.stored);
      app.pubsub.bind('gallery:selected', this.appendSelectedGallery, this);
      return app.pubsub.on('post:socialPublished', this.redirectTo, this);
    };

    TheActualCreate.prototype.render = function() {
      var source, template;
      source = this.template.html();
      template = Handlebars.compile(source);
      this.$el.find('.panel-body').html(template());
      ppu.appendDatePicker(this.el);
      return ppu.appendSummernote(this.el);
    };

    TheActualCreate.prototype.store = function(e) {
      var $form, content, data, options;
      e.preventDefault();
      $form = this.$el.find('form');
      content = $(this.el).find('.summernote').code();
      data = new FormData($form[0]);
      data.append("fields[content]", content);
      data.append("fields[lang]", app.lang);
      data.append("fields[country]", "Chile");
      data.append('fields[the_actual_ch]', 1);
      options = ppu.ajaxOptions("POST", data);
      return this.model.save(data, $.extend({}, options));
    };

    TheActualCreate.prototype.stored = function(model) {
      return window.location = "/el-actual/" + (this.model.get('slug'));
    };

    TheActualCreate.prototype.publishFb = function(model) {
      var published, url;
      url = setSubdomain(model.get('lang')) + ("posts/" + (model.get('slug')));
      return published = fb_check_and_publish(model.get('title'), url);
    };

    TheActualCreate.prototype.redirectTo = function() {
      return window.location = '/admin/posts';
    };

    TheActualCreate.prototype.getCategories = function() {
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

    TheActualCreate.prototype.openGallery = function(e) {
      e.preventDefault();
      ppu.admin.galleryPostModal = new ppu.admin.GalleryPostModal({
        collection: ppu.admin.galleries
      });
      return ppu.admin.galleryPostModal.render();
    };

    TheActualCreate.prototype.appendSelectedGallery = function(gallery_id) {
      $(this.el).find('.gallery_id').val(gallery_id);
      return ppu.admin.galleryPostModal.closeModal();
    };

    TheActualCreate.prototype.searchLawyer = function(e) {
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

    return TheActualCreate;

  })(Backbone.View);
});
