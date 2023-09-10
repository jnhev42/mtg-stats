import './style.css'
import { setupCounter } from './counter.js'
import { setupAllPlayers } from './allPlayers.js'
document.querySelector('#app').innerHTML = `
  <div>

    <div class="card">

      <button id="counter" type="button"></button>
      
      <ul id="all_Players"/>

    </div>
    
  </div>
`
//counter//ask backend are pieces of  example code 
setupCounter(document.querySelector('#counter'))

//actual html//js stuff relavant for the databse//website

//all players query 
setupAllPlayers(document.querySelector('#all_Players'))