class Award < ActiveRecord::Base
  include Lawyerable
  mount_uploader :img_name, AwardUploader
  validates :title, length: { minimum: 3 } 
end
