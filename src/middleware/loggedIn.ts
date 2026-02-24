import { getUserByName } from "../lib/db/queries/users.js";
import { readConfig } from "../config";
import { CommandHandler } from "../commands/commands.js";
import { User} from '../lib/db/schema.js';

type UserCommandHandler = (
  cmdName: string,
  user: User,
  ...args: string[]
) => Promise<void>;

// type middlewareLoggedIn = (handler: UserCommandHandler) => CommandHandler;

export const middlewareLoggedIn=(handler:UserCommandHandler):CommandHandler=>{
    return async(cmdName:string,...args:string[])=>{
        const config = readConfig();
        const username=config.currentUserName;
        if(!username){
            // throw new Error("No user is currently logged in.");
           console.log("No user is currently logged in. Please register first.");
           return;
        }
        const user =await getUserByName(username);
        if(!user){
            // throw new Error(`User ${username} not found.`)
            console.log(`User ${username} not found. Please register first.`);
            return;
        }
        await handler(cmdName, user,...args);
    };
}