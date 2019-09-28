# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Project #1: The Game

### Objectives

Create a turn-based game

* Get familiar with CSS, in particular: Bootstrap
* Problem solving using JavaScript
* Using DOM and/or Ajax to achieve interactivity

### Idea

* turn-based trading game
* start off with some cash
* able to select what to buy from a stack of 3 or 4 items
* after you buy the item it's added to your inventory
* you are able to click on the item to check the price
* after each turn the price of certain things will change
* you can also wait or skip a few turns but if you skip too many turns while holding on to the item in your inventory you may 'spoil', 'expire' or 'lose' the item
* objective is to earn money/ make profit, as much as possible
* shop has rent, every 15th of the month
* day by day, prices change
* 15sec interval for each day
* 3 / 4 days random event that reduce or bonus money e.g. monopoly
* button for next day
* version 1 without mechanics e.g. 1 item either sell or don't
* version 2 able to set price for item
* version 3 price is dependent on demand

Game mechanics (MVP)
* global value for cash
* global value for money
* randomly generated items 
* items price fluctuate according to percentage, generated by random
* 

### Technologies
* Bootstrap 4.3.1

### Approach
### Installation instructions
### Challenges
* Bootstrap
Using bootstrap, a lot of the styles are predetermined and altering one element's class leads to affect another's eventual positioning. Initially wanted to have a masonry styled layout but had difficulty trying to decentralise the alignment. Subsequently realised that instead of 4 different cards, I can have 2 cards in 1 column and another 2 cards in the other column, then change the display for the element that I wanted to be off-center.

Bootstrap was also challenging in the sense that I had to figure out the class attribute that was directly affecting the parameter I wanted to change e.g. margin. It was difficult to see at first but eventually I got the hang of it.

* JavaScript
Trying to get hold of the object and passing values to and fro the object source rather than to pass and create values derived from another source not directly linked to the object source. Overcame the problem by tapping into the node family tree via devTools.

### Unsolved problems
* Using JS DOM without ruining the layout
I didn't manage to figure out how to generate cards from JS using DOM without ruining the layout preset by my HTML. In the end I worked around it by setting the cards to visibility: hidden and using JS DOM to switch it to visibility: visible when the content in the cards are generated.

That being said, I would like to improve on the way the inventory list is being added on to. 