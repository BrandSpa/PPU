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
  ppu.admin.Post = (function(_super) {
    __extends(Post, _super);

    function Post() {
      return Post.__super__.constructor.apply(this, arguments);
    }

    Post.prototype.template = $("#");

    Post.prototype.render = function() {};

    return Post;

  })(Backbone.View);
  ppu.admin.Posts = (function(_super) {
    __extends(Posts, _super);

    function Posts() {
      return Posts.__super__.constructor.apply(this, arguments);
    }

    Posts.prototype.el = $("#");

    Posts.prototype.render = function() {};

    return Posts;

  })(Backbone.View);
  ppu.admin.PostCreate = (function(_super) {
    __extends(PostCreate, _super);

    function PostCreate() {
      return PostCreate.__super__.constructor.apply(this, arguments);
    }

    PostCreate.prototype.el = $("#post-create");

    PostCreate.prototype.template = $("#post-create-template");

    PostCreate.prototype.events = {
      "click button.store": "store"
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
      return console.log($(this.el).find('.summernote').code());
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
  return ppu.admin.SelectLawyersModal = (function(_super) {
    __extends(SelectLawyersModal, _super);

    function SelectLawyersModal() {
      return SelectLawyersModal.__super__.constructor.apply(this, arguments);
    }

    SelectLawyersModal.prototype.el = $("#");

    SelectLawyersModal.prototype.events = {
      "submit .search": "search"
    };

    SelectLawyersModal.prototype.render = function() {};

    return SelectLawyersModal;

  })(Backbone.View);
});
