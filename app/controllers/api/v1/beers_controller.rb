class Api::V1::BeersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @beers = Beer.all.limit(10)
    @lists = current_user.lists
    render json: {beers: @beers, currentUser: current_user, lists: @lists}
  end

  def filter
    name_search = params[:name_search].downcase
    brew_search = params[:brew_search].downcase
    style_search = params[:style_search].downcase
    @beers = Beer.where("LOWER (name) LIKE ?", "%#{name_search}%")
    @beers = @beers.where("LOWER (brewery) LIKE ?", "%#{brew_search}%")
    @beers = @beers.where("LOWER (style) LIKE ?", "%#{style_search}%")
    @beers = @beers.limit(10)
    @lists = current_user.lists
    render json: {beers: @beers, currentUser: current_user, lists: @lists}
  end
end
