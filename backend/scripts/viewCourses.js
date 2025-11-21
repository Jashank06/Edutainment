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

const viewAllCourses = async () => {
  try {
    const courses = await Course.find({}).sort({ createdAt: 1 });
    
    console.log(`\n📚 Total courses in database: ${courses.length}\n`);
    
    courses.forEach((course, index) => {
      console.log(`${index + 1}. ${course.title}`);
      console.log(`   - ID: ${course._id}`);
      console.log(`   - Faculty: ${course.facultyName || 'N/A'}`);
      console.log(`   - Department: ${course.department || 'N/A'}`);
      console.log(`   - Created: ${course.createdAt || 'N/A'}`);
      console.log(`   - Rating: ${course.rating || 'N/A'}`);
      console.log();
    });

    // Show which courses are currently in "Trending" (first 4)
    console.log("\n🔥 Current Trending Courses (First 4):");
    courses.slice(0, 4).forEach((course, index) => {
      console.log(`${index + 1}. ${course.title}`);
    });

    // Show last 3 courses
    console.log("\n📌 Last 3 Courses:");
    courses.slice(-3).forEach((course, index) => {
      console.log(`${index + 1}. ${course.title} (ID: ${course._id})`);
    });

  } catch (error) {
    console.error("❌ Error viewing courses:", error);
  }
};

const main = async () => {
  await connectDB();
  await viewAllCourses();
  process.exit(0);
};

main();
