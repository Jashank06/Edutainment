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

const updateSubDepartment = async () => {
  try {
    console.log("\n🔧 Updating Material Science subdepartment...\n");

    const course = await Course.findOneAndUpdate(
      { title: "Material Science" },
      { 
        department: "Engineering",
        subDepartment: "Mechanical"
      },
      { new: true }
    );

    if (course) {
      console.log("✅ Material Science updated successfully!");
      console.log(`   - Title: ${course.title}`);
      console.log(`   - Department: ${course.department}`);
      console.log(`   - Sub-Department: ${course.subDepartment}`);
      console.log(`   - Faculty: ${course.facultyName}`);
    } else {
      console.log("⚠️  Material Science course not found!");
    }

  } catch (error) {
    console.error("❌ Error updating course:", error);
  }
};

const main = async () => {
  await connectDB();
  await updateSubDepartment();
  process.exit(0);
};

main();
