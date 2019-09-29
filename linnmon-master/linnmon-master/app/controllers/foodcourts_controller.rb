# frozen_string_literal: true

class FoodcourtsController < ApplicationController
  before_action :set_foodcourt, only: %i[show edit update destroy add_restaraunt]

  # GET /foodcourts
  # GET /foodcourts.json
  def index
    @foodcourts = Foodcourt.all
  end

  # GET /foodcourts/1
  # GET /foodcourts/1.json
  def show; end

  # GET /foodcourts/new
  def new
    @foodcourt = Foodcourt.new
  end

  # GET /foodcourts/1/edit
  def edit; end

  def add_restaraunt
    redirect_to foodcourts_path, flash: 'надо передать id' if params[:r_id].nil?

    rest = Restaraunt.find(params[:r_id])
    t = !!FoodcourtRestaraunt.find_or_create_by(foodcourt: @foodcourt, restaraunt: rest)

    if t
      rest.update(is_in_foodcourt: true)
      redirect_to foodcourts_path, notice: 'ok'
    else
      redirect_to foodcourts_path, notice: 'i failed'
    end
  end

  # POST /foodcourts
  # POST /foodcourts.json
  def create
    @foodcourt = Foodcourt.new(foodcourt_params)

    respond_to do |format|
      if @foodcourt.save
        format.html { redirect_to @foodcourt, notice: 'Foodcourt was successfully created.' }
        format.json { render :show, status: :created, location: @foodcourt }
      else
        format.html { render :new }
        format.json { render json: @foodcourt.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /foodcourts/1
  # PATCH/PUT /foodcourts/1.json
  def update
    respond_to do |format|
      if @foodcourt.update(foodcourt_params)
        format.html { redirect_to @foodcourt, notice: 'Foodcourt was successfully updated.' }
        format.json { render :show, status: :ok, location: @foodcourt }
      else
        format.html { render :edit }
        format.json { render json: @foodcourt.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /foodcourts/1
  # DELETE /foodcourts/1.json
  def destroy
    @foodcourt.destroy
    respond_to do |format|
      format.html { redirect_to foodcourts_url, notice: 'Foodcourt was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_foodcourt
    @foodcourt = Foodcourt.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def foodcourt_params
    params.require(:foodcourt).permit(:address, :latitude, :longitude, :name, :description, :price_rating, :user_id)
  end
end
