class UsersController < ApplicationController
  def show
    @new_list = List.new
    @user = User.find(params[:id])
    beers = @user.beers
    beers = beers.order(:score).reverse
    limit_beers = beers[0..7]
    @fav_beers = []
    limit_beers.each do |beer|
      if beer.ratings.where(user_id: @user.id).first.score >= 3
        @fav_beers << beer
      end
    end

    @recommendations = []
    unless @fav_beers.empty?
      fav_style = @fav_beers[0].style
      @beers = Beer.where(style: fav_style)

      @beers.each do |beer|
        unless @fav_beers.include?(beer)
          @recommendations << beer
        end
      end
      @recommendations = @recommendations[0..4]
    end
  end
end
