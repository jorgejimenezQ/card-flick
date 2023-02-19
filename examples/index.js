import CardFlick from '../lib/card-flick.js'

const cardContainer = document.querySelector('#card-container')
const cards = document.querySelectorAll('.card')

const onSwipeLeft = (card) => {
    console.log('swiped left')
}

const onSwipeRight = (card) => {
    console.log('swiped right')
}

const onSwipe = (card) => {
    console.log('swiped')
}

const cardFlick = new CardFlick(cardContainer, cards, {
    onSwipeLeft,
    onSwipeRight,
    onSwipe,
})
