// connect to DB

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

mongoose
  .connect("mongodb://localhost/playground") // if DB is not created, mdb will auto create this for us
  .then(() => console.log("connected to mongodb..."))
  .catch((err) => console.log("could not connect to mongodb, error:", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema); // class

async function createCourse() {
  const course = new Course({
    name: "Angular course",
    author: "Mosh",
    tags: ["angular", "frontend"],
    isPublished: true,
  });

  const result = await course.save();

  console.log(result);
}

// createCourse();

// ---- Basic find
// async function getCourses() {
//   const courses = await Course.find();
//   console.log(courses);
// }

// --output
// [
//   {
//     _id: new ObjectId("6423f302b28969be07c99023"),
//     name: 'Node.js course',
//     author: 'Mosh',
//     tags: [ 'node', 'backend' ],
//     isPublished: true,
//     date: 2023-03-29T08:12:50.418Z,
//     __v: 0
//   },
//   {
//     _id: new ObjectId("6423f3d2e9e4839a84e8bd81"),
//     name: 'Angular course',
//     author: 'Mosh',
//     tags: [ 'angular', 'frontend' ],
//     isPublished: true,
//     date: 2023-03-29T08:16:18.505Z,
//     __v: 0
//   }
// ]

async function getCourses() {
  const courses = await Course.find({ author: "Mosh", isPublished: true })
    .limit(10)
    .sort({ name: 1 }) // 1 is assending, -1 is dessending
    .select({ name: 1, tags: 1 });

  console.log(courses);
}

// output
// [
//   {
//     _id: new ObjectId("6423f3d2e9e4839a84e8bd81"),
//     name: "Angular course",
//     tags: ["angular", "frontend"],
//   },
//   {
//     _id: new ObjectId("6423f302b28969be07c99023"),
//     name: "Node.js course",
//     tags: ["node", "backend"],
//   },
// ];

getCourses();
