module Lawyerable
  extend ActiveSupport::Concern
  
  # add lawyer relationship
  # add scope to bring all by lawyer id
  included do
    belongs_to :lawyer
    scope :by_lawyer, -> (lawyer_id) { where('lawyer_id = ?', lawyer_id) }
  end
end
