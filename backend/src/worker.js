/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import {
    error,      // creates error responses
    json,       // creates JSON responses
    Router,     // the ~440 byte router itself
    withParams, // middleware: puts params directly on the Request
  } from 'itty-router'
  
const router = Router() // no "new", as this is not a real class

//example register a route on the "GET" method
router.get('/todos/:id', (request) => 
{
    const { params } = request

    return `You've asked for todo #${params.id}.`
})

//register a route to show all players
router.get('/All_Players', (request,env,) => 
{
  return env.DB.prepare ('SELECT * FROM Player;').raw()
})

  // we can chain definitions to reduce boilerplate
  .get('*', () => error(404))

 
export default {
  fetch: (req, env, ctx) => router
                              .handle(req, env, ctx)
                              .then(json)
                              .catch(error)
}