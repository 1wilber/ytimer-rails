class ResultsController < TimerController
  respond_to :turbo_stream
  before_action :set_result, only: [:show, :destroy]

  def index
    @results = current_user.results
      .where.not(id: nil)
      .where(event: current_user.selected_event.event)

    @result = current_user.results.new(
      event: current_user.selected_event.event,
      scramble: current_user.selected_event.event.generate_scramble,
      time: 0
    )

    @scramble = @result.scramble
  end

  def new
    @result = current_user.results.new
  end

  def show
    render turbo_stream: turbo_stream.append(
      'show_result', template: 'results/show', locals: { result: @result },
    )
  end

  def destroy
    @result.destroy

    render turbo_stream: [
      turbo_stream.remove(@result),
      turbo_stream.remove(helpers.dom_id(@result, :show))
    ]
  end

  def create
    @result = current_user.results.create(
      result_params
    )
    @new_result = current_user.results.new(
      event: current_user.selected_event.event,
      scramble: current_user.selected_event.event.generate_scramble,
      time: 0
    )

    render turbo_stream: [
      turbo_stream.prepend(:results, partial: "results/result", locals: { result: @result }),
      turbo_stream.update(:scramble, partial: "scrambles/scramble", locals: { scramble: @new_result.scramble }),
      turbo_stream.update('new_result', partial: 'results/form', locals: { result: @new_result })

    ]
  end

  private

  def set_result
    @result = current_user.results.find(params[:id])
  end

  def result_params
    params.require(:result).permit(:time, :event_id, :scramble)
  end
end
