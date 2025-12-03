Ok heres the plan

API Call to the deck API. This provides hopefully everything that I need to work with the cards

Player objects, with nested arrays to represent hands in case i need to split.

Player default object would allow me to easily reset hands at the end

Maybe sign up with a username and password to save to mongoDB

Player information can be saved as a JSON, accessed with the mongoDB information. This would include the players total currency

Maybe a private key would allow me to access player information such as hands that win the most, and i can graph that on a website

CSS Math can hopefully make a good looking blackjack table as the background, and also can be used to center cards for when hands are playing using flex boxes

Back end can handle all of the blackjack math and logic, which is only referenced on the front end.
For example, a button the when pressed calls something like hit.jsx, which can then add a card to the players hand

This would cover:
Making and using the deck (api call),
Making cards appear (css),
Handling players and player information (JSON and/or mongoDB),
Blackjack gameplay (backend/javascript work)
