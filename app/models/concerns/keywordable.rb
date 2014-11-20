module keywordable

  def add_keywords(*args)
    model = self
    model.keywords = args.join(" ")
    model.save
  end 
end