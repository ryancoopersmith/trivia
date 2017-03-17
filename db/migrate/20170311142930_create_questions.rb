class CreateQuestions < ActiveRecord::Migration[5.0]
  def change
    create_table :questions do |t|
      t.text :description, null: false
      t.string :answer, null: false
      t.integer :quiz_question_id, null: false
      t.string :category, null: false
    end
  end
end
