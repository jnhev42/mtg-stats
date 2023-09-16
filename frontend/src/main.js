import './styles/common.css'
import { setupPlayerSelect } from './playerSelect.js'

document.querySelector('#app').innerHTML = `
  <div id="player-select"> </div>      
`;

setupPlayerSelect(document.querySelector('#player-select'))
