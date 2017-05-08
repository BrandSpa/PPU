
  $(function() {
    ppu.admin.Router = (function(superClass) {
      extend(Router, superClass);

      function Router() {
        return Router.__super__.constructor.apply(this, arguments);
      }

      Router.prototype.routes = {
        'dashboard': 'dashboard',
        'crear-abogado': 'createLawyer',
        "admin/lawyers/new": "createLawyer",
        "en/admin/lawyers/new": "createLawyer",
        ':lang/crear-abogado': 'createLawyer',
        'admin/lawyers/:id/edit': 'editLawyer',
        "en/admin/lawyers/:id/edit": "editLawyer",
        'editar-abogado/:id': 'editLawyer',
        'en/editar-abogado/:id': 'editLawyer',
        'admin/posts': 'post',
        'admin/posts/new': 'createPost',
        'en/admin/posts/new': 'createPost',
        'admin/posts/:id/edit': 'editPost',
        'en/admin/posts/:id/edit': 'editPost',
        'admin/the-actual/new': 'createTheActual',
        'admin/the-actual/:id/edit': 'editTheActual',
        'en/admin/the-actual/:id/edit': 'editTheActual',
        'admin/the-actual': 'theActual',
        'admin/the-actual-co/new': 'createTheActualCo',
        'admin/the-actual-co/:id/edit': 'editTheActualCo',
        'en/admin/the-actual-co/:id/edit': 'editTheActualCo',
        'admin/the-actual-co': 'theActualCo',
        'admin/the-actual-pe/new': 'createTheActualPe',
        'admin/the-actual-pe/:id/edit': 'editTheActualPe',
        'en/admin/the-actual-pe/:id/edit': 'editTheActualPe',
        'admin/the-actual-pe': 'theActualPe',
        'admin/experiences': 'experience',
        'admin/experiences/new': 'createExperience',
        'admin/experiences/:id/edit': 'editExperience',
        'en/admin/experiences/:id/edit': 'editExperience'
      };

      Router.prototype.dashboard = function() {
        return ppu.admin.LawyersController.index();
      };

      Router.prototype.lawyer = function() {
        return ppu.admin.LawyersController.show();
      };

      Router.prototype.createLawyer = function(lang) {
        return ppu.admin.LawyersController.create();
      };

      Router.prototype.editLawyer = function(id) {
        return ppu.admin.LawyersController.edit(id);
      };

      Router.prototype.post = function() {
        return ppu.admin.PostsController.index();
      };

      Router.prototype.createPost = function(lang) {
        return ppu.admin.PostsController.create();
      };

      Router.prototype.editPost = function(id) {
        return ppu.admin.PostsController.edit(id);
      };

      Router.prototype.theActual = function() {
        return ppu.admin.TheActualChController.index();
      };

      Router.prototype.createTheActual = function() {
        return ppu.admin.TheActualChController.create();
      };

      Router.prototype.editTheActual = function(id) {
        return ppu.admin.TheActualChController.edit(id);
      };

      Router.prototype.theActualCo = function() {
        return ppu.admin.TheActualCoController.index();
      };

      Router.prototype.createTheActualCo = function() {
        return ppu.admin.TheActualCoController.create();
      };

      Router.prototype.editTheActualCo = function(id) {
        return ppu.admin.TheActualCoController.edit(id);
      };

      Router.prototype.theActualPe = function() {
        return ppu.admin.TheActualPeController.index();
      };

      Router.prototype.createTheActualPe = function() {
        return ppu.admin.TheActualPeController.create();
      };

      Router.prototype.editTheActualPe = function(id) {
        return ppu.admin.TheActualPeController.edit(id);
      };

      Router.prototype.experience = function() {
        return ppu.admin.ExperiencesController.index();
      };

      Router.prototype.createExperience = function(lang) {
        return ppu.admin.ExperiencesController.create();
      };

      Router.prototype.editExperience = function(id) {
        return ppu.admin.ExperiencesController.edit(id);
      };

      return Router;

    })(Backbone.Router);
    
    return ppu.admin.router = new ppu.admin.Router;
  });

