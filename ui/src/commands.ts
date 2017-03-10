import { CommandRegistry } from '@phosphor/commands'
import { GameWidget, dock } from './widgets'


export const commands = new CommandRegistry()

commands.addCommand('new-game', {
    label: 'New Game',
    mnemonic: 0,
    caption: 'Open a new tab',
    execute: () => {
      console.log('New Game')
      let widget = new GameWidget
      dock.addWidget(widget)
    }
});