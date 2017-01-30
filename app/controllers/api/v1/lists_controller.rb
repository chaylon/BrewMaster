class Api::V1::ListsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @lists = List.all
    render json: @lists
  end
end
