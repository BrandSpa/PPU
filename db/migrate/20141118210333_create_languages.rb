class CreateLanguages < ActiveRecord::Migration
  def change
    create_table :languages do |t|
      t.belongs_to :lawyer
      t.string :name
      t.timestamps
    end
  end
end
