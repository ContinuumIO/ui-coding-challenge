import { Widget, DockPanel, MenuBar, Menu, BoxPanel } from '@phosphor/widgets'
import { Message } from '@phosphor/messaging';
import { commands } from './commands'
import { TicTacToeGame } from './game'
export class GameWidget extends Widget {
  constructor() {
    super({ node: GameWidget.createNode() })
    this.setFlag(Widget.Flag.DisallowLayout);
    this.addClass('content');
    this.title.label = 'Tic-Tac-Toe'
    this.title.closable = true;
    this.title.caption = `A Tic-Tac-Toe Game for PhosphorJS`;
 
  }

  static createNode() {
    let node: any = document.createElement('div');
    let content = document.createElement('div');
    node.game = new TicTacToeGame(); 
    
    content.appendChild(node.game.titleElement);
    content.appendChild(node.game.boardElement);
    content.appendChild(node.game.leaderBoardElement);
    node.appendChild(content);
    return node;
  }
}

class GameDockPanel extends DockPanel {
  constructor() {
    super()

   }
   onChildRemoved(msg: Message) {
    console.log(msg)
   }
}


export let dock = new GameDockPanel(); 
export let boxPanel = new BoxPanel({ direction: 'left-to-right', spacing: 0 })
export let menuBar = new MenuBar();

BoxPanel.setStretch(dock, 5);
boxPanel.id = 'main';
boxPanel.addWidget(dock)

let fileMenu = (() => {
  let menu = new Menu({ commands })
  menu.title.label = 'File'
  menu.addItem({command: 'new-game'})
  return menu
})()

menuBar.addMenu(fileMenu);
