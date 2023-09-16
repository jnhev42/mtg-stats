import './styles/common.css'
import { setupPlayerStats } from './playerSelect.js'

document.querySelector('#app').innerHTML = `
  <div id="player-stats"> </div>      
`;

setupPlayerStats(document.querySelector('#player-stats'))
