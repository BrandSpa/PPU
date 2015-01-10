class AddDescriptionEnToLawyer < ActiveRecord::Migration
  def change
    add_column :lawyers, :description_en, :text
  end
end
