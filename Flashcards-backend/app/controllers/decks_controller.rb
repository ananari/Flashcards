class DecksController < ApplicationController
    skip_before_action :verify_authenticity_token
    
    def index
        decks = Deck.all
        render json: decks, include: :cards
    end

    def show
        deck = set_deck
        render json: deck, include: :cards
    end

    def set_deck
        deck = Deck.find(params[:id])
    end

    def create
        deck = Deck.create(name: params[:name], user_id:  params[:user_id])
        decks = Deck.all
        render json: decks
    end

    def destroy
        Deck.destroy(params[:id])
        decks = Deck.all
        render json: decks
    end
end
