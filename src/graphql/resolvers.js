const schema = require('./schema')
const faker = require('faker')
const User = require('../schema/User')

faker.locale = 'zh_CN'

let users = []
for(let i = 0;i<10;i++){
    const userData = {
        name:faker.name.findName(),
        age:faker.random.number(),
        sex:faker.random.boolean(),
        from:faker.address.city(),
        about:{
            favotite:faker.random.image(),
            job:faker.name.jobTitle()
        }
    }
    users.push(userData)
}


schema.getQueryType().getFields().getUsers.resolve = async () => {
    const res = await User.find()
    return res
}

schema.getQueryType().getFields().getUserById.resolve = async (...args) => {
    const { id } = args[1]
    const res = await User.findById({_id:id})
    return res
}

schema.getMutationType().getFields().addUser.resolve = async (...args) => {
    const { name, age, from, sex, favorite, job} = args[1].input
    const userData = {
        name,age,from,sex,about:{favorite,job}
    }
    const res = await User.create(userData)
    return res
}

schema.getMutationType().getFields().changeUser.resolve = async (...args) => {
    const { id ,name, age, from, sex, favorite, job} = args[1].input
    const userData = {
        name,age,from,sex,about:{favorite,job}
    }
    const res = await User.findByIdAndUpdate({_id:id},userData)
    return res
}

schema.getMutationType().getFields().deleteUser.resolve = async (...args) => {
    const { id } = args[1]
    const res = await User.findByIdAndRemove({_id:id})
    return res
}

module.exports = schema