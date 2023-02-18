import CardFlick from '../lib/card-flick.js'

const cardContainer = document.querySelector('#card-container')
const cards = document.querySelectorAll('.card')
const cardFlick = new CardFlick(cardContainer, cards)
