mixins.lawyerRelationshipView = {
  events: {
    "click .open-edit": "openEdit",
    "click .remove": "remove"
  },
  initialize: function() {
    return this.listenTo(this.model, 'change', this.render);
  },
  render: function() {
    var source, template;
    source = $(this.template).html();
    template = Handlebars.compile(source);
    this.$el.html(template(this.model.toJSON()));
    this.$el.append('<a href="#" class="btn btn-warning btn-xs open-edit" >editar</a> ');
    this.$el.append('<a href="#" class="btn btn-danger btn-xs remove" >eliminar</a>');
    return this;
  },
  openEdit: function(e) {
    var view;
    e.preventDefault();
    view = new this.modal({
      model: this.model
    });
    return view.render();
  },
  remove: function(e) {
    e.preventDefault();
    this.model.destroy();
    this.$el.fadeOut();
    return this.$el.remove();
  }
};

mixins.lawyerRelationshipViews = {
  events: {
    'click .open-modal-create': 'openCreate'
  },
  initialize: function() {
    this.listenTo(this.collection, 'reset', this.renderCollection);
    return this.listenTo(this.collection, 'add', this.renderCollection);
  },
  renderCollection: function() {
    this.$el.find('ul').html('');
    return this.collection.each(function(model) {
      return this.renderOne(model);
    }, this);
  },
  renderOne: function(model) {
    var view;
    view = new this.view({
      model: model
    });
    return this.$el.find('ul').append(view.render().el);
  },
  openCreate: function(e) {
    var lawyer_id, view;
    e.preventDefault();
    lawyer_id = ppu.currentLawyerId || this.collection.models[0].get('lawyer_id');
    view = new this.modal({
      model: new this.collection.model,
      collection: this.collection
    });
    return view.render(lawyer_id);
  }
};

mixins.renderCollection = function(collection_name, view_name, data) {
  var collection, view;
  collection = new collection_name;
  collection.fetch({
    reset: true,
    data: data
  });
  return view = new view_name({
    collection: collection
  });
};

mixins.lawyerRelationshipModalCreate = {
  events: {
    "click .create": "create",
    "click .modal-close": "close"
  },
  initialize: function() {
    return this.listenTo(this.model, 'sync', this.created);
  },
  render: function(lawyer_id) {
    var data, source, template;
    data = {
      lawyer_id: lawyer_id
    };
    this.$el.find('.modal-body').html('');
    source = $(this.template).html();
    template = Handlebars.compile(source);
    this.$el.find('.modal-body').html(template(data));
    $(this.el).modal({
      backdrop: 'static'
    });
    return ppu.appendDatePickerYear(this.el);
  },
  create: function(e) {
    var $form, data, el, lawyer_id;
    e.preventDefault();
    el = $(e.currentTarget);
    lawyer_id = el.data('lawyer_id');
    $form = this.$el.find('form');
    data = new FormData($form[0]);
    return this.model.save(data, $.extend({}, ppu.ajaxOptions("POST", data)));
  },
  created: function(model) {
    if (model.id) {
      this.collection.add(model);
      return this.closeModal();
    }
  },
  close: function(e) {
    e.preventDefault();
    return this.closeModal();
  }
};

mixins.lawyerRelationshipModalEdit = {
  events: {
    "click .update": "update",
    "click .modal-close": "close"
  },
  initialize: function() {
    return this.listenTo(this.model, 'sync', this.updated);
  },
  render: function() {
    var source, template;
    this.$el.find('.modal-body').html('');
    source = $(this.template).html();
    template = Handlebars.compile(source);
    this.$el.find('.modal-body').html(template(this.model.toJSON()));
    $(this.el).modal({
      backdrop: 'static'
    });
    return ppu.appendDatePickerYear(this.el);
  },
  update: function(e) {
    var $form, data;
    e.preventDefault();
    $form = this.$el.find('form');
    data = new FormData($form[0]);
    return this.model.save(data, $.extend({}, ppu.ajaxOptions("PUT", data)));
  },
  updated: function(model) {
    if (model.id) {
      return this.closeModal();
    }
  },
  close: function(e) {
    e.preventDefault();
    return this.closeModal();
  }
};
