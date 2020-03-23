const koa = require('koa')
const graphqlHttp = require('koa-graphql')
const logger = require('koa-logger')

const app = new koa()
require('./src/db')()
app.use(logger())
app.use(graphqlHttp({
    schema:require('./src/graphql/resolvers'),
    graphiql:true
}))


const port = 4000
app.listen(port,()=>{
    console.log(`server is running on port:${port}`)
})