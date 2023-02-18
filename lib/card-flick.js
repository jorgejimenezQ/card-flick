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
     * Creates a new CardFlick instance and adds event listeners to each card element.
     *
     * @param {HTMLElement} cardContainer - The card flick container element
     * @param {Array<HTMLElement> | NodeList} cards - Array of card elements
     * @param {Object} options - Options for the card flick instance (optional)
     *  @param {Number} options.cardThreshold - The threshold in pixels for the card to be considered swiped (optional)
     * @param {Function} options.onSwipeRight - The callback function to be called when a card is swiped right (optional)
     * @param {Function} options.onSwipeLeft - The callback function to be called when a card is swiped left (optional)
     * @param {Number} options.transitionDuration - The duration of the transition in ms (optional)
     * @throws {Error} - If cardContainer is not an HTMLElement
     * @throws {Error} - If cards is not an array
     * @throws {Error} - If cards array is empty
     * @throws {Error} - If cardThreshold is not a number
     * @throws {Error} - If onSwipeRight is not a function
     * @throws {Error} - If onSwipeLeft is not a function
     * @throws {Error} - If transitionDuration is not a number
     * @throws {Error} - If transitionDuration is not greater than 0 and less than 10000
     * @returns {CardFlick} - A new CardFlick instance
     * @example
     * const cardContainer = document.querySelector('.card-container')
     * const cards = document.querySelectorAll('.card')
     * const cardFlick = new CardFlick(cardContainer, cards)
     *
     */
    constructor(cardContainer, cards, options) {
        // check that a card-flick-container element exists
        if (!cardContainer) throw new Error('cardContainer is required')

        // check that cards is an array and if it has any elements
        if (!cards) throw new Error('No cards found')
        // check that cards is a node list
        if (!(cards instanceof NodeList)) throw new Error('Cards must be a NodeList')
        if (cards.length === 0) throw new Error('Cards array is empty')

        // convert the node list to an array
        cards = Array.from(cards)

        // add position relative to the card container
        cardContainer.style.position = 'relative'

        // add event listeners to each card
        cards.forEach((card) => {
            // add all the styles to the card
            card.style.position = 'absolute'
            card.style.top = '0'
            card.style.left = '0'
            card.style.height = '100%'
            card.style.width = '100%'

            // add event listeners to the card
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
            this.#initialX = e.touches[0].clientX
        } else {
            this.#initialX = e.clientX
        }

        // get the current card being dragged
        this.#activeCard = e.target
    }

    #handleCardDragMove = (e) => {
        // if there is no active card, return
        if (!this.#activeCard || e.target !== this.#activeCard) return

        // get the current position of the card
        if (e.type === 'touchmove') {
            this.#currentX = e.touches[0].clientX
        } else {
            this.#currentX = e.clientX
        }

        // calculate the distance between the initial and current position of the card
        const diffX = this.#currentX - this.#initialX

        if (Math.abs(diffX) > this.#cardThreshold) {
            this.#activeCard.style.transform = `translateX(${diffX * 100}px)  rotate(${
                diffX * 10
            }deg)`
            this.#activeCard.style.transition = `transform 1.3s ease-in-out`

            // add event listener to the card to detect when the animation is finished
            this.#activeCard.addEventListener('transitionend', handleCardFlyOff)

            return
        }

        // update the position of the card
        const card = e.target
        card.style.transform = `translateX(${diffX}px) rotate(${diffX / 10}deg)`
        // card.style.transform = `translate(${diffX}px, ${diffY}px) rotate(${diffX / 10}deg)`
        card.style.transition = 'none'
    }

    #handleCardDragEnd = (e) => {
        if (!this.#activeCard) return

        // return the card to its original position
        this.#activeCard.style.transform = 'none'
        this.#activeCard.style.transition = 'transform 0.5s ease'

        // Current card being dragged
        this.#activeCard = null
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
