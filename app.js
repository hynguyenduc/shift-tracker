const tabButtons = document.querySelectorAll('nav button')
const tabSections = document.querySelectorAll('section')

function switchTab(tabName) {
    tabSections.forEach(function(section) {
        section.classList.add('hidden')
    })
    tabButtons.forEach(function(button) {
        button.classList.remove('tab-active')
    })
}

