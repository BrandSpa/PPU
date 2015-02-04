class Api::Lawyrs::ArticlesController < ApplicationController
  include BelongsToLawyer
  
  def entity
    Article
  end
  


end
