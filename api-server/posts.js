const clone = require('clone')

let db = {}

const defaultData = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'Udacity is the best place to learn React',
    body: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. ',
    author: 'Luke Skywaker',
    category: 'react',
    voteScore: 6,
    deleted: false,
    commentCount: 2
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1468479767190,
    title: 'Learn Redux in 10 minutes!',
    body: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
    author: 'Yoda',
    category: 'redux',
    voteScore: -5,
    deleted: false,
    commentCount: 0
  },
   "8xf0y6ziyjabvozdd22er": {
    id: '8xf0y6ziyjabvozdd22er',
    timestamp: 1467166872634,
    title: 'Where does it come from?',
    body: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. ',
    author: 'Han Solo',
    category: 'redux',
    voteScore: 2,
    deleted: false,
    commentCount: 2
  },
  "6ni6ok3ym7mf1p33l4555": {
    id: '6ni6ok3ym7mf1p33l4555',
    timestamp: 1468479767190,
    title: 'Where is the dark force?',
    body: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
    author: 'Dart Vader',
    category: 'redux',
    voteScore: 10,
    deleted: false,
    commentCount: 0
  },
   "8xf0y6ziyjabvozdd22df": {
    id: '8xf0y6ziyjabvozdd22df',
    timestamp: 1467166872634,
    title: 'Pellentesque a scelerisque nisl',
    body: 'Sed ex justo, maximus vel vulputate vitae, vestibulum ut risus. Vestibulum augue mi, condimentum sed lobortis blandit, laoreet a enim. Mauris ullamcorper quis neque sit amet convallis. Cras vehicula lobortis semper. Donec nulla purus, vulputate eu lorem tincidunt, aliquam dapibus enim. Ut id tortor sem. Sed justo ipsum, volutpat in vestibulum eu, consequat vel nunc.',
    author: 'Han Solo',
    category: 'udacity',
    voteScore: 2,
    deleted: false,
    commentCount: 2
  },
  "6ni6ok3ym7mf1p33l4ef5": {
    id: '6ni6ok3ym7mf1p33l4ef5',
    timestamp: 1468479767190,
    title: 'Praesent in volutpat magna',
    body: 'Nam elit quam, consectetur ut mattis sit amet, cursus vel lacus. Praesent porta hendrerit lectus, sed interdum sem dapibus eu. Fusce lorem neque, aliquam nec maximus ut, pellentesque sed massa. Suspendisse sed accumsan arcu. Vivamus neque velit, tincidunt sit amet porta et, scelerisque non turpis. Ut in dapibus eros, vitae ultrices ante. Sed a felis dui. Donec sit amet metus velit. Fusce dapibus posuere odio in hendrerit. Proin auctor, sem et rhoncus hendrerit, velit lorem fringilla odio, ut viverra eros felis eu magna. Cras vel turpis nibh. Curabitur sed neque sed nunc gravida posuere. Fusce a quam ligula. In maximus at arcu at mollis. Nullam semper lacus nisl, eget dapibus metus ultrices ut.',
    author: 'Dart Vader',
    category: 'react',
    voteScore: 10,
    deleted: false,
    commentCount: 0
  }
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByCategory (token, category) {
  return new Promise((res) => {
    let posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => posts[key].category === category && !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function get (token, id) {
  return new Promise((res) => {
    const posts = getData(token)
    res(
      posts[id].deleted
        ? {}
        : posts[id]
    )
  })
}

function getAll (token) {
  return new Promise((res) => {
    const posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function add (token, post) {
  return new Promise((res) => {
    let posts = getData(token)

    posts[post.id] = {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      voteScore: 1,
      deleted: false,
      commentCount: 0
    }

    res(posts[post.id])
  })
}

function vote (token, id, option) {
  return new Promise((res) => {
    let posts = getData(token)
    post = posts[id]
    switch(option) {
        case "upVote":
            post.voteScore = post.voteScore + 1
            break
        case "downVote":
            post.voteScore = post.voteScore - 1
            break
        default:
            console.log(`posts.vote received incorrect parameter: ${option}`)
    }
    res(post)
  })
}

function disable (token, id) {
    return new Promise((res) => {
      let posts = getData(token)
      posts[id].deleted = true
      res(posts[id])
    })
}

function edit (token, id, post) {
    return new Promise((res) => {
        let posts = getData(token)
        for (prop in post) {
            posts[id][prop] = post[prop]
        }
        res(posts[id])
    })
}

function incrementCommentCounter(token, id, count) {
  const data = getData(token)
  if (data[id]) {
    data[id].commentCount += count
  }
}

module.exports = {
  get,
  getAll,
  getByCategory,
  add,
  vote,
  disable,
  edit,
  getAll,
  incrementCommentCounter
}
