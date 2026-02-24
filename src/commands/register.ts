import { setUser } from "../config.js";
import { createUser, getUserByName } from "../lib/db/queries/users";

export async function handlerRegister(cmdName: string, ...args: string[]) {

  if(args.length === 0){
    throw new Error("You must provide a name to register.");
  }
    const username =args[0];
    const isUser = await getUserByName(username );
     if (isUser)
       throw new Error(`User "${username }" already exists.`);

  const user= await createUser(username );
  await setUser(username );

  console.log(`User "${username }" created successfully!`);
  console.log(user);
}