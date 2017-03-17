class Quiz < ApplicationRecord
  validates :difficulty, presence: true
  validates :questions_count, presence: true, numericality: true
  validates :category, presence: true

  has_many :questions, through: :categories
  has_many :categories
  belongs_to :user
end
