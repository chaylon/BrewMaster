class Api::V1::UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    @lists = @user.lists
    render json: {users: @user, lists: @lists}
  end
end
