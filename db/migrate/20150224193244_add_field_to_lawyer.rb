class AddFieldToLawyer < ActiveRecord::Migration
  def change
    add_column :lawyers, :published, :boolean
  end
end
