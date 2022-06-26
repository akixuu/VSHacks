// poop

const Discord = require('discord.js');
const keepAlive = require('./server.js');
const fs = require('fs');
const prefix='.';
const mongoose = require('mongoose')

const client = new Discord.Client({ 
    intents: new Discord.Intents(32767)
});


// COMMAND SETUP
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); // filter for .js files

// fetch files
for(let file of commandFiles) {
    let command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
    console.log(`command ${command.name} added.`);
}


client.once('ready', async () => {
    console.log(`${client.user.tag} is online.`);
    await mongoose.connect(process.env.MONGO_URI, { keepAlive: true })
    .then(() => {
        console.log("Connection with database established.")
    }).catch((e) => {
        console.log(e)
    });
});

client.on('messageCreate', msg => {
    if(!msg.content.startsWith(prefix)) return; // ignore bot or unprefixed

    // split input args, remove prefix, and sanitize
    const args = msg.content.slice(prefix.length).split(/ +/);
    const command = args[0].toLowerCase();
    
    console.log('\nBOT COMMAND\nCommand: ' + command + '\nArguments: '+ args);

    // refresh is separated cz it's special
    if(command=='refresh') { 
        if (args.length==1) return msg.channel.send("Enter command to refresh.");
        try {
            const refreshCommand = args[1];
            delete require.cache[require.resolve(`./commands/${refreshCommand}.js`)];
            client.commands.delete(refreshCommand);
            const file = require(`./commands/${refreshCommand}.js`);
            client.commands.set(refreshCommand, file)
        } catch (e) {
            return msg.channel.send("Refresh failed, " + e);
        }
        return msg.channel.send("Sucessfully Refreshed");
    }

    // other commands
    try {  client.commands.get(command).execute(client, msg, args);        
    } catch (e) {
        msg.channel.send("Error: " + e);
    }
});

// wtf am i doing

keepAlive() // + uptimerobot will ping from time to time 
// note to self : https://uptimerobot.com/dashboard#792085830
client.login(process.env.TOKEN);