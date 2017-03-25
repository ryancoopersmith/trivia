class CreateScores < ActiveRecord::Migration[5.0]
  def change
    create_table :scores do |t|
      t.integer :score, null: false
      t.integer :user_id, null: false
    end
  end
end
