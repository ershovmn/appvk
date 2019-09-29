class RestarauntsController < ApplicationController
  before_action :set_restaraunt, only: [:show, :edit, :update, :destroy]

  # GET /restaraunts
  # GET /restaraunts.json
  def index
    unless params[:foodcourt_id].nil?
      @foodcourt = Foodcourt.find(params[:foodcourt_id])
      @restaraunts = @foodcourt.restaraunts
    else
      @restaraunts = Restaraunt.where(is_in_foodcourt: false)
    end
  end

  # GET /restaraunts/1
  # GET /restaraunts/1.json
  def show
  end

  # GET /restaraunts/new
  def new
    @restaraunt = Restaraunt.new
  end

  # GET /restaraunts/1/edit
  def edit
  end

  # POST /restaraunts
  # POST /restaraunts.json
  def create
    @restaraunt = Restaraunt.new(restaraunt_params)
    @restaraunt.is_in_foodcourt = false

    respond_to do |format|
      if @restaraunt.save
        format.html { redirect_to @restaraunt, notice: 'Restaraunt was successfully created.' }
        format.json { render :show, status: :created, location: @restaraunt }
      else
        format.html { render :new }
        format.json { render json: @restaraunt.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /restaraunts/1
  # PATCH/PUT /restaraunts/1.json
  def update
    respond_to do |format|
      if @restaraunt.update(restaraunt_params)
        format.html { redirect_to @restaraunt, notice: 'Restaraunt was successfully updated.' }
        format.json { render :show, status: :ok, location: @restaraunt }
      else
        format.html { render :edit }
        format.json { render json: @restaraunt.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /restaraunts/1
  # DELETE /restaraunts/1.json
  def destroy
    @restaraunt.destroy
    respond_to do |format|
      format.html { redirect_to restaraunts_url, notice: 'Restaraunt was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_restaraunt
      @restaraunt = Restaraunt.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def restaraunt_params
      params.require(:restaraunt).permit(:address, :latitude, :longitude, :cuisine_id, :name, :description, :price_rating, :user_id)
    end
end
