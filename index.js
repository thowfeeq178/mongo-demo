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


createCourse();
