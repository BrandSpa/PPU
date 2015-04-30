module Filterable
  extend ActiveSupport::Concern

  # Add each filter to collection
  def filters(filters, collection)
    filters.delete('action')
    filters.delete('controller')

    filters.each do |scope_name, scope_param|

      if scope_param.present?
        collection = collection.public_send(scope_name, scope_param)
      else
        collection = collection.public_send(scope_name)
      end
    end

    collection
  end

end
