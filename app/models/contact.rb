class Contact < ActiveRecord::Base

	#Validations
	validates :email, presence: true

	validates :message, presence: true
end
