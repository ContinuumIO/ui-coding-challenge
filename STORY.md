### Decisions Made
  Why React? 
  --
  I chose to use react, redux because that is what I am most familiar with, 
  when it comes to coding challenges I prefer to be comfortable than learn new
  tech. I am totally willing to use phosphor and TypeScript, I have some
  experience with TypeScript, but not enough to make my own app from scratch
  using it.
  Why Redux?
  ---
  This is where over engineering probably comes into play, I probably could have
  used react's built in state management and have been fine but again, under
  pressure, go with what you're used to, right?

  Why RxJS and Redux-Observable?
  ---
  Look at how easy async is! Also, probably overengineering, but I like how 
  the backend are separated. Observables are way simpler to understand 
  then promises in my opinion and I can cancel requests with Observables!

  What would be my next steps?
  ---
  Right now the Loading UI could really use a preview of the board that would
  show up when its hovered. I could probably do this in 6 hours but its a lot 
  of work for something that was considered an extra feature. 

  1. The first thing I would do is write more tests and make sure everything is
  passing.
  2. I would improve the loading preview, third would be implementing
  a UI for computer players and alpha-beta pruning to generate winning
  strategyies.
  3. I would then clean up my CSS to get rid of extraneous styles that I created
  while making this project.
  4. Implement an AI computer and its UI, I would write alpha-beta minimax code 
  in `board-logic`, and handle responses to player moves in the checkMove
  function.
  5. Use browser caching to save redux state such that refreshing the app
  doesnt lose the current state. 
  6. Implement a scoreboard to keep track of each players Wins, displaying the
  current player's scores and the player with the high score in the top right
  of the page.

  Why would I like to work for Continuum?
  ---
  I love Jupyter, learning new tech, the people I've met from the company, and I
  need to be employed :) Thanks for the awesome interview project, I'm a big 
  fan of this style of an interview! No BS involved.





