import Profile from "../database/models/Profile";
import User from "../database/models/User"; // Import your models
import { faker } from "@faker-js/faker";

export async function seed() {
  // Check if users already exist
  const userCount = await User.count();

  if (userCount > 5) {
    console.log("Users already exist. Seeding skipped.");
    return; // Skip seeding if users already exist
  }

  // Generate an array of users with Faker
  const users = Array.from({ length: 30 }).map(() => ({
    username: faker.internet.username(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    isVerified: faker.datatype.boolean(),
  }));

  // Bulk create users
  const createdUsers = await User.bulkCreate(users, { returning: true });

  // Generate profiles for the created users
  const profiles = createdUsers.map((user) => ({
    userId: user.id,
    bio: faker.lorem.sentence(),
    age: faker.number.int({ min: 20, max: 50 }), // Random age between 20 and 50
    gender: faker.datatype.boolean() ? "male" : "female", // Random gender
    profilePicture: faker.image.avatar(), // Random profile picture
  }));

  // Bulk create profiles
  await Profile.bulkCreate(profiles);

  console.log("Seeding completed successfully.");
}
