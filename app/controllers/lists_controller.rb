class ListsController < ApplicationController
  def index
    @lists = List.all
  end

  def show
    @list = List.find(params[:id])
  end

  def new
    @list = List.new
  end

  def create
    @list = List.new(list_params)
    @list.user = current_user
    if @list.save
      flash[:notice] = "List created!"
      redirect_to @list
    else
      @lists = List.all
      flash.now[:notice] = @bar.errors.full_messages.to_sentence
      render :index
    end
  end

  private

  def list_params
    params.require(:list).permit(:name, :description)
  end
end
