class CreateRecognitions < ActiveRecord::Migration
  def change
    create_table :recognitions do |t|
      t.belongs_to :lawyer, index: true
      t.string :title
      t.string :country
      t.string :year

      t.timestamps
    end
  end
end
