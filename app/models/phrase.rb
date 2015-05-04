class Phrase < ActiveRecord::Base

  # Concerns
  include Lawyerable

  #Validations
  validates :author, presence: true, unless: :content?
end
