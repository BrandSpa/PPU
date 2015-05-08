ppu.LawyersController = {
  index: ->
    ppu.lawyers =  new ppu.Lawyers
    ppu.lawyersView =  new ppu.LawyersView collection: ppu.lawyers
    ppu.lawyersFilters = new ppu.LawyersFilters
    ppu.filtersMobile = new ppu.FiltersMobile

  show: (slug)->
    ppu.lawyer = new ppu.Lawyer id: slug
    ppu.LawyerDetailView = new ppu.LawyerDetailView model: ppu.lawyer
    ppu.lawyer.fetch()
    
    $("#top-bar").html $("#lawyer-detail-title").html()
}
