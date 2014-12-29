class Recognition < ActiveRecord::Base
  include Lawyerable
  validates :title, presence: true
  validates :title, :uniqueness => { :scope => :lawyer_id }
end
