import { parseDuration } from '../lib/parseDuration.js';
import { scrapeFeeds } from '../lib/scrapeFeeds.js';

export async function handlerAgg(cmdName: string, ...args: string[]) {

  if (!args[0]) {
  throw new Error("agg command requires a duration argument (e.g. 10s, 1m)");
}
  const timeBetweenRequests=parseDuration(args[0]);
  console.log(`Collecting feeds every ${args[0]}`);

  await scrapeFeeds().catch(console.error);

  const interval=setInterval(()=>{
    scrapeFeeds().catch(console.error);
  },timeBetweenRequests);

 await new Promise<void>((resolve) => {
  process.on("SIGINT", () => {
    console.log("\nShutting down feed aggregator...");
    clearInterval(interval);
    resolve();
  });
});
    
}