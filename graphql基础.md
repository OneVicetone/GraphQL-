### 基础

GraphQL最重要的概念就是Schema，Schema表示的是接口的类型，通常Schema都写在一个单独的.graphql文件中

定义好Schemahou前后端就会按照这个Schema来进行请求和响应

GraphQL包含以下几种类型

``` graphql
# 内置标量类型： Int Float String Boolean ID

# 自定义标题类型
type Students {
	name: String
	age: Int
	sex: Boolean
	isGood(grade): Boolean
}

# 自定义标题类型
type Photo {
	url: String
	size: Int
	type: PhotoType
	postedBy: Student
}

# 枚举类型
enum PhotoType {
	SELFLE
	ACTION
}

# 查询类型
type Query {
	allStudents: [Student]
	allPhotos: [Photo]
}

# 变更类型
type Mutation {
	postPhoto(input: PostPhotoInput): Photo
}

# 输入类型
input PostPhotoInput {
	url: String
}

# 订阅类型
type Subscription {
	newPhoto: Photo
	newStudent: Student
}
```

上面有三个重要的类型，分别是Query Mutation Subscription



- Query

一个Query代表一次查询

例如：发送allPhoto查询所有的照片，同时嵌套了一层postedBy查询，就能查询到照片的上传者

```graphql
query {
	allPhotos {
		url
		postedBy {
			name
		}
	}
}
```

server端接收到client端请求后，使用对应的Resolver返回对应的所有照片，然后根据postedBy的name查找到对应的学生信息，然后进行返回

```javascript
const students = [];
const photos = [];
const resolver = {
    Query: {
    	allPhoto: () => {
            return photos;
        }
	},
    Photo: {
        postedBy: photo => {
            return students.find(item => item.id === photo.postedBy);
        }
    }
}
```



- Mutation

除了查询数据当然还需要修改数据，GrqphQL提供了Mutation变更数据

```javascript
mutation {
    postPhoto(url:'http://xxxxxx/xxxx.png') {
        url,
        size
   }
}
```

Mutation配个输入类型可以让传参更方便

``` javascript
mutation postPhoto($input:PostPhotoInput) {
    postPhoto(url:$input.url) {
        url,
        size
    }
}

// 参数单独存放
// http://xx.com/graphql?variables={input:{url:"https://baidu.com/defaul.png"}}
```

Subscription

Subscription代表订阅，在Subscription中定义了查询内容后就会通过websocket和前后端建立一个双向数据通道，当数据改变的时候就会自动向客户端推送数据

例如下面定义一个action类型的Photo，当新的action类型的Photo插入时就会通知数据自动更新

```javascript
subscription {
  newPhoto(type:'ACTION'){
    url,
    size
  }
}
```

对应的Resolvers配置

```javascript
const resolver = {
  Mutation: {
    postPhoto: async (parent, args, { pubsub }) => {
      // 上传图片时触发更新
      pubsub.publish("photo-add");
    }
  },
  Subscription: {
    newPhoto: {
      // 监听 photo-add 事件，并实时向客户端推送
      subscribe: (parent, args, { pubsub }) => {
        return pubsub.asyncIterator("photo-add");
      }
    }
  }
};
```

