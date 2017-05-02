var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$(function() {
  ppu.Post = (function(superClass) {
    extend(Post, superClass);

    function Post() {
      return Post.__super__.constructor.apply(this, arguments);
    }

    Post.prototype.urlRoot = '/api/posts';

    return Post;

  })(Backbone.Model);
  ppu.Posts = (function(superClass) {
    extend(Posts, superClass);

    function Posts() {
      return Posts.__super__.constructor.apply(this, arguments);
    }

    Posts.prototype.url = '/api/posts';

    Posts.prototype.model = ppu.Post;

    return Posts;

  })(Backbone.Collection);
  ppu.admin.PostView = (function(superClass) {
    extend(PostView, superClass);

    function PostView() {
      return PostView.__super__.constructor.apply(this, arguments);
    }

    PostView.prototype.template = $('#post-admin-template');

    PostView.prototype.tagName = 'tr';

    PostView.prototype.events = {
      "click .publish": "publish",
      "click .unpublish": "unpublish",
      "click .change-featured": "changeFeatured",
      "click .publish-on-social-network": "publishFb",
      "click .highlight": "featured",
      "click .unhighlight": "unhighlight",
      "click .translate": "translate"
    };

    PostView.prototype.initialize = function() {
      return this.listenTo(this.model, "change", this.render);
    };

    PostView.prototype.render = function() {
      var source, t;
      source = this.template.html();
      t = Handlebars.compile(source);
      $(this.el).html(t(this.model.toJSON()));
      return this;
    };

    PostView.prototype.publish = function(e) {
      e.preventDefault();
      return this.model.save({
        fields: {
          published: true
        }
      });
    };

    PostView.prototype.featured = function(e) {
      var id;
      e.preventDefault();
      id = this.model.id;
      return $.post("/api/posts/" + id + "/featured").done(function() {
        return app.pubsub.trigger('post:unfeatured');
      });
    };

    PostView.prototype.publishFb = function(e) {
      var published, url;
      e.preventDefault();
      url = setSubdomain(this.model.get('lang')) + ("posts/" + (this.model.get('slug')));
      return published = openShare(url);
    };

    PostView.prototype.unpublish = function(e) {
      e.preventDefault();
      return this.model.save({
        fields: {
          published: false
        }
      });
    };

    PostView.prototype.translate = function(e) {
      var id;
      e.preventDefault();
      id = this.model.id;
      return $.post("/api/posts/" + id + "/duplicate").done(function(model) {
        return window.location = "/en/admin/posts/" + model.id + "/edit";
      });
    };

    PostView.prototype.changeFeatured = function(e) {
      var el;
      el = $(e.currentTarget).find('input').val();
      app.pubsub.trigger('post:changeFeatured', el);
      return this.model.save({
        fields: {
          featured: el
        }
      });
    };

    return PostView;

  })(Backbone.View);
  ppu.admin.PostsView = (function(superClass) {
    extend(PostsView, superClass);

    function PostsView() {
      return PostsView.__super__.constructor.apply(this, arguments);
    }

    PostsView.prototype.el = $("#posts-dasboard");

    PostsView.prototype.initialize = function() {
      this.listenTo(this.collection, 'reset', this.render);
      this.listenTo(this.collection, 'add', this.addOne, this);
      app.pubsub.on("posts:filter", this.filterCollection, this);
      app.pubsub.on("post:changeFeatured", this.changeFeatured, this);
      return app.pubsub.on('post:unfeatured', this.pull, this);
    };

    PostsView.prototype.filterCollection = function(filters) {
      return this.collection.fetch({
        reset: true,
        lang: app.lang,
        data: filters
      });
    };

    PostsView.prototype.pull = function() {
      return this.collection.fetch({
        reset: true
      });
    };

    PostsView.prototype.changeFeatured = function(val) {
      var coll;
      coll = new ppu.Posts;
      return this.collection.fetch({
        add: false,
        data: {
          is_featured: val
        }
      }).done(function(models) {
        return coll.add(models);
      });
    };

    PostsView.prototype.addOne = function(model) {
      var view;
      view = new ppu.admin.PostView({
        model: model
      });
      return $(this.el).find('thead').append(view.render().el);
    };

    PostsView.prototype.render = function() {
      $(this.el).find('tbody').html('');
      return this.collection.each(function(model) {
        var view;
        view = new ppu.admin.PostView({
          model: model
        });
        return $(this.el).find('tbody').append(view.render().el);
      }, this);
    };

    return PostsView;

  })(Backbone.View);
  ppu.admin.PostsFilters = (function(superClass) {
    extend(PostsFilters, superClass);

    function PostsFilters() {
      return PostsFilters.__super__.constructor.apply(this, arguments);
    }

    PostsFilters.prototype.el = $('.post-filter');

    PostsFilters.prototype.events = {
      'click .see-more': 'seeMore',
      'change .country': 'byCountry',
      'change .category': 'byCategory',
      'keydown .query': 'byKeyword',
      'change .by-lang': 'byLang'
    };

    PostsFilters.prototype.initialize = function() {
      return this.filtersAplied = {
        lang: "es",
        the_actual_ch: 0,
        the_actual_co: 0
      };
    };

    PostsFilters.prototype.render = function() {
      var template;
      template = app.compile(this.template);
      return this.$el.html(template);
    };

    PostsFilters.prototype.filterBy = function(data) {
      data = _.extend(this.filtersAplied, data);
      return app.pubsub.trigger("posts:filter", data);
    };

    PostsFilters.prototype.seeMore = function(e) {
      var data, offset;
      e.preventDefault();
      offset = $(this.el).data('offset') || 20;
      data = _.extend(this.filtersAplied, {
        paginate: offset
      });
      ppu.posts.fetch({
        data: data
      });
      return $(this.el).data('offset', offset + 20);
    };

    PostsFilters.prototype.byCountry = function(e) {
      var data, el, val;
      el = $(e.currentTarget);
      val = el.val();
      data = _.extend(this.filtersAplied, {
        country: val
      });
      return app.pubsub.trigger("posts:filter", data);
    };

    PostsFilters.prototype.byCategory = function(e) {
      var data, val;
      val = $(e.currentTarget).find('select').val();
      data = _.extend(this.filtersAplied, {
        category: val
      });
      return app.pubsub.trigger("posts:filter", data);
    };

    PostsFilters.prototype.byKeyword = function(e) {
      var val;
      val = $(e.currentTarget).val();
      if (val.length >= 1) {
        return this.filterBy({
          keyword: val
        });
      }
    };

    PostsFilters.prototype.byLang = function(e) {
      var val;
      val = $(e.currentTarget).val();
      return this.filterBy({
        lang: val
      });
    };

    return PostsFilters;

  })(Backbone.View);
  ppu.admin.PostCreate = (function(superClass) {
    extend(PostCreate, superClass);

    function PostCreate() {
      return PostCreate.__super__.constructor.apply(this, arguments);
    }

    PostCreate.prototype.el = $("#post-create");

    PostCreate.prototype.template = $("#post-create-template");

    PostCreate.prototype.events = {
      "click button.store": "store",
      "click .open-gallery": "openGallery",
      "keydown input[name='query']": "searchLawyer",
      "change .form-control": "removeError",
      "keydown .form-control": "removeError"
    };

    PostCreate.prototype.initialize = function() {
      this.listenTo(this.model, 'error', this.showErrors, this);
      this.listenTo(this.model, 'sync', this.stored);
      app.pubsub.bind('gallery:selected', this.appendSelectedGallery, this);
      return app.pubsub.on('post:socialPublished', this.redirectTo, this);
    };

    PostCreate.prototype.render = function() {
      var source, template;
      source = this.template.html();
      template = Handlebars.compile(source);
      this.$el.find('.panel-body').html(template());
      ppu.appendDatePicker(this.el);
      return ppu.appendSummernote(this.el);
    };

    PostCreate.prototype.store = function(e) {
      var $form, content, data, options;
      e.preventDefault();
      $form = this.$el.find('form');
      content = $(this.el).find('.summernote').code();
      data = new FormData($form[0]);
      data.append("fields[content]", content);
      data.append("fields[lang]", app.lang);
      options = ppu.ajaxOptions("POST", data);
      return this.model.save(data, $.extend({}, options));
    };

    PostCreate.prototype.stored = function(model) {
      return window.location = "/posts/" + (this.model.get('slug'));
    };

    PostCreate.prototype.showErrors = function(model, b) {
      return _.each(b.responseJSON, function(error) {
        return _.each(error, function(message) {
          return toastr.error(message);
        });
      });
    };

    PostCreate.prototype.getCategories = function() {
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

    PostCreate.prototype.openGallery = function(e) {
      e.preventDefault();
      ppu.admin.galleryPostModal = new ppu.admin.GalleryPostModal({
        collection: ppu.admin.galleries
      });
      return ppu.admin.galleryPostModal.render();
    };

    PostCreate.prototype.appendSelectedGallery = function(gallery_id) {
      $(this.el).find('.gallery_id').val(gallery_id);
      return ppu.admin.galleryPostModal.closeModal();
    };

    PostCreate.prototype.searchLawyer = function(e) {
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

    return PostCreate;

  })(Backbone.View);
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
  ppu.admin.PostSelectLawyers = (function(superClass) {
    extend(PostSelectLawyers, superClass);

    function PostSelectLawyers() {
      return PostSelectLawyers.__super__.constructor.apply(this, arguments);
    }

    PostSelectLawyers.prototype.el = $("#");

    PostSelectLawyers.prototype.template = "#lawyer-select";

    PostSelectLawyers.prototype.events = {
      "submit .search": "search"
    };

    PostSelectLawyers.prototype.render = function() {
      this.$el.find('.modal-body').html(app.compileTemplate(this.template));
      this.$el.modal();
      return this;
    };

    PostSelectLawyers.prototype.search = function(e) {
      var query;
      query = $(e.currentTarget).val();
      return this.collection.fetch({
        data: {
          query: query
        }
      });
    };

    return PostSelectLawyers;

  })(Backbone.View);
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
  return ppu.admin.PostLawyersSelected = (function(superClass) {
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
