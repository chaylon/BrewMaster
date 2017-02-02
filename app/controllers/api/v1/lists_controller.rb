class Api::V1::ListsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @lists = List.all
    @user = current_user
    render json: {lists: @lists, user: @user}
  end

  def show
    @user = current_user
    @list = List.find(params[:id])
    @beers = @list.beers
    render json: {list: @list, beers: @beers, user: @user}
  end

  def destroy
    @list = List.find(params[:id])
    @list.destroy
  end

end
