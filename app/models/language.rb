class Language < ActiveRecord::Base
  belongs_to :lawyer
  validates :name, length: { minimum: 3 }
end
