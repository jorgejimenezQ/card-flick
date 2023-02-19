class CardFlick {
    // variables
    #initialX = 0
    #currentX = 0
    #activeCard = null

    // default threshold
    #cardThreshold = 100

    // Array of swiped Cards
    #swipedCards = []

    // default swipe right callback
    #onSwipeRight = () => {}
    // default swipe left callback
    #onSwipeLeft = () => {}

    // default transition duration in ms
    #transitionDuration = 500

    // default notAligned - the cards are angled and not aligned
    #notAligned = true

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
     * @param {Boolean} options.notAligned - The cards are angled and not aligned. You can see the card behind (optional)
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
        let zIndex = 1

        // add event listeners to each card
        cards.forEach((card) => {
            // add all the styles to the card
            card.style.position = 'absolute'
            card.style.top = '0'
            card.style.left = '0'
            card.style.height = '100%'
            card.style.width = '100%'
            card.style.zIndex = zIndex * 1000
            card.style.cursor = 'grab'
            zIndex++

            // Prevent the children from being clickable when the card is being dragged
            const children = card.children
            for (let i = 0; i < children.length; i++) {
                children[i].style.pointerEvents = 'none'
            }

            // add a unique id attribute to the card
            let id = Math.random() * 10000000000000000
            id = id.toString(36).replace('.', '')
            card.setAttribute('data-cf-id', id)

            if (this.#notAligned) {
                // add a transform to the card
                // Random number between -10 and 10
                const randDeg = Math.floor(Math.random() * 20) - 10
                card.style.transform = `rotate(${randDeg}deg)`
            }

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
            if (options.cardThreshold && typeof options.cardThreshold !== 'number') {
                throw new Error('cardThreshold must be a number')
            } else {
                this.#cardThreshold = options.cardThreshold
            }

            // check if onSwipeRight is a function
            if (options.onSwipeRight && typeof options.onSwipeRight !== 'function') {
                throw new Error('onSwipeRight must be a function')
            } else {
                this.#onSwipeRight = options.onSwipeRight
            }

            // check if onSwipeLeft is a function
            if (options.onSwipeLeft && typeof options.onSwipeLeft !== 'function') {
                throw new Error('onSwipeLeft must be a function')
            } else {
                this.#onSwipeLeft = options.onSwipeLeft
            }

            // check if transitionDuration is a number and if it is greater than 0 and less than 10000
            if (options.transitionDuration && typeof options.transitionDuration !== 'number')
                throw new Error('transitionDuration must be a number')

            if (options.transitionDuration < 0 || options.transitionDuration > 10000)
                throw new Error('transitionDuration must be greater than 0 and less than 10000')

            this.#transitionDuration = options.transitionDuration

            // check if notAligned is a boolean
            if (options.notAligned && typeof options.notAligned !== 'boolean')
                throw new Error('notAligned must be a boolean')

            if (options.notAligned === false) this.#notAligned = false
        }
    }

    #handleCardDragStart = (e) => {
        e.preventDefault()

        // get the initial position of the card
        if (e.type === 'touchstart') {
            this.#initialX = e.touches[0].clientX
        } else {
            this.#initialX = e.clientX
            // set the cursor to grabbing
            e.target.style.cursor = 'grabbing'
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
            // this.#activeCard.style.opacity = '0'

            // keep track of the cards that have been swiped
            this.#swipedCards.push(this.#activeCard)

            // add event listener to the card to detect when the animation is finished
            this.#activeCard.addEventListener('transitionend', this.#handleCardFlyOff)

            // reset the cursor to grab
            this.#activeCard.style.cursor = 'grab'

            return
        }

        // update the position of the card
        const card = e.target
        card.style.transform = `translateX(${diffX}px) rotate(${diffX / 5}deg)`
        card.style.transition = 'none'
    }

    #handleCardDragEnd = (e) => {
        if (!this.#activeCard) return

        if (this.#swipedCards.includes(this.#activeCard)) {
            console.log('card has already been swiped')
            return
        }

        // reset the cursor to grab
        this.#activeCard.style.cursor = 'grab'

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

export default CardFlick
