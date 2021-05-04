class ShowsController < ApplicationController

    def index
        render json: Show.all, key_transform: :camel_lower
    end

end
