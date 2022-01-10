import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

export function prompt(prompt: string) {
  return new Promise((resolve) =>
    rl.question(prompt, (ans) => {
      rl.close();
      resolve(ans);
    })
  );
}
