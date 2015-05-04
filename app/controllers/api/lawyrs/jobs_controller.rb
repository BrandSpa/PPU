class Api::Lawyrs::JobsController < ApplicationController
  include BelongsToLawyer

  def entity
    Job
  end
end
