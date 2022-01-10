import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

export async function prompt(prompt: string): Promise<string> {
  console.log(`PROMPT FUNCTION`);
  return new Promise((resolve) =>
    rl.question(prompt, (ans) => {
      rl.close();
      resolve(ans);
      console.log(`END PROMPT FUNCTION`);
    })
  );
}
