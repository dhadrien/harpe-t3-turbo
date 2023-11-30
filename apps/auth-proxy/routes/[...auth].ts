import { Auth } from "@auth/core";
import Discord from "@auth/core/providers/discord";
import Notion from "@auth/core/providers/notion";
import { eventHandler, toWebRequest } from "h3";

console.log('**************************')
console.log('process.env.AUTH_NOTION_ID,', process.env.AUTH_NOTION_ID)
console.log('process.env.AUTH_NOTION_SECRET,', process.env.AUTH_NOTION_SECRET)
console.log('process.env.AUTH_NOTION_REDIRECT_URI,', process.env.AUTH_NOTION_REDIRECT_URI)
console.log('process.env.AUTH_DISCORD_ID,', process.env.AUTH_DISCORD_ID)
console.log('process.env.AUTH_DISCORD_SECRET,', process.env.AUTH_DISCORD_SECRET)


export default eventHandler(async (event) =>
  Auth(toWebRequest(event), {
    secret: process.env.AUTH_SECRET,
    trustHost: !!process.env.VERCEL,
    redirectProxyUrl: process.env.AUTH_REDIRECT_PROXY_URL,
    debug: true,
    providers: [
      Notion({
        clientId: process.env.AUTH_NOTION_ID,
        clientSecret: process.env.AUTH_NOTION_SECRET,
        redirectUri: process.env.AUTH_NOTION_REDIRECT_URI ?? "ha"
      }),
      Discord({
        clientId: process.env.AUTH_DISCORD_ID,
        clientSecret: process.env.AUTH_DISCORD_SECRET,
      }),
      
    ],
  }),
);
