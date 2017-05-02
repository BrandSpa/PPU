var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$(function() {
  ppu.admin.Gallery = (function(superClass) {
    extend(Gallery, superClass);

    function Gallery() {
      return Gallery.__super__.constructor.apply(this, arguments);
    }

    Gallery.prototype.urlRoot = "/api/galleries";

    return Gallery;

  })(Backbone.Model);
  ppu.admin.Galleries = (function(superClass) {
    extend(Galleries, superClass);

    function Galleries() {
      return Galleries.__super__.constructor.apply(this, arguments);
    }

    Galleries.prototype.url = "/api/galleries";

    Galleries.prototype.model = ppu.admin.Gallery;

    return Galleries;

  })(Backbone.Collection);
  ppu.admin.GalleryView = (function(superClass) {
    extend(GalleryView, superClass);

    function GalleryView() {
      return GalleryView.__super__.constructor.apply(this, arguments);
    }

    GalleryView.prototype.template = $("#gallery-post-template");

    GalleryView.prototype.className = "col-xs-6 col-md-3";

    GalleryView.prototype.events = {
      "click .select": "selectImage"
    };

    GalleryView.prototype.render = function() {
      var source, template;
      source = $(this.template).html();
      template = Handlebars.compile(source);
      this.$el.html(template(this.model.toJSON()));
      return this;
    };

    GalleryView.prototype.selectImage = function(e) {
      var galleryId;
      e.preventDefault();
      galleryId = this.model.get('id');
      return app.pubsub.trigger('gallery:selected', galleryId);
    };

    return GalleryView;

  })(Backbone.View);
  ppu.admin.GalleryPostModal = (function(superClass) {
    extend(GalleryPostModal, superClass);

    function GalleryPostModal() {
      return GalleryPostModal.__super__.constructor.apply(this, arguments);
    }

    GalleryPostModal.prototype.el = $("#gallery-post-modal");

    GalleryPostModal.prototype.events = {
      "click .modal-close": "close"
    };

    GalleryPostModal.prototype.renderOne = function(model) {
      var view;
      view = new ppu.admin.GalleryView({
        model: model
      });
      return this.$el.find('.modal-body .row').append(view.render().el);
    };

    GalleryPostModal.prototype.render = function() {
      this.$el.find('.modal-body .row').html('');
      this.collection.each(function(model) {
        return this.renderOne(model);
      }, this);
      return this.$el.modal();
    };

    GalleryPostModal.prototype.close = function(e) {
      e.preventDefault();
      return this.closeModal();
    };

    return GalleryPostModal;

  })(Backbone.View);
  return ppu.admin.GalleryExperienceModal = (function(superClass) {
    extend(GalleryExperienceModal, superClass);

    function GalleryExperienceModal() {
      return GalleryExperienceModal.__super__.constructor.apply(this, arguments);
    }

    GalleryExperienceModal.prototype.el = $("#gallery-post-modal");

    GalleryExperienceModal.prototype.events = {
      "click .modal-close": "close"
    };

    GalleryExperienceModal.prototype.renderOne = function(model) {
      var view;
      view = new ppu.admin.GalleryView({
        model: model
      });
      return this.$el.find('.modal-body .row').append(view.render().el);
    };

    GalleryExperienceModal.prototype.render = function() {
      this.$el.find('.modal-body .row').html('');
      this.collection.each(function(model) {
        return this.renderOne(model);
      }, this);
      return this.$el.modal();
    };

    GalleryExperienceModal.prototype.close = function(e) {
      e.preventDefault();
      return this.closeModal();
    };

    return GalleryExperienceModal;

  })(Backbone.View);
});
