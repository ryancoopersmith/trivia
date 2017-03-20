class User < ApplicationRecord
  after_create :send_email
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :trackable, :validatable

  validates :username, presence: true, uniqueness: true
  validates :email, uniqueness: true, format: { with: /\A((\w+)|(\.))+\@[a-z]+\.[a-z]{3}\z/ }
  validates :win_percentage, numericality: true, allow_nil: true
  validates :admin, numericality: true, allow_nil: true, inclusion: { in: [1, 2] }
  validates :admin, inclusion: { in: [true, false] }, allow_nil: true

  has_many :quizzes, dependent: :destroy
  has_many :interests, dependent: :destroy
  accepts_nested_attributes_for :interests

  mount_uploader :profile_photo, ProfilePhotoUploader

  def admin?
    admin == true
  end

  def send_email
    UserMailer.new_user(self).deliver
  end
end
