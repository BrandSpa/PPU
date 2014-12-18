class Recognition < ActiveRecord::Base
  include Lawyerable
  validates :title, presence: true
end
