class MenuCategoriesController < ApplicationController
  before_action :set_menu_category, only: [:show, :edit, :update, :destroy]

  # GET /menu_categories
  # GET /menu_categories.json
  def index
    @menu_categories = Restaraunt.find(params[:restaraunt_id]).menu_categories
    @menu_category = MenuCategory.new
  end

  # GET /menu_categories/1/edit
  def edit
  end

  # POST /menu_categories
  # POST /menu_categories.json
  def create
    @menu_category = MenuCategory.new(menu_category_params)
    @menu_category.user_id = current_user.id
    @menu_category.restaraunt_id = params[:restaraunt_id]

    respond_to do |format|
      if @menu_category.save
        format.html { redirect_to restaraunt_menu_categories_path, notice: 'Menu category was successfully created.' }
        format.json { render :show, status: :created, location: @menu_category }
      else
        format.html { render :new }
        format.json { render json: @menu_category.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /menu_categories/1
  # PATCH/PUT /menu_categories/1.json
  def update
    respond_to do |format|
      if @menu_category.update(menu_category_params)
        format.html { redirect_to restaraunt_menu_categories_path, notice: 'Menu category was successfully updated.' }
        format.json { render :show, status: :ok, location: @menu_category }
      else
        format.html { render :edit }
        format.json { render json: @menu_category.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /menu_categories/1
  # DELETE /menu_categories/1.json
  def destroy
    @menu_category.destroy
    respond_to do |format|
      format.html { redirect_to restaraunt_menu_categories_path, notice: 'Menu category was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_menu_category
      @menu_category = MenuCategory.find(params[:id])
      @restaraunt = Restaraunt.find(params[:restaraunt_id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def menu_category_params
      params.require(:menu_category).permit(:name)
    end
end
