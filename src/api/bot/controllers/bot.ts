/**
 * A set of functions called "actions" for `bot`
 */

import { REST } from "discord.js";
import { client } from "../../..";

export default {
  assignRoles: async (ctx: any) => {
    try {
      const body = ctx.request.body as {
        discordId: string,
        userId: string
      }
      const guild = client.guilds.resolve("893577313218875462")
      const member = await guild.members.fetch(body.discordId)
      return ctx.body = member
    } catch (err) {
      ctx.body = err;
    }
  }
};
