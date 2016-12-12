import './index.scss';

import { alertHello } from './hello';

document.addEventListener("DOMContentLoaded", function(event) {
  let name = prompt('Who would you like to greet?');
  alertHello(name);
});
