class RocksController < ApplicationController

    def index
        render json: Rock.all, key_transform: :camel_lower
    end

end


