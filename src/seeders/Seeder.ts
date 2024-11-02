import Profile from "../database/models/Profile";
import User from "../database/models/User"; // Import your models
import { fa, faker } from "@faker-js/faker";
import { hashPassword } from "../helpers/Bcrypt";
import PremiumPackage from "../database/models/PremiumPackage";

export async function seed() {
  const userCount = await User.count();

  if (userCount > 5) {
    console.log("Users already exist. Seeding skipped.");
    return;
  }

  const users = Array.from({ length: 30 }).map(() => ({
    username: faker.internet.username(),
    email: faker.internet.email(),
    password: hashPassword(faker.internet.password()),
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  const createdUsers = await User.bulkCreate(users, { returning: true });

  const profiles = createdUsers.map((user) => ({
    userId: user.id,
    bio: faker.lorem.sentence(),
    age: faker.number.int({ min: 20, max: 50 }),
    gender: faker.datatype.boolean() ? "male" : "female",
    profilePicture: faker.image.avatar(),
    isVerified: faker.datatype.boolean(),
    createdAt: new Date(),
    updatedAt: new Date(),
    displayName: faker.internet.displayName(),
  }));

  await Profile.bulkCreate(profiles);

  await PremiumPackage.bulkCreate([
    {
      packageName: "Silver",
      description: "Basic access with limited features",
      price: 9.99,
      noSwipeQuota: false,
      verifiedLabel: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      packageName: "Gold",
      description: "Extended access with more features",
      price: 19.99,
      noSwipeQuota: true,
      verifiedLabel: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      packageName: "Platinum",
      description: "Full access with all features and premium support",
      price: 29.99,
      noSwipeQuota: true,
      verifiedLabel: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  console.log("Seeding completed successfully.");
}
