# frozen_string_literal: true

Rails.application.routes.draw do

  get 'orders/index'
  get 'orders/edit'
  get 'orders/update'
  resources :foodcourts do
    member do
      get 'add_restaraunt', to: 'foodcourts#add_restaraunt', as: 'add_restaraunt'
    end
  end
  #resources :cart_items
  get 'home', to: "home#home", as: 'home'

  get 'sessions/destroy', to: 'sessions#destroy', as: 'logout'
  resources :sessions, except: [:update, :index]

  resources :restaraunts do
    resources :menu_categories
    resources :menu_items
  end
  resources :cuisines
  resources :users

  root to: "home#home"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  mount Api::Base, at: "/"
  mount GrapeSwaggerRails::Engine, at: "/docs"
end
