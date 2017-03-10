import { Widget } from '@phosphor/widgets'

import { menuBar, boxPanel} from './widgets'

function main(): void {
  
  window.onresize = () => { boxPanel.update(); };
  
  Widget.attach(menuBar, document.body);
  Widget.attach(boxPanel, document.body);

}

window.onload = main;