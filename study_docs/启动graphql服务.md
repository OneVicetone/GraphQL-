### 启动一个graphql服务实现增删改查



使用package包括

- koa2
- graphql
- koa-graphql
- mongoose

引入koa并实例化监听4000启动http服务，使用koa-graphql导入graphql-schema并运行在koa中间件中

```javascript
const koa = require('koa')
const { graphqlHttp } = require('koa-graphql')
const app = new koa()
app.use(new graphqlHttp({
    schema:require('./src/graphql/schema'),
    graphiql
}))
const port = 4000
app.listen(port,()=>{
    console.log(`server is running on port:${port}`)
})
```

连接mongodb定义数据库schema

刚才的代码中引入了graphql的schema所以需要定义schema和resolvers来处理查询语句

```javascript
const { buildSchema } = require('graphql')

const schema = new buildSchema(`
	...
`)

schema.getQueryType().getFields()...resolve = () => {
    ... //操作数据库查询数据
} // ...为查询Query里的字段
schema.getMutationType().getFields()...resolve = () => {
    ... // 操作数据库修改数据
}// ...为Mutation里的字段
```

比如说定义一个用户增删改查的schema

```javascript
const schema = new buildSchema(`
	type user{
		id:ID
		name:String
		age:Int
		sex:Boolean
		address:String
		info:{
			favorite:String
			job:String
		}
	}
	input userInput{
		id:ID
		name:String
		age:Int
		sex:Boolean
		address:String
		favorite:String
		job:String
	}
	
	type Query{
		getUsers:[user]!
		getUserById(id:String):user
	}
	
	type Mutation{
		addUser(input:userInput):user
		changeUser(input:userInput):user
		deleteUser(id:String):user
	}
`)
```



实现效果图

![87Gizn.gif](https://s1.ax1x.com/2020/03/23/87Gizn.gif)