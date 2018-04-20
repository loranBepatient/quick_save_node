const mongoose = require('mongoose');
const db = 'mongodb://localhost:27017/mongo-exercises'

const connectToMongo = async (db) => {
    try {
        const mongo = await mongoose.connect(db)
        console.log('connected to Mongo')
        return mongo
    }
    catch (err) {
        console.error(err)
    }
}

const courseSchema = new mongoose.Schema({
    tags: [String],
    date: {
        type: Date,
        default: Date.now
    },
    name: String,
    author: String,
    isPublished: {
        type: Boolean,
        default: false
    }
})

const Courses = mongoose.model('courses', courseSchema);

// const getCourses = async () => {
//     const courses = await Courses.find()
//     .and([{ isPublished: true, tags: 'backend' }])
//     .sort({ name: 1 })
//     .select({ name: 1, author: 1 })
//     return courses
// }

// const getCourses = async () => {
//     const courses = await Courses.find()
//     .and({ isPublished: true})
//     .or([{ tags: 'frontend' }, { tags: 'backend'}])
//     .sort({ price: -1 })
//     .select({ name: 1, author: 1, price: 1 })
//     return courses
// }

const getCourses = async () => {
    const courses = await Courses.find({isPublished: true})
    .and([{ name: /.*by.*/i }, { price: { $gte: 5}}])
    .sort({ price: -1 })
    .select('name author price')
    return courses
}

const run = async () => {
    const mongo = await connectToMongo(db)
    const courses = await getCourses()
    console.log(courses)
}

run()
