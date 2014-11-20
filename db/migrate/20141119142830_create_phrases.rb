class CreatePhrases < ActiveRecord::Migration
  def change
    create_table :phrases do |t|
      t.belongs_to :lawyer
      t.text :content
      t.string :author

      t.timestamps
    end
  end
end
