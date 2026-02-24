// fs is the file system module, which allows you to read and write files.
// os provides operating system-related utility methods.
// path provides utilities for working with file and directory paths.
import fs from "fs";
import os from "os";
import path from "path";

export type Config = {
  dbUrl: string
  currentUserName?: string
}
function getConfigFilePath(): string {
  return path.join(os.homedir(), ".gatorconfig.json")
}

function writeConfig(cfg: Config): void{
  const filePath = getConfigFilePath()

  const rawConfig = {
    db_url: cfg.dbUrl,
    current_user_name: cfg.currentUserName
  }

 fs.writeFileSync(filePath, JSON.stringify(rawConfig, null, 2))
}

function validateConfig(rawConfig: any): Config {
  if (!rawConfig.db_url || typeof rawConfig.db_url !== "string") {
    throw new Error("Invalid config file: db_url missing or invalid")
  }

  return {
    dbUrl: rawConfig.db_url,
    currentUserName: rawConfig.current_user_name
  }
}
// Export a readConfig function that reads the JSON file found at ~/.gatorconfig.
// json and returns a Config object.
//  It should read the file from the HOME directory, then decode the JSON string into a new Config object.
export function readConfig(): Config {
  const filePath = getConfigFilePath()

  const fileContent = fs.readFileSync(filePath, "utf-8")

  const parsed = JSON.parse(fileContent)

  return validateConfig(parsed)
}
// Export a setUser function that writes a Config object 
// to the JSON file after setting the current_user_name field.
export function setUser(userName: string): void {
  const config = readConfig()

  config.currentUserName = userName

  writeConfig(config)
}