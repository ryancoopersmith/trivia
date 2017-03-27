class User < ApplicationRecord
  after_create :send_email
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :trackable, :validatable,
    :omniauthable, :omniauth_providers => [:twitter]

  validates :email, uniqueness: true, format: { with: /\A((\w+)|(\.))+\@[a-z]+\.[a-z]{3}\z/ }

  has_many :interests, dependent: :destroy
  has_many :favorite_categories, dependent: :destroy
  has_many :scores, dependent: :destroy
  accepts_nested_attributes_for :interests

  mount_uploader :profile_photo, ProfilePhotoUploader

  def send_email
    UserMailer.new_user(self).deliver
  end

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.email = auth.info.email
      user.password = Devise.friendly_token[0, 20]
    end
  end
end
