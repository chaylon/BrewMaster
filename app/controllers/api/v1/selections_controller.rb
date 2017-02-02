class Api::V1::SelectionsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @list = List.find(params[:list_id])
    @beer = Beer.find(params[:beer_id])
    @selection = Selection.where("beer_id = #{@beer.id} AND list_id = #{@list.id}").first
    render json: {selection: @selection}
  end

  def create
    @list = List.find(params[:list_id])
    @beer = Beer.find(params[:beer_id])
    Selection.create(list: @list, beer: @beer)
  end

  def destroy
    @selection = Selection.find(params[:id])
  end

  private
  def selection_params
    params.require(:selection).permit(:list_id, :beer_id)
  end

end
