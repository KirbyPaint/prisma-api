import { PrismaClient, User } from "@prisma/client";
import { login, register } from "./scripts/login";
import { query } from "./scripts/management";
import { prompt } from "./scripts/utility";

const prisma = new PrismaClient();

async function startup() {
  console.log("Hello and welcome to the database");

  let loggedInUser: User;
  const answer = await prompt("Are you an existing user? (y/n)\n");

  switch (answer.toLowerCase()) {
    case "y":
      loggedInUser = await login(prisma);
      break;
    default:
      loggedInUser = await register(prisma);
      break;
  }

  query();
}

startup()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
