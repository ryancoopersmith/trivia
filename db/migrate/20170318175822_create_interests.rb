class CreateInterests < ActiveRecord::Migration[5.0]
  def change
    create_table :interests do |t|
      t.string :interest, default: ""
      t.integer :user_id
    end
  end
end
