import Time from './Time'

class Clock extends HTMLElement {
  constructor(value = 0) {
    super()
    this.time = new Time()
    this.time.setAttribute('value', value)
  }

  connectedCallback() {
    this.appendChild(this.time)
    this.onclick = () => {
      if (this.inverval) {
        clearInterval(this.inverval)
      } else {
        this.inverval = setInterval(() => this.time.setAttribute(
          'value',
          this.time.getAttribute('value') - 1,
        ), 1000)
      }
    }
  }
}
window.customElements.define('pomodoro-clock', Clock)

export default Clock
