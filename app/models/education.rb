class Education < ActiveRecord::Base

  #Concerns
  include Lawyerable

  # Validations
  validates :title, presence: true, unless: :institution?
  
end
