// lib/spotify
import { Client }  from "spotify-api.js"

const globalForSpotify = global as unknown as { spotify: Client };

export const spotify =
  globalForSpotify.spotify ||  new Client({ 
    token: { 
      clientID: process.env.SPOTIFY_ID || "", 
      clientSecret: process.env.SPOTIFY_SECRET || "" 
    },
})

if (process.env.NODE_ENV !== "production") globalForSpotify.spotify = spotify;