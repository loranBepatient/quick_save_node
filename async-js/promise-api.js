const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('resolve from Fb')
        resolve('fb')
    }, 2000)
})


const p2 =
    new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('resolve from twitter')
            resolve('twitter')

        }, 2000)
    })

const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('resolve from linkedin')
        resolve('linkedin')

    }, 2000)
})


const p4 =
    new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('resolve from instgram')
            resolve('instagram')

        }, 2000)
    })


Promise.all([p1, p2, p3, p4])
    .then(resolved => {
        resolved.map(r => console.log(r))
    })
