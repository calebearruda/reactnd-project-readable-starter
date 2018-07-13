const clone = require('clone')
const posts = require('./posts')

let db = {}

const defaultData = {
  "894tuq4ut84ut8v4t8wun89g": {
    id: '894tuq4ut84ut8v4t8wun89g',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1468166872634,
    body: 'Hi there! I am a COMMENT.',
    author: 'thingtwo',
    voteScore: 6,
    deleted: false,
    parentDeleted: false
  },
  "8tu4bsun805n8un48ve89": {
    id: '8tu4bsun805n8un48ve89',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1469479767190,
    body: 'Comments. Are. Cool.',
    author: 'thingone',
    voteScore: -5,
    deleted: false,
    parentDeleted: false
  },
  "894tuq4ut84ut8v4t8wun80o": {
    id: '894tuq4ut84ut8v4t8wun80o',
    parentId: "8xf0y6ziyjabvozdd22er",
    timestamp: 1468166872634,
    body: 'Nulla et suscipit velit. Ut eget feugiat odio. Cras ultricies ipsum lobortis, tempus lectus vel, sagittis lectus. Praesent scelerisque diam nulla, a elementum nisl imperdiet vitae. Morbi aliquet est nisi, sed auctor magna semper vel. Morbi tellus nunc, ultricies a posuere vitae, lacinia non mi. Proin tincidunt diam sit amet augue fringilla gravida. Integer eget lectus pellentesque, viverra tellus quis, mollis ex. Vestibulum a magna lobortis, ornare lacus quis, vehicula elit. Phasellus finibus urna ac mi viverra, et posuere erat gravida. Nullam in velit erat.',
    author: 'thingtwo',
    voteScore: 6,
    deleted: false,
    parentDeleted: false
  },
  "8tu4bsun805n8un48vw21": {
    id: '8tu4bsun805n8un48vw21',
    parentId: "8xf0y6ziyjabvozdd22er",
    timestamp: 1469479767190,
    body: 'Nullam enim risus, placerat ac tristique nec, semper lacinia erat. In ac accumsan lorem, non venenatis arcu. In vel dolor id nisi bibendum faucibus laoreet nec turpis. Donec non odio faucibus, posuere massa sed, posuere massa. Suspendisse convallis odio augue, in iaculis urna tristique eget. Maecenas scelerisque mauris nec ante venenatis tincidunt. Quisque in nibh mi. Proin mollis tortor gravida vulputate molestie.',
    author: 'Yoda',
    voteScore: 15,
    deleted: false,
    parentDeleted: false
  },
  "894tuq4ut84ut8v4t8wun82w": {
    id: '894tuq4ut84ut8v4t8wun82w',
    parentId: "8xf0y6ziyjabvozdd22df",
    timestamp: 1468166872634,
    body: 'Nulla et suscipit velit. Ut eget feugiat odio. Cras ultricies ipsum lobortis, tempus lectus vel, sagittis lectus. Praesent scelerisque diam nulla, a elementum nisl imperdiet vitae. Morbi aliquet est nisi, sed auctor magna semper vel. Morbi tellus nunc, ultricies a posuere vitae, lacinia non mi. Proin tincidunt diam sit amet augue fringilla gravida. Integer eget lectus pellentesque, viverra tellus quis, mollis ex. Vestibulum a magna lobortis, ornare lacus quis, vehicula elit. Phasellus finibus urna ac mi viverra, et posuere erat gravida. Nullam in velit erat.',
    author: 'thingtwo',
    voteScore: 1,
    deleted: false,
    parentDeleted: false
  },
  "8tu4bsun805n8un48vw24": {
    id: '8tu4bsun805n8un48vw24',
    parentId: "8xf0y6ziyjabvozdd22df",
    timestamp: 1469479767190,
    body: 'Nullam enim risus, placerat ac tristique nec, semper lacinia erat. In ac accumsan lorem, non venenatis arcu. In vel dolor id nisi bibendum faucibus laoreet nec turpis. Donec non odio faucibus, posuere massa sed, posuere massa. Suspendisse convallis odio augue, in iaculis urna tristique eget. Maecenas scelerisque mauris nec ante venenatis tincidunt. Quisque in nibh mi. Proin mollis tortor gravida vulputate molestie.',
    author: 'Yoda',
    voteScore: 2,
    deleted: false,
    parentDeleted: false
  }
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByParent (token, parentId) {
  return new Promise((res) => {
    let comments = getData(token)
    let keys = Object.keys(comments)
    filtered_keys = keys.filter(key => comments[key].parentId === parentId && !comments[key].deleted)
    res(filtered_keys.map(key => comments[key]))
  })
}

function get (token, id) {
  return new Promise((res) => {
    const comments = getData(token)
    res(
      comments[id].deleted || comments[id].parentDeleted
        ? {}
        : comments[id]
      )
  })
}

function add (token, comment) {
  return new Promise((res) => {
    let comments = getData(token)

    comments[comment.id] = {
      id: comment.id,
      timestamp: comment.timestamp,
      body: comment.body,
      author: comment.author,
      parentId: comment.parentId,
      voteScore: 1,
      deleted: false,
      parentDeleted: false
    }

    posts.incrementCommentCounter(token, comment.parentId, 1)
    res(comments[comment.id])
  })
}

function vote (token, id, option) {
  return new Promise((res) => {
    let comments = getData(token)
    comment = comments[id]
    switch(option) {
        case "upVote":
            comment.voteScore = comment.voteScore + 1
            break
        case "downVote":
            comment.voteScore = comment.voteScore - 1
            break
        default:
            console.log(`comments.vote received incorrect parameter: ${option}`)
    }
    res(comment)
  })
}

function disableByParent (token, post) {
    return new Promise((res) => {
        let comments = getData(token)
        keys = Object.keys(comments)
        filtered_keys = keys.filter(key => comments[key].parentId === post.id)
        filtered_keys.forEach(key => comments[key].parentDeleted = true)
        res(post)
    })
}

function disable (token, id) {
    return new Promise((res) => {
      let comments = getData(token)
      comments[id].deleted = true
      posts.incrementCommentCounter(token, comments[id].parentId, -1)
      res(comments[id])
    })
}

function edit (token, id, comment) {
    return new Promise((res) => {
        let comments = getData(token)
        for (prop in comment) {
            comments[id][prop] = comment[prop]
        }
        res(comments[id])
    })
}

module.exports = {
  get,
  getByParent,
  add,
  vote,
  disableByParent,
  disable,
  edit
}
