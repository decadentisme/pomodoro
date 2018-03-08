const parseTime = number => {
  const hours = parseInt(number / 60, 10).toString().padStart(2, '00')
  const minutes = (number % 60).toString().padStart(2, '00')
  return `${hours}:${minutes}`
}

class Time extends HTMLElement {
  static get observedAttributes() { return ['value'] }

  attributeChangedCallback(attr, old, value) {
    this.innerHTML = parseTime(value)
  }

  connectedCallback() {
    this.innerHTML = parseTime(this.getAttribute('value'))
  }
}

window.customElements.define('pomodoro-time', Time)

export default Time
