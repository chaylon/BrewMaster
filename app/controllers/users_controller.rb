class UsersController < ApplicationController
  def show
    @user = current_user
    beers = @user.beers
    beers = beers.order(:score).reverse
    limit_beers = beers[0..7]
    @fav_beers = []
    limit_beers.each do |beer|
      if beer.score >= 3
        @fav_beers << beer
      end
    end

    fav_style = @fav_beers[0].style
    @beers = Beer.where(style: fav_style)

    @recommendations = []
    @beers.each do |beer|
      unless @fav_beers.include?(beer)
        @recommendations << beer
      end
    end
    @recommendations = @recommendations[0..4]
  end
end
