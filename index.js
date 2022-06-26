// poop

const Discord = require('discord.js');
const keepAlive = require('./server.js');
const fs = require('fs');
const prefix='.';

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


client.once('ready', () => {
    console.log(client.user.tag + ' is online...');
});

client.on('messageCreate', msg => {
    if(!msg.content.startsWith(prefix)) return; // ignore bot or unprefixed

    // split input args, remove prefix, and sanitize
    const args = msg.content.slice(prefix.length).split(/ +/);
    const command = args[0].toLowerCase();
    
    console.log('Command: ' + command + '\n Arguments: '+ args);

    // run commands
    if(command=='refresh') { 
        if (args.length==1) return msg.channel.send("Enter command to refresh.");
        try {
            const refreshCommand = args[1];
            delete require.cache[require.resolve(`./commands/${refreshCommand}.js`)];
            client.commands.delete(refreshCommand);
            const file = require(`./commands/${refreshCommand}.js`);
            client.commands.set(refreshCommand, file)
        } catch (error) {
            return msg.channel.send("Refresh failed, " + error);
        }
        return msg.channel.send("Sucessfully Refreshed");
    } // refresh is special
    
    try { 
        client.commands.get(command).execute(msg, args);        
    } catch (error) {
        msg.channel.send("Invalid command.");
    }
});

// wtf am i doing

keepAlive() // + uptimerobot will ping from time to time
client.login(process.env.TOKEN); // bot login
