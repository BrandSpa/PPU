class CreateEducations < ActiveRecord::Migration
  def change
    create_table :educations do |t|
      t.belongs_to :lawyer, index: true
      t.string :title
      t.string :institution
      t.string :country
      t.string :year

      t.timestamps
    end
  end
end
