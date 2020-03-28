const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const documentOne = document.querySelector('#message-1')
const documentTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    
    const location = search.value

    const url = `/weather?address=${encodeURIComponent(location)}`
    documentOne.textContent = 'Loading...'
    documentTwo.textContent = ''

    fetch(url).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            documentOne.textContent = 'Error occurred' 
            documentTwo.textContent = data.error
        } else {
            documentOne.textContent = data.location.place_name
            documentTwo.textContent = data.forecast
        }
        
        })
    }).catch((error) => {
        console.log(response)
    })

})