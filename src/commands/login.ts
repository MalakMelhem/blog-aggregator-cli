import { setUser } from "../config.js";
import { getUserByName } from "../lib/db/queries/users";

export async function handlerLogin(cmdName: string, ...args: string[]) {

  if (args.length === 0) {
    throw new Error("Username is required");
  }

  const username = args[0];

  const isUser = await getUserByName(username);
       if (!isUser)
         throw new Error(`User "${username}" does not exist.`);

  await setUser(username);

  console.log(`Logged in as ${username}`);
}