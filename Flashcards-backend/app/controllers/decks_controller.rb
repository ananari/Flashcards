class DecksController < ApplicationController
    #skip_before_action :verify_authenticity_token
    
    def index
        decks = Deck.all
        render json: decks, include: :cards
    end

    def show
        deck = Deck.find(params[:id])
        render json: deck, include: :cards
    end

    def edit
        deck = Deck.find(params[:id])
    end

    def update
        deck = Deck.find(params[:id])
        if deck.update(deck_params)
          #render full JSON deck data back for load decks function
          decks = Deck.all
          render json: decks
        else
          render json: {errors: deck.errors}.to_json
        end
    end

    def create
        deck = Deck.new(deck_params)
        #render full JSON deck data back for load decks function
        if deck.save
            decks = Deck.all
            render json: decks
        else
        #render errors
            render json: {errors: deck.errors}.to_json
        end
    end

    def destroy
        Deck.destroy(params[:id])
        
        #render full JSON deck data back for load decks function
        decks = Deck.all
        render json: decks
    end

    def deck_params
        params.require(:deck).permit(:name, :user_id)
    end
end
