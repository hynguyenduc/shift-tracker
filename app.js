const tabButtons = document.querySelectorAll('nav button')
const tabSections = document.querySelectorAll('section')

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

tabButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        switchTab(button.getAttribute('data-tab'))
    })
})

switchTab('active')
