class DecksController < ApplicationController
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
end
