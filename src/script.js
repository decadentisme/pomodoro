import Pomodoro from './elements/Pomodoro'

document.addEventListener('DOMContentLoaded', function(event) {
  document.body.appendChild(new Pomodoro(5, 5))
})
