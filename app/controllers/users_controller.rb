class UsersController < ApplicationController
  def show
    @user = current_user
    beers = @user.beers
    beers = beers.order(:score).reverse
    @fav_beers = beers[0..4]

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
