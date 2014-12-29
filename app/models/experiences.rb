class Experiences < ActiveRecord::Base
	has_one :translations, class_name: "Experience", foreign_key: "translation_id"
  belongs_to :translation, class_name: "Experience"
  has_and_belongs_to_many :categories
	mount_uploader :img_name, ExperienceImgUploader

end
