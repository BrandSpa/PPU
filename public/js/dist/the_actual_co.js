ppu.admin.TheActualCoController = {
  index: function() {
    ppu.posts = new ppu.Posts;
    ppu.posts.fetch({
      reset: true,
      data: {
        the_actual_co: 1
      }
    });
    ppu.admin.posts = new ppu.admin.TheActualCoViews({
      collection: ppu.posts
    });
    return ppu.admin.postsFilters = new ppu.admin.PostsFilters;
  },
  create: function() {
    ppu.admin.post = new ppu.Post;
    ppu.admin.postCreate = new ppu.admin.TheActualCoCreate({
      model: ppu.admin.post
    });
    ppu.admin.postCreate.render();
    ppu.categories = new ppu.Categories;
    ppu.categories.fetch({
      reset: true
    });
    ppu.admin.categoriesCheckboxnew = new ppu.admin.CategoriesCheckbox({
      collection: ppu.categories
    });
    ppu.admin.galleries = new ppu.admin.Galleries;
    return ppu.admin.galleries.fetch({
      reset: true,
      data: {
        name: "post_header"
      }
    });
  },
  edit: function() {
    ppu.admin.post = new ppu.Post({
      id: id
    });
    ppu.admin.post.fetch({
      data: {
        lang: app.lang
      }
    });
    ppu.admin.postEdit = new ppu.admin.PostEdit({
      model: ppu.admin.post
    });
    ppu.admin.galleries = new ppu.admin.Galleries;
    return ppu.admin.galleries.fetch({
      reset: true,
      data: {
        name: "post_header"
      }
    });
  }
};
