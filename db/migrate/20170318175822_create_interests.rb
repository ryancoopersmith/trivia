class CreateInterests < ActiveRecord::Migration[5.0]
  def change
    create_table :interests do |t|
      t.string :interest
      t.integer :user_id, null: false
    end
  end
end
