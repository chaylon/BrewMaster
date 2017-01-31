class BeersController < ApplicationController
  def index
    @beers = Beer.all
  end

  def show
    @beer = Beer.find(params[:id])
  end

  private

  def list_params
    params.require(:beer).permit(:name, :description, :brewery, :abv, :ibu)
  end
end
