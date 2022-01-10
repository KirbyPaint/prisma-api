import { PrismaClient, User } from "@prisma/client";
import { prompt } from "./utility";

async function lookup(
  prisma: PrismaClient,
  email: string
): Promise<User | undefined> {
  console.log("Performing lookup");
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user?.firstName) {
    console.log(`Found user: ${user.firstName} ${user.secondName}`);
    return user;
  } else {
    throw new Error("User not found");
  }
}

export async function login(prisma: PrismaClient): Promise<User> {
  const email = await prompt("Enter your email address\n");
  const user = await lookup(prisma, email as string);
  if (user?.firstName) {
    return user;
  } else {
    throw new Error("User not found");
  }
}

export async function register(prisma: PrismaClient): Promise<User> {
  console.log("Welcome to registration");

  const inputs = await prompt("Enter your details separated by commas\n");
  const [firstName, secondName, email] = inputs.split(",");

  const emailAlreadyExists = await lookup(prisma, email as string);

  if (emailAlreadyExists) {
    throw new Error("Email already exists");
  }

  const user = await prisma.user.create({
    data: {
      firstName,
      secondName,
      email,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    },
  });

  if (!user) {
    throw new Error("User lookup failed somewhere");
  }

  console.log(`Created user: ${user.firstName} ${user.secondName}`);
  return user;
}
