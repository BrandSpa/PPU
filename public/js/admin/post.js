var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  ppu.admin.Post = (function(_super) {
    __extends(Post, _super);

    function Post() {
      return Post.__super__.constructor.apply(this, arguments);
    }

    Post.prototype.urlRoot = '/api/posts';

    return Post;

  })(Backbone.Model);
  ppu.admin.Posts = (function(_super) {
    __extends(Posts, _super);

    function Posts() {
      return Posts.__super__.constructor.apply(this, arguments);
    }

    Posts.prototype.url = '/api/posts';

    Posts.prototype.model = ppu.admin.Post;

    return Posts;

  })(Backbone.Collection);
  ppu.admin.PostView = (function(_super) {
    __extends(PostView, _super);

    function PostView() {
      return PostView.__super__.constructor.apply(this, arguments);
    }

    PostView.prototype.template = $("#");

    PostView.prototype.render = function() {};

    return PostView;

  })(Backbone.View);
  ppu.admin.PostsView = (function(_super) {
    __extends(PostsView, _super);

    function PostsView() {
      return PostsView.__super__.constructor.apply(this, arguments);
    }

    PostsView.prototype.el = $("#");

    PostsView.prototype.render = function() {};

    return PostsView;

  })(Backbone.View);
  ppu.admin.PostCreate = (function(_super) {
    __extends(PostCreate, _super);

    function PostCreate() {
      return PostCreate.__super__.constructor.apply(this, arguments);
    }

    PostCreate.prototype.el = $("#post-create");

    PostCreate.prototype.template = $("#post-create-template");

    PostCreate.prototype.events = {
      "click button.store": "store",
      "click .open-gallery": "openGallery",
      "change .form-control": "removeError",
      "keydown .form-control": "removeError"
    };

    PostCreate.prototype.initialize = function() {
      return this.listenTo(this.model, 'error', this.renderPostErrors, this);
    };

    PostCreate.prototype.render = function() {
      var source, template;
      source = this.template.html();
      template = Handlebars.compile(source);
      this.$el.find('.panel-body').html(template());
      ppu.appendDatePicker(this.el);
      return ppu.appendSummernote(this.el);
    };

    PostCreate.prototype.store = function() {
      var $form, content, data, options;
      $form = this.$el.find('form');
      content = $(this.el).find('.summernote').code();
      data = new FormData($form[0]);
      data.append("post[content]", content);
      options = ppu.ajaxOptions("POST", data);
      return this.model.save(data, $.extend({}, options));
    };

    PostCreate.prototype.openGallery = function(e) {
      var modal;
      e.preventDefault();
      modal = new ppu.admin.GalleryPostModal({
        collection: ppu.admin.galleries
      });
      return modal.render();
    };

    PostCreate.prototype.appendImageHeader = function(id) {
      return this.$el.find('form').append("<input type='hidden' name='post[gallery_id]'' value='" + id + "'>");
    };

    return PostCreate;

  })(Backbone.View);
  ppu.admin.PostEdit = (function(_super) {
    __extends(PostEdit, _super);

    function PostEdit() {
      return PostEdit.__super__.constructor.apply(this, arguments);
    }

    PostEdit.prototype.el = $("#");

    return PostEdit;

  })(Backbone.View);
  ppu.admin.SelectLawyersModal = (function(_super) {
    __extends(SelectLawyersModal, _super);

    function SelectLawyersModal() {
      return SelectLawyersModal.__super__.constructor.apply(this, arguments);
    }

    SelectLawyersModal.prototype.el = $("#");

    SelectLawyersModal.prototype.template = "#lawyer-select";

    SelectLawyersModal.prototype.events = {
      "submit .search": "search"
    };

    SelectLawyersModal.prototype.render = function() {
      this.$el.find('.modal-body').html(app.compileTemplate(this.template));
      this.$el.modal();
      return this;
    };

    SelectLawyersModal.prototype.search = function(e) {
      var query;
      query = $(e.currentTarget).val();
      return this.collection.fetch({
        data: {
          query: query
        }
      });
    };

    return SelectLawyersModal;

  })(Backbone.View);
  return ppu.admin.galleryModal = (function(_super) {
    __extends(galleryModal, _super);

    function galleryModal() {
      return galleryModal.__super__.constructor.apply(this, arguments);
    }

    galleryModal.prototype.el = $("#gallery-modal");

    galleryModal.prototype.template = "#gallery-template";

    galleryModal.prototype.render = function() {
      this.$el.find('.modal-body').html(app.compileTemplate(this.template));
      this.$el.modal();
      return this;
    };

    return galleryModal;

  })(Backbone.View);
});
