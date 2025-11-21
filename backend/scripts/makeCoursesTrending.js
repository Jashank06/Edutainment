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

const makeCoursesTrending = async () => {
  try {
    // Find the 3 new courses by their IDs (from previous output)
    const newCourseIds = [
      "69208f6f2862c7c3d4839ab7", // Material Science
      "69208f6f2862c7c3d4839aba", // Entrepreneurship and Startups
      "69208f6f2862c7c3d4839abd"  // Understanding the Self (new)
    ];

    console.log("\n📝 Updating course timestamps to make them trending...\n");

    // Update the createdAt timestamp to make them appear first
    // Set them to very recent dates (today) to appear in top
    const now = new Date();
    const timestamps = [
      new Date(now.getTime() - 2000), // Material Science (most recent)
      new Date(now.getTime() - 1000), // Entrepreneurship and Startups
      new Date(now.getTime()),        // Understanding the Self (newest)
    ];

    for (let i = 0; i < newCourseIds.length; i++) {
      const course = await Course.findByIdAndUpdate(
        newCourseIds[i],
        { createdAt: timestamps[i] },
        { new: true }
      );
      
      if (course) {
        console.log(`✅ Updated: ${course.title}`);
        console.log(`   - New timestamp: ${course.createdAt}`);
        console.log();
      }
    }

    // Show updated trending courses
    const allCourses = await Course.find({}).sort({ createdAt: 1 });
    console.log("\n🔥 NEW Trending Courses (First 4):");
    allCourses.slice(0, 4).forEach((course, index) => {
      console.log(`${index + 1}. ${course.title}`);
      console.log(`   - Faculty: ${course.facultyName}`);
      console.log(`   - Department: ${course.department}`);
      console.log(`   - Rating: ${course.rating}/5`);
    });

    console.log("\n✨ Successfully updated trending courses!");

  } catch (error) {
    console.error("❌ Error updating courses:", error);
  }
};

const main = async () => {
  await connectDB();
  await makeCoursesTrending();
  process.exit(0);
};

main();
