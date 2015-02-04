module BelongsToLawyer
	extend ActiveSupport::Concern
	
	included  do
		before_action :authenticate_user!, except: [:index, :show]
	end

  def index
    lawyer_id = params[:lawyer_id]
    collection = entity.all
    collection = collection.by_lawyer(lawyer_id).order(position: :asc) if lawyer_id.present?
    render json: collection, status: 200
  end

	def show
    id = params[:id]
    model = entity.find_by(id: id) if id.present?
    render json: model, status: 200
  end

	def create
		model = entity.create(model_params)
    if model.valid?
      render json: model, status: 200
    else
      render json: model.errors, status: 400
    end
	end

	def update
		model = entity.find(params[:id])
		updated = model.update(model_params)
    render json: model, status: 200
	end

  def destroy
    model = entity.find(params[:id])
    model.destroy()
    render json: "destroy"
  end

  def model_params
  	params.require(:fields).permit!
  end
end