import { REST } from '@discordjs/rest';
export const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);
export const BACKEND_URL = "http://localhost:1337"
