class FavoriteCategory < ApplicationRecord
  validates :user_id, presence: true, numericality: true
  validates :category, presence: true

  belongs_to :user
end
