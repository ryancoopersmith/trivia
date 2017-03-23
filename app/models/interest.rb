class Interest < ApplicationRecord
  validates :user_id, numericality: true, presence: true
  validates :interest, presence: true, length: { minimum: 4 }

  belongs_to :user
end
