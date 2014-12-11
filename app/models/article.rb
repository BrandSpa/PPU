class Article < ActiveRecord::Base
  include Lawyerable
	mount_uploader :file_name, LawyerArticlesUploader
  validates :title, length: { minimum: 3 }

end
