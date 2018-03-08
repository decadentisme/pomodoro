const svgAttrs = {
  viewBox: '0 0 100 100',
}

const leadAttributes = {
  d: 'M 50,50 m 0,-48 a 48,48 0 1 1 0,96 a 48,48 0 1 1 0,-96',
  'fill-opacity': '0',
  'stroke-width': 1,
  stroke: '#eee',
}

const pointerAttributes = {
  ...leadAttributes,
  'stroke-width': 3,
  stroke: '#4c4c4c',
}

const generatePointerStyles = (path, value = 0) => console.log(value) || Object.entries({
  'stroke-dasharray': `${path.getTotalLength()}, ${path.getTotalLength()}`,
  'stroke-dashoffset': path.getTotalLength() * value,
  stroke: value > 0 ? '#F44336' : '#4CAF50',
}).map(([key, value]) => `${key}: ${value}`).join(';')

const setAttributes = (element, attributes) => Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value))

class Circle extends HTMLElement {
  static get observedAttributes() { return ['value'] }

  attributeChangedCallback() {
    if (!this.pointer) return
    setAttributes(this.pointer, { style: generatePointerStyles(this.pointer, this.getAttribute('value')) })
  }

  connectedCallback() {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    setAttributes(circle, svgAttrs)

    const lead = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    setAttributes(lead, leadAttributes)

    this.pointer = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    setAttributes(this.pointer, pointerAttributes)
    setAttributes(this.pointer, { style: generatePointerStyles(this.pointer, this.getAttribute('value')) })

    circle.appendChild(lead)
    circle.appendChild(this.pointer)
    this.appendChild(circle)
  }
}

window.customElements.define('pomodoro-circle', Circle)

export default Circle
