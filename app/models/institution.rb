class Institution < ActiveRecord::Base

  # Concerns
  include Lawyerable
  
  # Validations
  validates :title, presence: true
end
