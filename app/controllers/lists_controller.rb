class ListsController < ApplicationController
  def index
    @new_list = List.new
  end

  def show
    @list = List.find(params[:id])
    @new_list = List.new
    @beers = @list.beers
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

  def edit
    @new_list = List.new
    @list = List.find(params[:id])
    if @list.user_id != current_user.id
      redirect_to @list
    end
  end

  def update
    @new_list = List.new
    @list = List.find(params[:id])
    if @list.user_id == current_user.id
      if @list.update(list_params)
        redirect_to @list
      else
        flash.now[:notice] = "Invalid entry"
        render :edit
      end
    else
      redirect_to @list
    end
  end

  def destroy
    @list = List.find(params[:id])
    if @list.id == current_user.id
      @list.destroy
      redirect_to lists_path
    else
      redirect_to lists_path
    end
  end

  private

  def list_params
    params.require(:list).permit(:name, :description)
  end
end
