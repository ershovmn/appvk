class ApplicationController < ActionController::Base
  before_action :require_user

  private
  def require_user
    if current_user.nil?
      redirect_to new_session_path
      return
    end
  end

  helper_method :current_user
  def current_user
    if session[:user_id]
      @current_user ||= User.find(session[:user_id])
    else
      @current_user = nil
    end
  end
end
