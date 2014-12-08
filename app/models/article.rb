class Article < ActiveRecord::Base
	mount_uploader :file_name, LawyerArticlesUploader
	belongs_to :lawyer
end
