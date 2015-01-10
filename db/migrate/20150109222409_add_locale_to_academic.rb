class AddLocaleToAcademic < ActiveRecord::Migration
  def change
    add_column :academics, :locale, :string
  end
end
