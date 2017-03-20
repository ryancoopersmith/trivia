class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :trackable, :validatable

  validates :username, presence: true, uniqueness: true
  validates :email, uniqueness: true, format: { with: /\A((\w+)|(\.))+\@[a-z]+\.[a-z]{3}\z/ }
  validates :win_percentage, numericality: true, allow_nil: true
  validates :admin, numericality: true, allow_nil: true, inclusion: { in: [1, 2] }
  validates :admin, inclusion: { in: [true, false] }, allow_nil: true

  has_many :quizzes
  has_many :interests
end
