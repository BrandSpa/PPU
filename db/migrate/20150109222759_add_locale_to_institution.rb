class AddLocaleToInstitution < ActiveRecord::Migration
  def change
    add_column :institutions, :locale, :string
  end
end
