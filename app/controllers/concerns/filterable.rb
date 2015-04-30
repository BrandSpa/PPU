module Filterable
  extend ActiveSupport::Concern

  # Add each filter to collection
  def filters(filters, collection)
    filters.delete('action')
    filters.delete('controller')
    filters.each do |scope_name, scope_param|
      if scope_param
        collection = collection.public_send(scope_name, scope_param) if scope_param.present?
      else
        collection = collection.public_send(scope_name) if scope_param.present?
      end
    end

    collection
  end

end
