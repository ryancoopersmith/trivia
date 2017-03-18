class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :username, presence: true, uniqueness: true
  validates :win_percentage, numericality: true, allow_nil: true
  validates :admin, numericality: true, allow_nil: true, inclusion: { in: [1, 2] }

  has_many :quizzes
end
