import mongoose from "mongoose";
import { Course } from "../src/models/Course.model.js";

const MONGODB_URI = "mongodb+srv://jaykumar0305:Jashank123@edu1.lhuqetm.mongodb.net/edtube?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

const deleteOldCourse = async () => {
  try {
    // Find all "Understanding the Self" courses
    const courses = await Course.find({ title: "Understanding the Self" }).sort({ createdAt: 1 });
    
    console.log(`\n📚 Found ${courses.length} courses with title "Understanding the Self"\n`);
    
    courses.forEach((course, index) => {
      console.log(`${index + 1}. ${course.title}`);
      console.log(`   - ID: ${course._id}`);
      console.log(`   - Faculty: ${course.facultyName}`);
      console.log(`   - Created: ${course.createdAt}`);
      console.log(`   - Department: ${course.department}`);
      console.log();
    });

    // Delete the old one (first one by date - Dr.Savita Sharma)
    if (courses.length > 1) {
      const oldCourse = courses[0]; // The oldest one
      
      console.log(`\n🗑️  Deleting old course: ${oldCourse.title} by ${oldCourse.facultyName}`);
      console.log(`   ID: ${oldCourse._id}\n`);
      
      await Course.findByIdAndDelete(oldCourse._id);
      
      console.log("✅ Old 'Understanding the Self' course deleted successfully!");
      console.log(`   Kept: ${courses[1].title} by ${courses[1].facultyName}`);
    } else {
      console.log("⚠️  Only one course found, nothing to delete.");
    }

    // Show final count
    const finalCount = await Course.countDocuments();
    console.log(`\n📊 Total courses now: ${finalCount}`);

  } catch (error) {
    console.error("❌ Error deleting course:", error);
  }
};

const main = async () => {
  await connectDB();
  await deleteOldCourse();
  process.exit(0);
};

main();
