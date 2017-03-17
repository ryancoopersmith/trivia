class CreateQuizzes < ActiveRecord::Migration[5.0]
  def change
    create_table :quizzes do |t|
      t.string :difficulty, null: false
      t.integer :user_id, null: false
      t.integer :quiz_question_id, null: false
      t.integer :questions_count, null: false
      t.string :category, null: false
    end
  end
end
