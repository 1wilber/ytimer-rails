import { Controller } from "@hotwired/stimulus"
import { msToTime } from "../helpers/time-helper"

export default class extends Controller {
  static targets = ["timeInput", "display", 'form']

  STATUSES = Object.freeze({
    RUNNING: 'running',
    STOPPED: 'stopped',
    FINISHED: 'finished'
  })

  HOTKEYS = Object.freeze({
    SPACE: 'Space'
  })

  constructor(...args) {
    super(...args)
    this.status = this.STATUSES.STOPPED
    this.time = 0
  }

  connect() {
    this.displayTarget.innerHTML = msToTime(this.time)

    document.addEventListener('keyup', (event) => {

      if (event.code === this.HOTKEYS.SPACE) {

        if (this.status === this.STATUSES.FINISHED) {
          this.status = this.STATUSES.STOPPED
          return
        }

        if (this.status === this.STATUSES.STOPPED) {
          this.status = this.STATUSES.RUNNING
          this.start()
        }
      }
    })

    document.addEventListener('keydown', (event) => {
      if (event.code == this.HOTKEYS.SPACE) {

        if (this.status === this.STATUSES.RUNNING) {
          this.stop()
          this.status = this.STATUSES.FINISHED
        }
      }
    })
  }

  start() {
    const startTime = new Date()
    this.interval = setInterval(() => {
      this.time = new Date() - startTime
      this.displayTarget.innerHTML = msToTime(this.time)
    }, 10)

  }

  stop() {
    clearInterval(this.interval)
    this.timeInputTarget.value = this.time
    this.formTarget.requestSubmit()
  }
}
