class BeersController < ApplicationController
  def index
    @beers = Beer.all
    @new_list = List.new
  end

  def show
    @beer = Beer.find(params[:id])
    @new_list = List.new
  end

  private

  def list_params
    params.require(:beer).permit(:name, :description, :brewery, :abv, :ibu)
  end
end
