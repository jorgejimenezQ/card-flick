# Card-Flick

Card-Flick is a lightweight JavaScript library for creating a card swipe user interface (UI) effect in web applications. The library allows users to interact with a stack of cards by flicking them left or right on touch-enabled devices or by using the mouse on desktop computers.

## Features

Simple and lightweight library for creating a card swipe UI effect.
Supports touch events for mobile devices and mouse events for desktop computers.
Easily customizable through CSS and JavaScript.
Works in all modern browsers.
Open-source under the MIT license.

## Installation

To install Card-Flick, simply run the following command:

```bash
Copy code
npm install card-flick
```

Alternatively, you can download the latest version from the [GitHub repository](https://github.com/jorgejimenezQ/card-flick).

## Usage

To use Card-Flick in your web application, you have a few options:

-   Use the pre-built JavaScript and CSS files in the dist folder.
-   Use a module bundler like Webpack or Browserify to build the library from the source files in the src folder.

### Using the Pre-Built Files

To use this option, you need to include the JavaScript file in your HTML document and initialize the library on a container element that contains the cards you want to swipe. Here's an example:

```html
html Copy code

<!DOCTYPE html>
<html>
    <head>
        <title>My Card-Flick App</title>
        <link rel="stylesheet" href="path/to/card-flick.css" />
    </head>
    <body>
        <div id="card-container">
            <div class="card">Card 1</div>
            <div class="card">Card 2</div>
            <div class="card">Card 3</div>
            <!-- add more cards here -->
        </div>

        <script type="module">
            import CardFlick from 'path/to/card-flick.js'

            var cardContainer = document.getElementById('card-container')
            var cards = document.querySelectorAll('.card')

            var cardFlick = new CardFlick(cardContainer, cards)
        </script>
    </body>
</html>
```

### Load with module bundler

If you're using a module bundler like Webpack or Rollup, you can load Card-Flick as a module:

```javascript
import CardFlick from '../lib/card-flick.js'

const cardContainer = document.querySelector('#card-container')
const cards = document.querySelectorAll('.card')

const cardFlick = new CardFlick(cardContainer, cards)
```

## Customize options

You can customize the behavior of Card-Flick by passing options to the CardFlick constructor. Here's an example:

```javascript
import CardFlick from 'Card-Flick'

const cardContainer = document.querySelector('#card-container')
const cards = document.querySelectorAll('.card')

const cardFlick = new CardFlick(cardContainer, cards, {
    swipeThreshold: 50,
    transitionDuration: 300,
    onSwipe: function (direction, card) {
        console.log('Card swiped', direction, card)
    },
})
```

### Options

| Option             | Type     | Default | Description                                                                           |
| ------------------ | -------- | ------- | ------------------------------------------------------------------------------------- |
| swipeThreshold     | number   | 100     | The minimum distance the card needs to be swiped before it is removed from the stack. |
| transitionDuration | number   | 500     | The duration of the transition when a card is removed from the stack.                 |
| onSwipeLeft        | function | null    | A callback function that is called when a card is swiped left.                        |
| onSwipeRight       | function | null    | A callback function that is called when a card is swiped right.                       |
| onSwipe            | function | null    | A callback function that is called every time a card is swiped.                       |

## Contributing

If you find a bug or want to suggest a new feature, feel free to open an issue on the [ GitHub repository ](https://github.com/jorgejimenezQ/card-flick). Pull requests are also welcome.

License

Card-Flick is open-source software licensed under the MIT license. See the LICENSE file for more details.
