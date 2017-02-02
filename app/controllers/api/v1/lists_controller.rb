class Api::V1::ListsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @lists = List.all
    render json: @lists
  end


  def destroy
    @list = List.find(params[:id])
    @list.destroy

  def show
    @user = current_user
    @list = List.find(params[:id])
    @beers = @list.beers
    render json: {list: @list, beers: @beers, user: @user}
  end

end
