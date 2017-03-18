class Quiz < ApplicationRecord
  validates :difficulty, presence: true
  validates :questions_count, presence: true, numericality: true
  validates :category, presence: true

  has_many :questions, through: :quiz_questions
  has_many :quiz_questions
  belongs_to :user
end
