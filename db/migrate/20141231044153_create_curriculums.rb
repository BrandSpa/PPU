class CreateCurriculums < ActiveRecord::Migration
  def change
    create_table :curriculums do |t|
      t.string :country
      t.string :name
      t.string :file_name

      t.timestamps
    end
  end
end
