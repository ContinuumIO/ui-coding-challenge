import { CommandRegistry } from '@phosphor/commands'
import { GameWidget, dock } from './widgets'
import { AJAXRequest } from './controller'

export const commands = new CommandRegistry()

commands.addCommand('new-game', {
    label: 'New Game',
    mnemonic: 0,
    caption: 'Opens a new game in a new tab.',
    execute: () => {
      console.log('New Game')
      let widget = new GameWidget
      dock.addWidget(widget)
    }
});

commands.addCommand('load-game', {
    label: 'Load Game',
    mnemonic: 0,
    caption: 'Loads all games from the server',
    execute: () => {
      AJAXRequest('GET', '/api/games')
      .then((data: any) => {
        console.log(data)
        console.log("TODO: Display all games in a new tab.");
      })
    }
});
