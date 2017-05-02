var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$(function() {
  return ppu.admin.TheActualCoCreate = (function(superClass) {
    extend(TheActualCoCreate, superClass);

    function TheActualCoCreate() {
      return TheActualCoCreate.__super__.constructor.apply(this, arguments);
    }

    TheActualCoCreate.prototype.el = $("#post-create");

    TheActualCoCreate.prototype.template = $("#the-actual-create-template");

    TheActualCoCreate.prototype.events = {
      "click button.store": "store",
      "click .open-gallery": "openGallery",
      "keydown input[name='query']": "searchLawyer",
      "change .form-control": "removeError",
      "keydown .form-control": "removeError"
    };

    TheActualCoCreate.prototype.initialize = function() {
      this.listenTo(this.model, 'error', this.renderPostErrors, this);
      this.listenTo(this.model, 'sync', this.stored);
      app.pubsub.bind('gallery:selected', this.appendSelectedGallery, this);
      return app.pubsub.on('post:socialPublished', this.redirectTo, this);
    };

    TheActualCoCreate.prototype.render = function() {
      var source, template;
      source = this.template.html();
      template = Handlebars.compile(source);
      this.$el.find('.panel-body').html(template());
      ppu.appendDatePicker(this.el);
      return ppu.appendSummernote(this.el);
    };

    TheActualCoCreate.prototype.store = function(e) {
      var $form, content, data, options;
      e.preventDefault();
      $form = this.$el.find('form');
      content = $(this.el).find('.summernote').code();
      data = new FormData($form[0]);
      data.append("fields[content]", content);
      data.append("fields[lang]", app.lang);
      data.append("fields[country]", "Colombia");
      data.append('fields[the_actual_co]', 1);
      options = ppu.ajaxOptions("POST", data);
      return this.model.save(data, $.extend({}, options));
    };

    TheActualCoCreate.prototype.stored = function(model) {
      return window.location = "/el-actual-colombia/" + (this.model.get('slug'));
    };

    TheActualCoCreate.prototype.publishFb = function(model) {
      var published, url;
      url = setSubdomain(model.get('lang')) + ("posts/" + (model.get('slug')));
      return published = fb_check_and_publish(model.get('title'), url);
    };

    TheActualCoCreate.prototype.redirectTo = function() {
      return window.location = '/admin/posts';
    };

    TheActualCoCreate.prototype.getCategories = function() {
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

    TheActualCoCreate.prototype.openGallery = function(e) {
      e.preventDefault();
      ppu.admin.galleryPostModal = new ppu.admin.GalleryPostModal({
        collection: ppu.admin.galleries
      });
      return ppu.admin.galleryPostModal.render();
    };

    TheActualCoCreate.prototype.appendSelectedGallery = function(gallery_id) {
      $(this.el).find('.gallery_id').val(gallery_id);
      return ppu.admin.galleryPostModal.closeModal();
    };

    TheActualCoCreate.prototype.searchLawyer = function(e) {
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

    return TheActualCoCreate;

  })(Backbone.View);
});
