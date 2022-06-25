// poop

// get the good stuff
const fs = require('fs');
const path = require('path');
const { Client, Intents, Collection } = require("discord.js");
const keepAlive = require("./server.js")
const glob = require("glob")
const prefix = "."

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

client.once("message", msg => {
    if(msg.author.bot == true) return; // don't reply to self
    if(!msg.content.startsWith(prefix)) return; // ignore unprefixed msgs
    if (msg.content==(prefix+"reload") && msg.author.id == process.env.MY_ID) {
        fs.readdir("./commands", (err, files) => {
            if (err) return;

            files.forEach((file) => {
                console.log(file)
                delete require.cache[require.resolve(file)];

                const update = require(file);
                commands.set(update.name, update);
                console.log("Command " 
 + update.name + " reloaded.");
            
            })
        })
    }
        
})

const commands = new Collection();

// initial command registry
fs.readdir("./commands", (err, files) => {
      if (err) throw err;

      files.forEach((file) => {
         const filepath = path.resolve(file);

         fs.stat(filepath, (_, stats) => {
         if (stats.isFile() && file.endsWith('.js')) {
             const newCommand = require(filepath);
             newCommand.set(newCommand.name, newCommand);
             console.log("Command '${update.name}' initialized.");
          }
         
       });
   });
});

keepAlive()
client.login(process.env.TOKEN); // bot login
