class DecksController < ApplicationController
    def index
        decks = Deck.all
        render json: decks
    end

    def show
        deck = set_deck
        render json: deck
    end

    def set_deck
        deck = Deck.find(params[:id])
    end
end
