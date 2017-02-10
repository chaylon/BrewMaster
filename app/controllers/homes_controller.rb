class HomesController < ApplicationController
  skip_before_action :authenticate_user!
  def index
    @new_list = List.new
  end
end
