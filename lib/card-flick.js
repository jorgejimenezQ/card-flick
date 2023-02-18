export default class CardFlick {
    // variables
    #initialX = 0
    #currentX = 0
    #activeCard = null

    // default threshold
    #cardThreshold = 100

    // default swipe right callback
    #onSwipeRight = () => {}
    // default swipe left callback
    #onSwipeLeft = () => {}

    // default transition duration in ms
    #transitionDuration = 500

    /**
     * @param {Object} options - Options for the card flick instance
     *
     */
    constructor(options) {
        // check that a card-flick-container element exists
        const cardFlickContainer = document.querySelector('.card-flick-container')
        if (!cardFlickContainer) throw new Error('No element found with class card-flick-container')

        // check that at least one card-flick-card element exists
        const cards = document.querySelectorAll('.card-flick-card')
        if (!cards) throw new Error('No elements found with class card-flick-card')
        if (cards.length === 0) throw new Error('No elements found with class card-flick-card')

        // add event listeners to each card
        cards.forEach((card) => {
            card.addEventListener('mousedown', this.#handleCardDragStart)
            card.addEventListener('mousemove', this.#handleCardDragMove)
            card.addEventListener('mouseup', this.#handleCardDragEnd)

            card.addEventListener('touchstart', this.#handleCardDragStart)
            card.addEventListener('touchmove', this.#handleCardDragMove)
            card.addEventListener('touchend', this.#handleCardDragEnd)
        })

        // check if options is an object
        if (options && typeof options === 'object') {
            // check if cardThreshold is a number
            if (options.cardThreshold && typeof options.cardThreshold === 'number') {
                this.#cardThreshold = options.cardThreshold
            }

            // check if onSwipeRight is a function
            if (options.onSwipeRight && typeof options.onSwipeRight === 'function') {
                this.#onSwipeRight = options.onSwipeRight
            } else {
                throw new Error('onSwipeRight must be a function')
            }

            // check if onSwipeLeft is a function
            if (options.onSwipeLeft && typeof options.onSwipeLeft === 'function') {
                this.#onSwipeLeft = options.onSwipeLeft
            } else {
                throw new Error('onSwipeLeft must be a function')
            }

            // check if transitionDuration is a number and if it is greater than 0 and less than 10000
            if (options.transitionDuration && typeof options.transitionDuration === 'number') {
                if (options.transitionDuration > 0 && options.transitionDuration < 10000) {
                    this.#transitionDuration = options.transitionDuration
                } else {
                    throw new Error('transitionDuration must be greater than 0 and less than 10000')
                }
            }
        }
    }

    #handleCardDragStart = (e) => {
        // get the initial position of the card
        if (e.type === 'touchstart') {
            this.#initialY = e.touches[0].clientY
        } else {
            this.#initialY = e.clientY
        }

        // get the current card being dragged
        this.#activeCard = e.target
    }

    #handleCardDragMove = (e) => {
        // if there is no active card, return
        if (!this.#activeCard || e.target !== this.#activeCard) return

        // get the current position of the card
        if (e.type === 'touchmove') {
            currentX = e.touches[0].clientX
            // console.log(currentX, currentY)
        } else {
            currentX = e.clientX
        }

        // calculate the distance between the initial and current position of the card
        const diffX = currentX - initialX

        if (Math.abs(diffX) > cardThreshold) {
            activeCard.style.transform = `translateX(${diffX * 100}px)  rotate(${diffX * 10}deg)`
            activeCard.style.transition = `transform 1.3s ease-in-out`

            // add event listener to the card to detect when the animation is finished
            activeCard.addEventListener('transitionend', handleCardFlyOff)

            return
        }

        // update the position of the card
        const card = e.target
        card.style.transform = `translateX(${diffX}px) rotate(${diffX / 10}deg)`
        // card.style.transform = `translate(${diffX}px, ${diffY}px) rotate(${diffX / 10}deg)`
        card.style.transition = 'none'
    }

    #handleCardDragEnd = (e) => {
        if (!activeCard) return

        // return the card to its original position
        activeCard.style.transform = 'none'
        activeCard.style.transition = 'transform 0.5s ease'

        // Current card being dragged
        activeCard = null
    }
    #handleCardFlyOff = (e) => {
        if (e.propertyName !== 'transform') return

        console.log('transition ended')

        // remove the card from the DOM
        const card = e.target
        card.remove()
    }
}

const cardFlick = (options) => {
    // check if cards is an array and if it has any elements
    if (!cards) throw new Error('No cards found')

    if (!Array.isArray(cards)) throw new Error('Cards must be an array')

    if (cards.length === 0) throw new Error('Cards array is empty')
}
