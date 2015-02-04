class Api::Lawyrs::AwardsController < ApplicationController
  include BelongsToLawyer

  def entity
    Award
  end

end
