ppu.CategoriesController = {

  index: ->
    ppu.categories = new ppu.Categories
    ppu.categories.fetch reset: true
    ppu.categoriesView = new ppu.CategoriesView collection: ppu.categories

    $("#top-bar").html( $("#category-title").html() )

  show: (slug) ->
    ppu.category = new ppu.Category id: slug
    ppu.category.fetch()
    ppu.categoryDetail = new ppu.CategoryDetail model: ppu.category

    ppu.categories = new ppu.Categories
    ppu.categoriesList = new ppu.CategoriesList collection: ppu.categories

    ppu.lawyers = new ppu.Lawyers
    ppu.lawyersRelated = new ppu.lawyersRelatedCategory collection: ppu.lawyers

    $("#top-bar").html $("#category-detail-title").html()

}
