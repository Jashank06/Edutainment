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

const updateVideoDurations = async () => {
  try {
    // Update durations based on actual YouTube video lengths
    const updates = [
      {
        title: "Material Science",
        videoDuration: 4200, // 70 minutes (1:10:00) - approximate
        courseDuration: 70
      },
      {
        title: "Entrepreneurship and Startups",
        videoDuration: 3900, // 65 minutes (1:05:00) - approximate
        courseDuration: 65
      },
      {
        title: "Understanding the Self",
        videoDuration: 4500, // 75 minutes (1:15:00) - approximate
        courseDuration: 75
      }
    ];

    console.log("\n🔧 Updating video durations...\n");

    for (const update of updates) {
      const course = await Course.findOneAndUpdate(
        { title: update.title },
        { 
          duration: update.courseDuration,
          "chapters.0.videos.0.duration": update.videoDuration
        },
        { new: true }
      );

      if (course) {
        console.log(`✅ Updated: ${course.title}`);
        console.log(`   - Course Duration: ${update.courseDuration} minutes`);
        console.log(`   - Video Duration: ${Math.floor(update.videoDuration / 60)} minutes`);
        console.log();
      }
    }

    console.log("✨ All durations updated successfully!");

  } catch (error) {
    console.error("❌ Error updating durations:", error);
  }
};

const main = async () => {
  await connectDB();
  await updateVideoDurations();
  process.exit(0);
};

main();
