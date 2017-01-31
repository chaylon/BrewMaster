class Api::V1::BeersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @beers = Beer.all
    render json: {beers: @beers, currentUser: current_user}
  end
end
