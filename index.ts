import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();
import readline from "readline";
import { login, register } from "./scripts/login";

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
    console.log(loggedInUser);
  });

  // const user = await prisma.user.create({
  //   data: {
  //     firstName: "John",
  //     secondName: "Doe",
  //     email: "john@doe.com",
  //   },
  // });

  // const successfulPost = await prisma.user.findUnique({
  //   where: {
  //     email: "john@doe.com",
  //   },
  // });

  // if (successfulPost) {
  //   console.log("we found the user");
  //   console.log(successfulPost);
  // } else {
  //   console.log("we did not find the user");
  // }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
