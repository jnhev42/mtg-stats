import {
    error,
    json,
    Router,
    createCors,
  } from 'itty-router'
  
const router = Router()

const { preflight, corsify } = createCors({
  origins: ['*'],
  methods: ['GET', 'POST'],
})
router.all("*", preflight)

//register a route to show all players
router.get('/All_Players', (_, env) => {
  return env.DB.prepare ('SELECT * FROM Player;').raw()
})

router.get('*', () => error(404))

 
export default {
  fetch: (req, env, ctx) => router
    .handle(req, env, ctx)
    .then(json)
    .catch(error)
    .then(corsify)
}
