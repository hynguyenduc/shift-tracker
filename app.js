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
let shifts = []
let employers = []


function setAppHeight() {
    document.documentElement.style.setProperty(
        '--app-height',
        `${window.innerHeight}px`
    );
}

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
function loadShifts() {
    const shiftCheck = localStorage.getItem('shifts')
    if (shiftCheck != null ) {
       shifts = JSON.parse(shiftCheck)
    }
}
function saveShifts() {
    localStorage.setItem('shifts', JSON.stringify(shifts))
}
function loadEmployers() {
    const employerCheck = localStorage.getItem('employers')
    if (employerCheck) {
       employers = JSON.parse(employerCheck)
    }
}
function saveEmployers() {
    localStorage.setItem('employers', JSON.stringify(employers))
}
function getNextShiftId() {
    if (shifts.length === 0) {
        return 1
    } else {
        return Math.max(...shifts.map(shift => shift.id)) + 1
    }
}
function getNextEmployerId() {
    if (employers.length === 0) {
        return 1
    } else {
        return Math.max(...employers.map(employer => employer.id)) + 1
    }
}
function openSheet() {
    document.getElementById('sheet-overlay').classList.add('open')
}
function closeSheet() {
    document.getElementById('sheet-overlay').classList.remove('open')
}
function populateEmployerDropdown() {
  const select = document.getElementById('shift-employer')
  select.innerHTML = '<option value="">None</option>'
  employers.forEach(function(employer) {
    const option = document.createElement('option')
    option.value = employer.id
    option.textContent = employer.name
    select.appendChild(option)
  })
}

window.addEventListener('resize', setAppHeight);
window.addEventListener('orientationchange', setAppHeight);

tabButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        switchTab(button.getAttribute('data-tab'))
    })
})
document.getElementById('close-sheet').addEventListener('click', closeSheet)
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
document.querySelectorAll('input[name="rate-type"]').forEach(function(radio) {
  radio.addEventListener('change', function() {
    const phOptions = document.getElementById('ph-options')
    if (this.value === 'publicHoliday') {
      phOptions.classList.remove('hidden')
    } else {
      phOptions.classList.add('hidden')
    }
  })
})
document.getElementById('ph-allday').addEventListener('change', function() {
  const phHoursField = document.getElementById('ph-hours-field')
  if (this.checked) {
    phHoursField.classList.add('hidden')
  } else {
    phHoursField.classList.remove('hidden')
  }
})


setAppHeight()
// load the data first
loadShifts() 
loadEmployers()
switchTab('active')
renderCalendar()

