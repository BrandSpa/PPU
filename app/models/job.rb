class Job < ActiveRecord::Base
  belongs_to :lawyer
  validates :title, length: { minimum: 3 }
end
