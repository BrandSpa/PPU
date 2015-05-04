class Language < ActiveRecord::Base
  # Concerns
  include Lawyerable
  
  # Validations
  validates :name, presence: true
end
