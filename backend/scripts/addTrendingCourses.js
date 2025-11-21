import mongoose from "mongoose";
import { Course } from "../src/models/Course.model.js";

// MongoDB connection
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

const addTrendingCourses = async () => {
  try {
    // Check existing courses
    const existingCount = await Course.countDocuments();
    console.log(`📊 Current courses in database: ${existingCount}`);

    // Add 3 new courses with YouTube embedded videos
    const newCourses = [
      {
        facultyName: "Dr. Sarah Johnson",
        title: "Material Science",
        description: "Comprehensive course on Material Science covering fundamental concepts, properties, and applications of various materials in engineering and technology.",
        thumbnailUrl: "https://img.youtube.com/vi/NGlbFezd16U/maxresdefault.jpg",
        backgroundImage: "https://img.youtube.com/vi/NGlbFezd16U/maxresdefault.jpg",
        department: "Engineering",
        subDepartment: null,
        level: "Intermediate",
        duration: 180,
        price: 0,
        isPublished: true,
        rating: 4.7,
        enrolledStudents: [],
        chapters: [
          {
            title: "Introduction to Material Science",
            description: "Learn the fundamentals of material science",
            order: 1,
            videos: [
              {
                title: "Material Science Course Overview",
                description: "Complete introduction to material science concepts and applications",
                videoUrl: "https://www.youtube.com/embed/NGlbFezd16U",
                duration: 3600,
                order: 1,
                isPreview: true
              }
            ],
            quizzes: []
          }
        ]
      },
      {
        facultyName: "Prof. Michael Chen",
        title: "Entrepreneurship and Startups",
        description: "Master the art of entrepreneurship! Learn how to build, launch, and scale successful startups from ideation to execution.",
        thumbnailUrl: "https://img.youtube.com/vi/Q3shfMFOFOE/maxresdefault.jpg",
        backgroundImage: "https://img.youtube.com/vi/Q3shfMFOFOE/maxresdefault.jpg",
        department: "Management & Commerce",
        subDepartment: null,
        level: "Beginner",
        duration: 240,
        price: 0,
        isPublished: true,
        rating: 4.8,
        enrolledStudents: [],
        chapters: [
          {
            title: "Entrepreneurship Fundamentals",
            description: "Essential concepts for aspiring entrepreneurs",
            order: 1,
            videos: [
              {
                title: "Entrepreneurship & Startup Essentials",
                description: "Complete guide to starting and growing your business",
                videoUrl: "https://www.youtube.com/embed/Q3shfMFOFOE",
                duration: 4200,
                order: 1,
                isPreview: true
              }
            ],
            quizzes: []
          }
        ]
      },
      {
        facultyName: "Dr. Emily Rodriguez",
        title: "Understanding the Self",
        description: "Explore self-awareness, personal development, and psychological insights to better understand yourself and improve your life.",
        thumbnailUrl: "https://img.youtube.com/vi/_XL7KdPIc6s/maxresdefault.jpg",
        backgroundImage: "https://img.youtube.com/vi/_XL7KdPIc6s/maxresdefault.jpg",
        department: "Education & Humanities",
        subDepartment: null,
        level: "Beginner",
        duration: 200,
        price: 0,
        isPublished: true,
        rating: 4.9,
        enrolledStudents: [],
        chapters: [
          {
            title: "Self-Discovery Journey",
            description: "Understanding yourself and your potential",
            order: 1,
            videos: [
              {
                title: "Understanding the Self - Complete Course",
                description: "Deep dive into self-awareness and personal growth",
                videoUrl: "https://www.youtube.com/embed/_XL7KdPIc6s",
                duration: 3800,
                order: 1,
                isPreview: true
              }
            ],
            quizzes: []
          }
        ]
      }
    ];

    // Insert new courses
    const createdCourses = await Course.insertMany(newCourses);
    console.log(`\n✅ Added ${createdCourses.length} new courses:`);

    createdCourses.forEach((course, index) => {
      console.log(`\n${index + 1}. ${course.title}`);
      console.log(`   - ID: ${course._id}`);
      console.log(`   - Faculty: ${course.facultyName}`);
      console.log(`   - Department: ${course.department}`);
      console.log(`   - Level: ${course.level}`);
      console.log(`   - Price: ₹${course.price} (Free)`);
      console.log(`   - Rating: ${course.rating}/5`);
      console.log(`   - Video URL: ${course.chapters[0]?.videos[0]?.videoUrl || 'N/A'}`);
    });

    // Display final total
    const finalCount = await Course.countDocuments();
    console.log(`\n📊 Total courses after adding: ${finalCount}`);
    console.log(`📈 New courses added: ${finalCount - existingCount}`);

  } catch (error) {
    console.error("❌ Error adding courses:", error);
  }
};

const main = async () => {
  await connectDB();
  await addTrendingCourses();
  console.log("\n🎉 Trending courses added successfully!");
  process.exit(0);
};

main();
