class Interest < ApplicationRecord
  validates :user_id, numericality: true, allow_nil: true

  belongs_to :user
end
