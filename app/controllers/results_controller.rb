class ResultsController < TimerController
  respond_to :turbo_stream

  def index
    @results = current_user.results.where.not(id: nil)

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

  def result_params
    params.require(:result).permit(:time, :event_id, :scramble)
  end
end
