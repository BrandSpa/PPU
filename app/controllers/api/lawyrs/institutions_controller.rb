class Api::Lawyrs::InstitutionsController < ApplicationController
  include BelongsToLawyer
  
  def entity
    Institution
  end

end
