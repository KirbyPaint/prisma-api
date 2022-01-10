import { PrismaClient, User } from "@prisma/client";
import readline from "readline";
import { login, register } from "./scripts/login";

const prisma = new PrismaClient();

async function main() {
  console.log("Hello and welcome to the database");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let loggedInUser: User;
  rl.question("Are you an existing user? (y/n)\n", async (answer) => {
    switch (answer) {
      case "y":
        loggedInUser = await login(prisma);
        break;
      default:
        loggedInUser = await register(prisma);
        break;
    }
  });
  // rl.close();
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
