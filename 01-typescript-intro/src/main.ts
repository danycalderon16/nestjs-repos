// import { name } from './bases/01-types'

import { charmander } from './bases/04-injections'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
   <p>Hola mundo ${charmander.id}, ${charmander.imageUrl}</p>
  </div>
`
