class Add extends HTMLElement {
  constructor(innerHTML, func) {
    super()
    this.func = func
    this.innerHTML = innerHTML
  }
  connectedCallback() {
    this.onclick = () => this.func()
  }
}
window.customElements.define('pomodoro-add', Add)

export default Add
