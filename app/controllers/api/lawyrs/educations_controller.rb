class Api::Lawyrs::EducationsController < ApplicationController
  include BelongsToLawyer

  def entity
    Education
  end
end
