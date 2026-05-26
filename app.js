const tabButtons = document.querySelectorAll('nav button')
const tabSections = document.querySelectorAll('section')
const monthNames = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
]
let currentMonth = new Date().getMonth()
let currentYear = new Date().getFullYear()

function switchTab(tabName) {
    tabSections.forEach(function(section) {
        section.classList.add('hidden')
    })
    tabButtons.forEach(function(button) {
        button.classList.remove('tab-active')
    })
    document.querySelector('#' + tabName + '-view').classList.remove('hidden')
    
    document.querySelector('[data-tab="' + tabName + '"]').classList.add('tab-active')
}

function renderCalendar() {
    let firstDay = new Date(currentYear, currentMonth, 1).getDay()
    let totalDays = new Date(currentYear, currentMonth+1, 0).getDate()
    let monthLabel = monthNames[currentMonth] + ' ' + currentYear

    document.querySelector('#month-label').textContent = monthLabel
    document.querySelector('#cal-grid').innerHTML = ''
}

tabButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        switchTab(button.getAttribute('data-tab'))
    })
})

switchTab('active')
