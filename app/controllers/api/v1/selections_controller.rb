class Api::V1::SelectionsController < ApplicationController
  def add
    binding.pry
    @list = List.find(params[:list_id])
    @beer = Beer.find(params[:beer_id])
    @selection = Selection.create(list: @list, beer: @beer)
  end
end
