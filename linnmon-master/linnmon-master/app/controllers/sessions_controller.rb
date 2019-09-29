class SessionsController < ApplicationController
  skip_before_action :require_user, only: [:new, :create]

  def new
  end
  def create
    user = User.find_by_login(params[:login])
    if user && user.authenticate(params[:password]) &&
        (user.role == 0 || user.role == 1)
      session[:user_id] = user.id
      redirect_to home_url, notice: "Logged in!"
    else
      flash.now[:alert] = "Login or password is invalid"
      render "new"
    end
  end
  def destroy
    session[:user_id] = nil
    redirect_to home_url, notice: "Logged out!"
  end
end
