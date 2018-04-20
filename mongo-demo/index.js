const mongoose = require('mongoose');
const courseSchema = require('./courseSchema');

const connectToMongo = async (db) => {
    try {
        let mongo = await mongoose.connect(db);
        return mongo;
    }
    catch (err) {
        console.error (err)
    }
}

// COURSE SCHEMA

const newCourse = {
    name: 'Angular Course',
    author: 'Mosh',
    category: ['+'],
    tags: [],
    isPublished: true,
    price: 15
}

const Course = mongoose.model('Courses', courseSchema);

const createCourse = async (c) => { 
    try { 
        let course =  new Course(c);
        const result = await course.save();
    } catch (err) { 
        // console.error(err.errors);
       for (key in err.errors) {
           console.log(err.errors[key].message)
       }
    }
}

const getCourses = async () => { 
    try { 
        const courses = await Course.find();
        return courses;
    } 
    catch (err) { 
        console.error(err)
    }
}

const getCourse = async (id) => { 
    try { 
        const course = await Course.findById(id);
        return course;
    }
     catch (err) {
        console.error(err)
    }
}

const queryFirstupdateCourse = async (id) => { 
    try {
        const course = await getCourse(id)
        if (!course) return 
        
        course.set({ 
            name: 'qwery'
        })
        const result = await course.save();
        return result
    } 
    catch (err) { 
        console.error(err)
    }
}

const updateCourse = async (id) => {
    try { 
        const course = await Course.update({_id: id}, { 
            $set: { name: 'direct'}
        })
    }
    catch (err) { 
        console.error(err)
    }
}


const removeCourse  = async (id) => { 
    try { 
        // const courseToDelete = await Course.deleteOne({_id: id}, )
        const courseToDelete = await Course.findByIdAndRemove(id)
        console.log(courseToDelete)
    }
    catch (err) { 
        console.error(err)
    }
}
const run = async () => { 
    try { 
        const db = 'mongodb://localhost:27017/playground'
        let id = '5acdeb2a5ce0c2597d87c0d3';
        const mongo = await connectToMongo(db);
        const result = await createCourse(newCourse);
        const courses = await getCourses();
        // const dCourse = await removeCourse(id)

        // console.log(courses)
        // const courseToUpdate = await queryFirstupdateCourse( id,getCourse)
        // const courseToUpdate = await updateCourse(id);
        // const course = await getCourse(id);
    
        // return course ;
    } 
    catch (err) { 
        console.error(err)
        return 
    }
}

run()
