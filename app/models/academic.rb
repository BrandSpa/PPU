class Academic < ActiveRecord::Base
  # Concerns
  include Lawyerable

  # Relationships
  belongs_to :lawyer
  
  # Validations
  validates :title, presence: true, unless: :institution?
end
