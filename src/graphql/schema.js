const { graphql, buildSchema } = require('graphql')

const schema = new buildSchema(`
    type user{
        id:ID
        name:String
        age:Int
        sex:Boolean
        from:String
        about:about
    }

    type about{
        favorite:String
        job:String
    }

    type Query{
        getUsers:[user]!
        getUserById(id:String):user
    }
    input userInput{
        id:ID
        name:String
        age:Int
        sex:Boolean
        from:String
        favorite:String
        job:String
    }

    type Mutation{
        addUser(input:userInput):user
        changeUser(input:userInput):user
        deleteUser(id:String):user
    }
`)

module.exports = schema