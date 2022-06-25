// poop

// get the good stuff
const { Client, Intents } = require("discord.js");
const keepAlive = require("./server.js")

// create new client for the bot
const client = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS
    ] 
})



client.once("ready", () => {
    console.log(client.user.tag + " is online...")
})

client.once("message", () => {
    if(msg.author.bot == true) return;
    
})

// user later for voice stuff
client.on("voiceStateUpdate", function(oldMember, newMember){
    console.log(`a user changes voice state`);
});

keepAlive()
client.login(process.env.TOKEN); // bot login