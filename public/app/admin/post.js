// $ ->
//   class ppu.Post extends Backbone.Model
//     urlRoot: '/api/posts'
// 
//   class ppu.Posts extends Backbone.Collection
//     url: '/api/posts'
//     model: ppu.Post
// 
//   class ppu.admin.PostView extends Backbone.View
//     template: $ '#post-admin-template'
//     tagName: 'tr'
({
  events: {
    "click .publish": "publish",
    "click .unpublish": "unpublish",
    "click .change-featured": "changeFeatured",
    "click .publish-on-social-network": "publishFb",
    "click .highlight": "featured",
    "click .unhighlight": "unhighlight",
    "click .translate": "translate"
  },

  initialize() {
    return this.listenTo(this.model, "change", this.render);
  },

  render() {
    let source = this.template.html();
    let t = Handlebars.compile(source);
    $(this.el).html(t( this.model.toJSON() ));
    return this;
  },

  publish(e) {
    e.preventDefault();
    return this.model.save({fields: {published: true}});
  },

  featured(e) {
    e.preventDefault();
    let { id } = this.model;
    return $.post(`/api/posts/${id}/featured`)
    .done(() => app.pubsub.trigger('post:unfeatured'));
  },

  publishFb(e){
    let published;
    e.preventDefault();
    let url = setSubdomain(this.model.get('lang')) + `posts/${this.model.get('slug')}`;
    return published = openShare(url);
  },

  unpublish(e) {
    e.preventDefault();
    return this.model.save({fields: {published: false}});
  },

  translate(e) {
    e.preventDefault();
    let { id } = this.model;
    return $.post(`/api/posts/${id}/duplicate`)
    .done(model => window.location = `/en/admin/posts/${model.id}/edit`);
  },

  changeFeatured(e) {
    let el = $(e.currentTarget).find('input').val();
    app.pubsub.trigger('post:changeFeatured', el);
    return this.model.save({fields: {featured: el}});
  },

  //   class ppu.admin.PostsView extends Backbone.View
  //     el: $ "#posts-dasboard"
  initialize() {
    this.listenTo(this.collection, 'reset', this.render);
    this.listenTo(this.collection, 'add', this.addOne, this);
    app.pubsub.on("posts:filter", this.filterCollection, this);
    app.pubsub.on("post:changeFeatured", this.changeFeatured, this);
    return app.pubsub.on('post:unfeatured', this.pull, this);
  },

  filterCollection(filters) {
    return this.collection.fetch({reset: true, lang: app.lang, data: filters});
  },

  pull() {
    return this.collection.fetch({reset: true});
  },

  changeFeatured(val) {
    let coll = new ppu.Posts;
    return this.collection.fetch({add: false, data: {is_featured: val}})
      .done(models => coll.add(models));
  },

  addOne(model) {
    let view = new ppu.admin.PostView({model});
    return $(this.el).find('thead').append(view.render().el);
  },

  render() {
    $(this.el).find('tbody').html('');
    return this.collection.each(function(model) {
      let view = new ppu.admin.PostView({model});
      return $(this.el).find('tbody').append(view.render().el);
    }
    , this);
  },

  //   class ppu.admin.PostsFilters extends Backbone.View
  //     el: $ '.post-filter'
  events: {
    'click .see-more' : 'seeMore',
    'change .country': 'byCountry',
    'change .category': 'byCategory',
    'keydown .query': 'byKeyword',
    'change .by-lang': 'byLang'
  },

  initialize() {
    return this.filtersAplied = {lang: "es", the_actual_ch: 0, the_actual_co: 0};
  },

  // append template to $el
  render() {
    let template = app.compile(this.template);
    return this.$el.html(template);
  },

  filterBy(data) {
    data = _.extend(this.filtersAplied,  data);
    return app.pubsub.trigger("posts:filter", data);
  },

  seeMore(e) {
    e.preventDefault();
    let offset = $(this.el).data('offset') || 20;
    let data = _.extend(this.filtersAplied, {paginate: offset});
    ppu.posts.fetch({data});
    return $(this.el).data('offset', (offset+20));
  },

  byCountry(e) {
    let el = $(e.currentTarget);
    let val = el.val();
    let data = _.extend(this.filtersAplied, {country: val});
    return app.pubsub.trigger("posts:filter", data);
  },

  byCategory(e) {
    let val = $(e.currentTarget).find('select').val();
    let data = _.extend(this.filtersAplied, {category: val});
    return app.pubsub.trigger("posts:filter", data);
  },

  byKeyword(e) {
    let val = $(e.currentTarget).val();
    if (val.length >= 1) {
      return this.filterBy({keyword: val});
    }
  },

  byLang(e) {
    let val = $(e.currentTarget).val();
    return this.filterBy({lang: val});
  },

  //   class ppu.admin.PostCreate extends Backbone.View
  //     el: $ "#post-create"
  //     template: $ "#post-create-template"
  events: {
    "click button.store": "store",
    "click .open-gallery": "openGallery",
    "keydown input[name='query']": "searchLawyer",
    "change .form-control": "removeError",
    "keydown .form-control": "removeError"
  },

  initialize() {
    this.listenTo(this.model, 'error', this.showErrors, this);
    this.listenTo(this.model, 'sync', this.stored);
    app.pubsub.bind('gallery:selected', this.appendSelectedGallery, this);
    return app.pubsub.on('post:socialPublished', this.redirectTo, this);
  },

  render() {
    let source = this.template.html();
    let template = Handlebars.compile(source);
    this.$el.find('.panel-body').html(template());
    ppu.appendDatePicker(this.el);
    return ppu.appendSummernote(this.el);
  },

  // send data from form
  store(e) {
    e.preventDefault();
    let $form = this.$el.find('form');

    let content = $(this.el).find('.summernote').code();
    let data = new FormData($form[0]);

    data.append("fields[content]", content);
    data.append("fields[lang]", app.lang);

    let options = ppu.ajaxOptions("POST", data);
    return this.model.save(data, $.extend({}, options));
  },

  // after store redirect to post
  stored(model) {
     return window.location = `/posts/${this.model.get('slug')}`;
   },

  // show errors of validation
  showErrors(model, b) {
    return _.each(b.responseJSON, error =>
      _.each(error, function(message) {
        console.log(message);
        return toastr.error(message);
      })
    );
  },

  getCategories() {
    ppu.categories = new ppu.Categories;
    return ppu.categories.fetch({data: {lang: app.lang}}).done(function(collection) {
      let source = $('#lawyer-categories-template').html();
      let template = Handlebars.compile(source);
      return $('#categories-checkboxes').html(template( collection ));
    });
  },

  openGallery(e) {
    e.preventDefault();
    ppu.admin.galleryPostModal = new ppu.admin.GalleryPostModal({collection: ppu.admin.galleries});
    return ppu.admin.galleryPostModal.render();
  },

  appendSelectedGallery(gallery_id) {
    $(this.el).find('.gallery_id').val(gallery_id);
    return ppu.admin.galleryPostModal.closeModal();
  },

  searchLawyer(e) {
    let query = $(e.currentTarget).val();
    if (query.length > 3) {
      let collection = new ppu.Lawyers;
      ppu.admin.postLawyersSelect = new ppu.admin.PostLawyersSelect({collection});
      return ppu.admin.postLawyersSelect.search(query);
    }
  },

  //   class ppu.admin.PostEdit extends Backbone.View
  //     el: $ "#post-edit"
  //     template: $ "#post-create-template"
  //     removeImg: false
  //     removeGallery: false
  // jquery events
  events: {
    "click button.update": "update",
    "click .open-gallery": "openGallery",
    "keydown input[name='query']": "searchLawyer",
    "change .form-control": "removeError",
    "keydown .form-control": "removeError",
    "click .remove-img": "removeImg",
    "click .remove-gallery": "removeGallery"
  },

  // Start to listen events when the view it's initialize
  initialize() {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'error', this.renderPostErrors, this);
    app.pubsub.bind('gallery:selected', this.appendSelectedGallery, this);
    return app.pubsub.on('post:socialPublished', this.redirectTo, this);
  },

  // apped template with data to $el
  render() {
    let template = app.compile(this.template);
    this.$el.find('.panel-body').html(template( this.model.toJSON() ));
    ppu.appendDatePicker(this.el);
    ppu.appendSummernote(this.el);
    this.getCategories();
    return this.showLawyers();
  },

  removeImg(e) {
    e.preventDefault();
    this.removeImg = true;
    return $(this.el).find('.img-name').remove();
  },

  removeGallery(e){
    e.preventDefault();
    this.removeGallery = true;
    return $(this.el).find('.gallery-img').remove();
  },

  // send data modified to server
  update(e) {
    e.preventDefault();
    let that = this;

    let $form = this.$el.find('form');
    let content = $(this.el).find('.summernote').code();
    let data = new FormData($form[0]);

    if (this.removeImg === true) {
      data.append("fields[remove_img_name]", true);
    }

    if (this.removeGallery === true) {
      data.append("fields[gallery_id]", null);
    }

    data.append("fields[content]", content);
    let options = ppu.ajaxOptions("PUT", data);
    return this.model.save(data, $.extend({}, options))
      .done(model => that.updated(model, that));
  },

  // redirect to post url when it's updated
  updated(model, that) {
    return window.location = `/admin/posts/${model.id}/edit`;
  },

  redirectTo() {
    return window.location = '/admin/posts';
  },

  // get categories
  getCategories() {
    ppu.categories = new ppu.Categories;
    let el = this.$el;
    let modelCategories = this.model.get('categories');

    return ppu.categories.fetch({data: {locale: app.lang}}).done(function(collection) {
      let source = $('#lawyer-categories-template').html();
      let template = Handlebars.compile(source);
      $('#categories-checkbox').html(template( collection ));
      return _.each(modelCategories, category => $(el).find(`#categories-checkbox input[value='${category.id}']`).attr("checked", "checked"));
    });
  },

  showLawyers() {
    let lawyers = this.model.get('lawyers');
    return _.each(lawyers, function(lawyer) {
      let view = new ppu.admin.PostLawyersSelected;
      return view.renderObject(lawyer);
    });
  },

  openGallery(e) {
    e.preventDefault();
    ppu.admin.galleryPostModal = new ppu.admin.GalleryPostModal({collection: ppu.admin.galleries});
    return ppu.admin.galleryPostModal.render();
  },

  appendSelectedGallery(gallery_id) {
    $(this.el).find('.gallery_id').val(gallery_id);
    return ppu.admin.galleryPostModal.closeModal();
  },

  searchLawyer(e) {
    let query = $(e.currentTarget).val();
    if (query.length > 3) {
      let collection = new ppu.Lawyers;
      ppu.admin.postLawyersSelect = new ppu.admin.PostLawyersSelect({collection});
      return ppu.admin.postLawyersSelect.search(query);
    }
  },

  //   class ppu.admin.PostSelectLawyers extends Backbone.View
  //     el: $ "#"
  //     template: "#lawyer-select"
  //     events:
  //       "submit .search": "search"
  render() {
    this.$el.find('.modal-body').html(app.compileTemplate(this.template));
    this.$el.modal();
    return this;
  },

  search(e) {
    let query = $(e.currentTarget).val();
    return this.collection.fetch({data: {query}});
  },

  //   class ppu.admin.PostLawyerSelect extends Backbone.View
  //     tagName: 'tr'
  //     template: $ '#lawyer-select-template'
  //     events:
  //       "click .append": "append"
  render() {
    let source = this.template.html();
    let template = Handlebars.compile(source);
    this.$el.html(template( this.model.toJSON() ));
    return this;
  },

  append(e) {
    e.preventDefault();
    ppu.admin.postLawyersSelected =  new ppu.admin.PostLawyersSelected({model: this.model});
    return ppu.admin.postLawyersSelected.render();
  },

  //   class ppu.admin.PostLawyersSelect extends Backbone.View
  //     el: $ "#lawyers-result"
  events: {
    "" : ""
  },

  initialize() {
   return this.listenTo(this.collection, 'reset', this.render);
 },

  render() {
    $("#lawyers-result").html('');
    return this.collection.each(function(model) {
      let view = new ppu.admin.PostLawyerSelect({model});
      return $("#lawyers-result").prepend(view.render().el);
    }
    , this);
  },

  search(query) {
    return this.collection.fetch({reset: true, data: {search: query}});
  },

  //   class ppu.admin.PostLawyersSelected extends Backbone.View
  //     template: $ '#lawyer-selected-template'
  //     tagName: 'tr'
  //     events:
  //       "click .remove": "destroy"
  render() {
    let source = this.template.html();
    let template = Handlebars.compile(source);

    return $('#lawyers-selected tbody').append(this.$el.html( template( this.model.toJSON() ) ));
  },

  renderObject(model){
    let source = this.template.html();
    let template = Handlebars.compile(source);
    return $('#lawyers-selected tbody').append(this.$el.html( template( model) ));
  },

  destroy(e){
    e.preventDefault();
    return this.$el.remove();
  }
});
