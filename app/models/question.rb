class Question < ApplicationRecord
  validates :description, presence: true, length: { maximum: 140 }
  validates :answer, presence: true, length: { maximum: 70 }
  validates :category, presence: true

  has_many :quizzes, through: :quiz_questions
  has_many :quiz_questions
end
