class Api::Lawyrs::LanguagesController < ApplicationController
  include BelongsToLawyer

  def entity
    Language
  end

  def index
    lawyer_id = params[:lawyer_id]
    collection = entity.all
    collection = collection.by_lawyer(lawyer_id) if lawyer_id.present?
    render json: collection, status: 200
  end

end
