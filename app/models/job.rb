class Job < ActiveRecord::Base

  # Concerns
  include Lawyerable

  # Validations
  validates :title, presence: true, unless: :company?
end
