class Api::Lawyrs::AcademicsController < ApplicationController
  include BelongsToLawyer
  
  def entity
    Academic
  end


end
