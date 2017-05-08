
  $(function() {
    ppu.Workspace = (function(superClass) {
      extend(Workspace, superClass);

      function Workspace() {
        return Workspace.__super__.constructor.apply(this, arguments);
      }

      Workspace.prototype.routes = {
        "": "posts",
        "posts": "posts",
        "posts/:slug": "post",
        "abogados": "lawyers",
        "abogados/:slug": "lawyer",
        "experiencias": "experiences",
        "experiencias/:slug": "experience",
        "el-actual": "theActual",
        "el-actual/:slug": "theActualDetail",
        "el-actual-colombia": "theActualCo",
        "el-actual-colombia/:slug": "theActualCoDetail",
        "el-actual-peru": "theActualPe",
        "el-actual-peru/:slug": "theActualPeDetail",
        "areas": "areas",
        "areas/:slug": "area",
        "trabaje-con-nosotros": "curriculum",
        "nosotros": "us",
        "probono": "probono"
      };

      Workspace.prototype.initialize = function() {
        new ppu.AppView;
        window.urlTranslation = "";
        ppu.contact = new ppu.Contact;
        return ppu.FooterContactCreate = new ppu.FooterContactCreate({
          model: ppu.contact
        });
      };

      Workspace.prototype.posts = function() {
        return ppu.PostsController.index();
      };

      Workspace.prototype.post = function(slug) {
        return ppu.PostsController.show(slug);
      };

      Workspace.prototype.lawyers = function() {
        return ppu.LawyersController.index();
      };

      Workspace.prototype.lawyer = function(slug) {
        return ppu.LawyersController.show(slug);
      };

      Workspace.prototype.theActual = function() {
        return ppu.TheActualChController.index();
      };

      Workspace.prototype.theActualDetail = function(slug) {
        return ppu.TheActualChController.show(slug);
      };

      Workspace.prototype.theActualCo = function() {
        return ppu.TheActualCoController.index();
      };

      Workspace.prototype.theActualCoDetail = function(slug) {
        return ppu.TheActualCoController.show(slug);
      };

      Workspace.prototype.areas = function() {
        return ppu.CategoriesController.index();
      };

      Workspace.prototype.area = function(slug) {
        return ppu.CategoriesController.show(slug);
      };

      Workspace.prototype.experiences = function() {
        return ppu.ExperiencesController.index();
      };

      Workspace.prototype.experience = function(slug) {
        return ppu.ExperiencesController.show(slug);
      };

      Workspace.prototype.curriculum = function() {
        return ppu.curriculumsController.index();
      };

      Workspace.prototype.us = function() {
        return ppu.UsController.index();
      };

      Workspace.prototype.probono = function() {
        return ppu.ProbonoController.index();
      };

      return Workspace;

    })(Backbone.Router);
    new ppu.Workspace;
    return Backbone.history.start({
      pushState: true
    });
  });

