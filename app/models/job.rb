class Job < ActiveRecord::Base
  include Lawyerable
  validates :title, presence: true, unless: :company?
end
