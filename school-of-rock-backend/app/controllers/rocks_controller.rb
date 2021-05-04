class RocksController < ApplicationController

    def index
        render json: Rock.all
    end

end


