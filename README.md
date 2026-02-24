# Blog Aggregator CLI

**Blog Aggregator CLI** is a command-line interface (CLI) tool written in TypeScript and Node.js. It allows users to:

- Add RSS feeds from across the internet
- Collect and store posts in a PostgreSQL database
- Follow and unfollow RSS feeds added by other users
- View summaries of aggregated posts in the terminal, with links to the full post

RSS feeds are a way for websites to publish updates to their content. You can use this project to keep up with your favorite blogs, news sites, podcasts, and more!

---

## Features

- Aggregate RSS feeds from multiple sources with automatic fetching at specified intervals
- Add new feeds as a registered user
- Browse followed feeds in the terminal
- Follow/unfollow feeds and track which feeds a user is following

---

## Available Commands

| Command | Description |
|---------|-------------|
| `login` | Log in as a registered user |
| `register` | Register a new user |
| `reset` | Reset the database |
| `users` | List all registered users |
| `agg <interval>` | Fetch feeds at a specified interval (in seconds) |
| `addfeed <name> <url>` | Add a new RSS feed to track |
| `feeds` | List all feeds in the database |
| `follow <user> <feed>` | Follow a feed as a user |
| `unfollow <user> <feed>` | Unfollow a feed as a user |
| `following <user>` | List all feeds a user is following |
| `browse` | Browse collected feed items |

---

## Tech Stack

- **TypeScript (v5)**
- **Node.js**
- **Readline** (CLI interface)
- **Async/await** for REST API consumption
- **PostgreSQL** database

---

## Setup

1. **Clone the repository**

```bash
git clone https://github.com/your-username/agg.git
cd agg
```
2. **Install dependencies**
```bash
npm install
```
3. **Create a config file**
The CLI expects a configuration file in your home directory:
```json
~/.gatorconfig.json
{
  "db_url": "postgres://username:password@localhost:5432/agg_db"
}
```
Note: Replace the URL with your PostgreSQL connection string.
