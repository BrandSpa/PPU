ppu.CategoriesController = {

  index: ->
    ppu.category = new ppu.Category id: slug
    ppu.category.fetch()
    ppu.categoryDetail = new ppu.CategoryDetail model: ppu.category

    ppu.categories = new ppu.Categories
    ppu.categoriesList = new ppu.CategoriesList collection: ppu.categories

    ppu.lawyers = new ppu.Lawyers
    ppu.lawyersRelated = new ppu.lawyersRelatedCategory collection: ppu.lawyers

  show: (slug) ->
    ppu.category = new ppu.Category id: slug
    ppu.category.fetch()
    ppu.categoryDetail = new ppu.CategoryDetail model: ppu.category

    ppu.categories = new ppu.Categories
    ppu.categoriesList = new ppu.CategoriesList collection: ppu.categories

    ppu.lawyers = new ppu.Lawyers
    ppu.lawyersRelated = new ppu.lawyersRelatedCategory collection: ppu.lawyers

}
