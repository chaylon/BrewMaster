class UsersController < ApplicationController
  def show
    @user = current_user
    beers = @user.beers
    beers = beers.order(:score).reverse
    # binding.pry
    # beers.to_a.sort_by! do |beer|
    #   beer.score
    # end
    @fav_beers = beers[0..4]
  end
end
