class UsersController < ApplicationController
    def index
        users = User.all
        render json: users
    end

    def show
        user = set_user
        render json: user
    end
    
    def new
    end

    def create
    end

    def edit
    end

    def update
    end

    def set_user
        user = User.find(params[:id])
    end
end
