class ShowsController < ApplicationController

    def index
        render json: Show.all
    end
    
end
