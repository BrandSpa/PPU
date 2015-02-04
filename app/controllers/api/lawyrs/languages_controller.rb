class Api::Lawyrs::LanguagesController < ApplicationController
  include BelongsToLawyer

  def entity
    Language
  end

end
