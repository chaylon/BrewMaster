class Api::V1::RatingsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @ratings = Rating.where(beer_id: params[:beer_id])
    sum = 0
    @ratings.each do |rating|
      sum += rating.score
    end
    unless @ratings.empty?
      @score = sum/@ratings.length
    end
    @beer = Beer.find(params[:beer_id])
    @beer.update(score: @score)
    render json: {score: @score, ratings: @ratings, user: current_user, beer: @beer}
  end

  def create
    @beer = Beer.find(params[:beer_id])
    @user = User.find(params[:user_id])
    @score = params[:score].to_i
    @rating = Rating.where("beer_id = #{@beer.id} AND user_id = #{@user.id}").first
    if !@rating
      Rating.create(rating_params)
    else
      @rating.update(rating_params)
    end
  end

  def destroy
    @rating = Rating.find(params[:id])
    @rating.destroy
  end

  private

  def rating_params
    params.require(:rating).permit(:user_id, :beer_id, :score, :review)
  end
end
