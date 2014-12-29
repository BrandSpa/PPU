class Award < ActiveRecord::Base
  include Lawyerable
  mount_uploader :img_name, AwardUploader
  validates :img_name, presence: true, unless: :title?
  validates :title, uniqueness: { :scope => :lawyer_id }
end
