import { PrismaClient, User } from "@prisma/client";
import readline from "readline";
import { prompt } from "./utility";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

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
  let uFirstName;
  let uSecondName;
  let uEmail;

  rl.question("Enter your first name\n", (firstName: string) => {
    uFirstName = firstName;
  });
  rl.question("Enter your first name\n", (secondName: string) => {
    uSecondName = secondName;
  });
  rl.question("Enter your first name\n", (email: string) => {
    uEmail = email;
  });

  if (!uFirstName || !uSecondName || !uEmail) {
    throw new Error("Registration failed, missing a field");
  }
  const user = await prisma.user.create({
    data: {
      firstName: uFirstName,
      secondName: uSecondName,
      email: uEmail,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    },
  });

  if (!user) {
    throw new Error("User lookup failed somewhere");
  }
  return user;
}
