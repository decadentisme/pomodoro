import Add from './Add'
import Time from './Time'

class SetTime extends HTMLElement {
  constructor(value = 75, callback = () => {}) {
    super()
    this.callback = callback
    this.time = new Time()
    this.time.setAttribute('value', value)
    this.add = new Add('+', () => this.addValue(15))
    this.substract = new Add('-', () => this.addValue(-15))
  }

  getValue() {
    return parseInt(this.time.getAttribute('value'), 10)
  }

  addValue(number = 15) {
    const value = parseInt(this.time.getAttribute('value'), 10)
    const newValue = value + number
    if (newValue < 0) return
    this.time.setAttribute('value', newValue)
    this.callback(this.time.getAttribute('value'))
  }

  connectedCallback() {
    this.appendChild(this.substract)
    this.appendChild(this.time)
    this.appendChild(this.add)
  }
}
window.customElements.define('pomodoro-set-time', SetTime)

export default SetTime
