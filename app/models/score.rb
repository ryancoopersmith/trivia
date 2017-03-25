class Score < ApplicationRecord
  validates :user_id, presence: true, numericality: true
  validates :score, presence: true, numericality: true

  belongs_to :user
end
