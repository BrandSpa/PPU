class Api::Lawyrs::PharasesController < ApplicationController
  include BelongsToLawyer

  def entity
    Phrase
  end
end
