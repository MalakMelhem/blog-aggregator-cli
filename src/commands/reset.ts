import { reset } from "../lib/db/queries/users";

export async function handlerReset(cmdName: string, ...args: string[]) {
try{
  await reset();
  console.log("Database reset successfully.");
  process.exit(0);
}catch(err){
    console.log(`${err}: Failed to reset database.`);
    process.exit(1);
}
}
 