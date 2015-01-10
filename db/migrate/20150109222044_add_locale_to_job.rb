class AddLocaleToJob < ActiveRecord::Migration
  def change
    add_column :jobs, :locale, :string
  end
end
