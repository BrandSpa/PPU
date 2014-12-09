class Phrase < ActiveRecord::Base
  belongs_to :lawyer
  validates :content, length: { minimum: 3 }
end
