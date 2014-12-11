module Lawyerable
  extend ActiveSupport::Concern
  included do
    belongs_to :lawyer
    scope :by_lawyer, -> (lawyer_id) { where('lawyer_id = ?', lawyer_id) }
  end
end