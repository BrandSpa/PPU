class Curriculum < ActiveRecord::Base
	mount_uploader :file_name, CurriculumUploader
	validates :country, presence: true
	validates :name, presence: true
end
