module Filterable
  extend ActiveSupport::Concern

  # Add each filter to collection
  def filters_without_params(filters, collection)

    filters.each do |scope_name, scope_param|
      collection = collection.public_send(scope_name) if scope_param.present?
    end

    collection
  end

  # Add each filter to collection
  def filters_with_params(filters, collection)
    filters.each do |scope_name, scope_param|
      collection = collection.public_send(scope_name, scope_param) if scope_param.present?
    end

    collection
  end

end
