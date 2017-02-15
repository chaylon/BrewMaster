class Api::V1::BeersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def filter
    name_search = params[:name_search].downcase
    brew_search = params[:brew_search].downcase
    style_search = params[:style_search].downcase
    page = params[:page].to_i
    offset = (page-1)*16
    @beers = Beer.where("LOWER (name) LIKE ?", "%#{name_search}%")
    @beers = @beers.where("LOWER (brewery) LIKE ?", "%#{brew_search}%")
    @beers = @beers.where("LOWER (style) LIKE ?", "%#{style_search}%")
    numBeers = @beers.length
    @beers = @beers.limit(16).offset(offset)
    @lists = current_user.lists
    render json: {beers: @beers, currentUser: current_user, lists: @lists, numBeers: numBeers}
  end
end
