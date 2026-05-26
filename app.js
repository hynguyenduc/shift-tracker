const tabButtons = document.querySelectorAll('nav button')
const tabSections = document.querySelectorAll('section')
const monthNames = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
]
const dayNames = [
    'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
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

function setAppHeight() {
    document.documentElement.style.setProperty(
        '--app-height',
        `${window.innerHeight}px`
    );
}

function renderCalendar() {
    const today = new Date()
    let firstDay = (new Date(currentYear, currentMonth, 1).getDay() + 6) %7
    let totalDays = new Date(currentYear, currentMonth+1, 0).getDate()
    let monthLabel = monthNames[currentMonth] + ' ' + currentYear

    document.querySelector('#month-label').textContent = monthLabel
    document.querySelector('#cal-grid').innerHTML = ''
    
    dayNames.forEach(function(day) {
        const dayHeader = document.createElement('div')
        dayHeader.textContent = day 
        document.getElementById('cal-grid').appendChild(dayHeader)
    })

    for (let i = 0; i < firstDay; i++) {
        const dayBlank = document.createElement('div')
        dayBlank.classList.add('blank-cell')
        document.getElementById('cal-grid').appendChild(dayBlank)
    }
    for (let i=1; i <= totalDays; i++) {
        const dayNumbered = document.createElement('div')
        dayNumbered.classList.add('day-cell')
        dayNumbered.textContent = i
        document.getElementById('cal-grid').appendChild(dayNumbered)
        if (today.getDate() === i && today.getMonth() === currentMonth && today.getFullYear() === currentYear) {
            dayNumbered.classList.add('today')
        }
    }
}

window.addEventListener('resize', setAppHeight);
window.addEventListener('orientationchange', setAppHeight);

tabButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        switchTab(button.getAttribute('data-tab'))
    })
})
document.getElementById('prev-button').addEventListener('click', function() {
    currentMonth--
    if (currentMonth < 0 ) {
        currentYear--
        currentMonth = 11 
    }
    renderCalendar()
})
document.getElementById('next-button').addEventListener('click', function() {
    currentMonth++
    if (currentMonth > 11) {
        currentYear++
        currentMonth = 0
    }
    renderCalendar()
})

setAppHeight()
switchTab('active')
renderCalendar()
