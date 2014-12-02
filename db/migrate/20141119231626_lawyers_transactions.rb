class LawyersTransactions < ActiveRecord::Migration
  def change
    create_table :lawyers_trades, id: false do |t|
      t.belongs_to :lawyer
      t.belongs_to :trade
    end
  end
end
