class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username])
    devise_parameter_sanitizer.permit(:sign_up, keys: [:profile_photo])
    devise_parameter_sanitizer.permit(:sign_up, keys: [:admin])
    devise_parameter_sanitizer.permit(:sign_up, keys: [:win_percentage])
    devise_parameter_sanitizer.permit(:sign_up, keys: [:worst_category])
    devise_parameter_sanitizer.permit(:sign_up, keys: [:best_category])
    devise_parameter_sanitizer.permit(:sign_up, keys: [:favorite_category])
    devise_parameter_sanitizer.permit(:account_update, keys: [:username])
    devise_parameter_sanitizer.permit(:account_update, keys: [:profile_photo])
  end
end
