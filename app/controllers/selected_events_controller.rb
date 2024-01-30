class SelectedEventsController < TimerController
  def update
    @selected_event = current_user.selected_event
    @selected_event.update(selected_event_params)
    @selected_event.reload

    render turbo_stream: [
      turbo_stream.update(
        :scramble, partial: "scrambles/scramble", locals: { scramble: @selected_event.event.generate_scramble },
      ),
      turbo_stream.update(
        'selected_event_form', partial: 'selected_events/form', locals: { selected_event: @selected_event },
      ),
      turbo_stream.update(
        :results, partial: 'results/result', collection: current_user.results.where(event: @selected_event.event),
      )
    ]
  end

  private

  def selected_event_params
    params.require(:selected_event).permit(:event_id)
  end
end
