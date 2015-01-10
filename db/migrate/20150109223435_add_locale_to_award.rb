class AddLocaleToAward < ActiveRecord::Migration
  def change
    add_column :awards, :locale, :string
  end
end
