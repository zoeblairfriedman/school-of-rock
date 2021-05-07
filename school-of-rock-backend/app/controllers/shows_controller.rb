class ShowsController < ApplicationController

    def index
        render json: Show.all, key_transform: :camel_lower
    end

    # def show
    #     #add error handling
    #     show = Show.find_by(id: params[:id])
    #     render json: show, key_transform: :camel_lower
    # end

    def create
        show = Show.create(show_params)
        if show.save
           render json: show
        else
            render json: {message: show.errors.full_messages}
        end
    end

    def destroy
        show = Show.find_by(id: params[:id])
        show.destroy
        render json: show
    end

    def show_params
        params.require(:show).permit(:name, :rock_id, :rockId)
    end

end
