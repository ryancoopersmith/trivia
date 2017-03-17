class AddWinPercentageToUsers < ActiveRecord::Migration[5.0]
  def up
    add_column :users, :win_percentage, :integer
  end

  def down
    remove_column :users, :win_percentage
  end
end
