import {Client, GatewayIntentBits, GatewayVersion} from "discord.js"
import { initLifeCycles } from "./lifecycles";
export const client = new Client({ intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMembers
] });

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({strapi}) {
    initLifeCycles(strapi)
    client.on('ready', () => {
      console.log(`Logged in as ${client.user.tag}!`);
    });
    client.login(process.env.BOT_TOKEN);
  },
};
