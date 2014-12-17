class CreateAcademics < ActiveRecord::Migration
  def change
    create_table :academics do |t|
      t.belongs_to :lawyer, index: true
      t.string :title
      t.string :institution
      t.string :from
      t.string :until

      t.timestamps
    end
  end
end
