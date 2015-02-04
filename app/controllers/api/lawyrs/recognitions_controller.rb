class Api::Lawyrs::RecognitionsController < ApplicationController
  include BelongsToLawyer

  def entity
    Recognition
  end

end
