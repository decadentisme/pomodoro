import SetTime from './SetTime'
import Time from './Time'
import Circle from './Circle'

class Pomodoro extends HTMLElement {
  static get observedAttributes() { return ['running', 'type'] }
  static get allowedTypes() { return new Set(['session', 'break']) }

  constructor(session, breakTime) {
    super()
    this.clock = new Time()
    this.circle = new Circle()
    this.session = new SetTime(session, this.onTimeChange('session'))
    this.break = new SetTime(breakTime, this.onTimeChange('break'))
    this.notification = new Audio('https://notificationsounds.com/soundfiles/99c5e07b4d5de9d18c350cdf64c5aa3d/file-sounds-1110-stairs.mp3')
  }

  attributeChangedCallback(attr, old, value) {
    if (!old) return
    if (attr === 'running' && value === 'true') this.onStart()
    if (attr === 'running' && value !== 'true') this.onStop()
    if (attr === 'type' && old !== value) this.notification.play()
  }

  onStart = () => {
    this.interval = setInterval(() => {
      const current = this.clock.getAttribute('value') - 1
      let type = this.getAttribute('type')
      const max = this[type].time.getAttribute('value')
      if (type === 'break') {
        this.circle.setAttribute('value', -1 + current / max)
      } else {
        this.circle.setAttribute('value', current / max)
      }
      this.clock.setAttribute('value', current)
      if (current === 0) {
        type = type === 'session' ? 'break' : 'session'
        this.setAttribute('type', type)
        this.clock.setAttribute('value', this[type].time.getAttribute('value'))
      }
    }, 1000)
  }

  onStop = () => clearInterval(this.interval)

  onTimeChange = type => value => this.getAttribute('type') === type && (this.clock.setAttribute('value', value) || this.circle.setAttribute('value', type === 'break' ? 0 : 1))

  connectedCallback() {
    this.setAttribute('running', false)
    this.setAttribute('type', 'session')
    this.appendChild(this.session)
    this.appendChild(this.break)
    this.appendChild(this.circle)
    this.circle.appendChild(this.clock)
    this.circle.setAttribute('value', 1)
    this.circle.onclick = () => this.setAttribute(
      'running',
      this.getAttribute('running') === 'true' ? 'false' : 'true',
    )
    this.clock.setAttribute('value', this.session.time.getAttribute('value'))
  }
}
window.customElements.define('my-pomodoro', Pomodoro)

export default Pomodoro
