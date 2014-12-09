class Award < ActiveRecord::Base
  has_and_belongs_to_many :lawyer
  mount_uploader :img_name, AwardUploader
  validates :title, length: { minimum: 3 } 
end
