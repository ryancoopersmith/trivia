class QuizQuestion < ApplicationRecord
  validates :quiz_id, presence: true
  validates :question_id, presence: true

  belongs_to :quiz
  belongs_to :question
end
