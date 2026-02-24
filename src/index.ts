import { handlerLogin} from './commands/login.js';
import { registerCommand, runCommand, CommandsRegistry } from './commands/commands.js';
import { handlerRegister } from './commands/register.js';
import { handlerReset } from './commands/reset.js';
import { handlerUsers } from './commands/users.js';
import { handlerAgg } from './commands/agg.js';
import { handlerAddFeed } from './commands/addfeed.js'
import { handlerFeeds } from './commands/feeds.js';
import { handlerFollow } from './commands/follow.js';
import { handlerFollowing } from './commands/following.js';
import { middlewareLoggedIn } from './middleware/loggedIn.js';
import { handlerUnfollow } from './commands/unfollow.js';
import { handlerBrowse } from './commands/browse.js';

async function main() {
  const registry: CommandsRegistry = {};
  registerCommand(registry, "login", handlerLogin);
  registerCommand(registry, "register", handlerRegister);
  registerCommand(registry, "reset", handlerReset);
  registerCommand(registry, "users", handlerUsers);
  registerCommand(registry, "agg", handlerAgg);
  registerCommand(registry, "addfeed", middlewareLoggedIn(handlerAddFeed));
  registerCommand(registry,"feeds", handlerFeeds);
  registerCommand(registry, "follow", middlewareLoggedIn(handlerFollow));
  registerCommand(registry, "following", middlewareLoggedIn(handlerFollowing));
  registerCommand(registry, "unfollow", middlewareLoggedIn(handlerUnfollow));
  registerCommand(registry, "browse", middlewareLoggedIn(handlerBrowse));
  
  const args = process.argv.slice(2);

  if (args.length === 0) {
  console.error("Not enough arguments provided");
  process.exit(1);
  }
const cmdName = args[0];
const cmdArgs = args.slice(1);

try {
  await runCommand(registry, cmdName, ...cmdArgs);

} catch (err) {
  console.error((err as Error).message);
  process.exit(1);
}
  process.exit(0);
}

main();