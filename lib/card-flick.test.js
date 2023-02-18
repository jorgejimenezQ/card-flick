import CardFlick from './card-flick.js'

describe('CardFlick', () => {
    const cardContainer = document.createElement('div')
    cardContainer.appendChild(document.createElement('div')).classList.add('card')
    cardContainer.appendChild(document.createElement('div')).classList.add('card')
    cardContainer.appendChild(document.createElement('div')).classList.add('card')
    document.body.appendChild(cardContainer)
    const cards = document.querySelectorAll('.card')

    test('should throw an error if no container element is passed', () => {
        const nullContainer = null

        expect(() => new CardFlick(nullContainer, cards)).toThrow(
            Error('cardContainer is required')
        )
    })

    test('should throw an error if no cards are passed', () => {
        const nullCards = null

        expect(() => new CardFlick(cardContainer, nullCards)).toThrow(Error('No cards found'))
    })

    test('should throw an error if cards is not a node list', () => {
        const arrayCards = [document.createElement('div')]

        expect(() => new CardFlick(cardContainer, arrayCards)).toThrow(
            Error('Cards must be a NodeList')
        )
    })

    // test('should throw an error if cards is an empty array', () => {
    //     const cardContainer = document.createElement('div')
    //     const cards = []

    //     expect(() => new CardFlick(cardContainer, cards)).toThrow(Error('Cards array is empty'))
    // })

    test('should throw an error if cardThreshold is not a number', () => {
        const options = { cardThreshold: '100' }

        expect(() => new CardFlick(cardContainer, cards, options)).toThrow(
            Error('cardThreshold must be a number')
        )
    })
    test('should throw an error if cardThreshold is not a number', () => {
        const options = { cardThreshold: 'banana' }

        expect(() => new CardFlick(cardContainer, cards, options)).toThrow(
            Error('cardThreshold must be a number')
        )
    })

    test('should throw an error if onSwipeRight is not a function', () => {
        const options = { onSwipeRight: 'function' }

        expect(() => new CardFlick(cardContainer, cards, options)).toThrow(
            Error('onSwipeRight must be a function')
        )
    })

    test('should throw an error if onSwipeLeft is not a function', () => {
        const options = { onSwipeLeft: 'function' }

        expect(() => new CardFlick(cardContainer, cards, options)).toThrow(
            Error('onSwipeLeft must be a function')
        )
    })

    test('should throw an error if transitionDuration is not a number', () => {
        const options = { transitionDuration: '500' }

        expect(() => new CardFlick(cardContainer, cards, options)).toThrow(
            Error('transitionDuration must be a number')
        )
    })

    test('should throw an error if transitionDuration is not greater than 0 and less than 10000', () => {
        const options = { transitionDuration: 10001 }

        expect(() => new CardFlick(cardContainer, cards, options)).toThrow(
            Error('transitionDuration must be greater than 0 and less than 10000')
        )
    })

    test('should throw an error if notAligned is not a boolean', () => {
        const options = { notAligned: '1002' }

        expect(() => new CardFlick(cardContainer, cards, options)).toThrow(
            Error('notAligned must be a boolean')
        )
    })
})
