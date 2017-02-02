class Api::V1::SelectionsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    @list = List.find(params[:list_id])
    @beer = Beer.find(params[:beer_id])
    Selection.create(list: @list, beer: @beer)
  end

  def destroy
  end

  private
  def selection_params
    params.require(:selection).permit(:list_id, :beer_id)
  end

end
