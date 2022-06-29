// poop
// https://cog-creators.github.io/discord-embed-sandbox/

const Discord = require('discord.js');
const keepAlive = require('./server.js');
const fs = require('fs');

const StopWatch = require('stopwatch-js')
stopWatch = new StopWatch();

require('dotenv').config()

const prefix='.';

const mongoose = require('mongoose')

const client = new Discord.Client({ 
    intents: new Discord.Intents(131071)
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
    if(!msg.content.startsWith(prefix)) return; // ignore unprefixed

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
            return msg.channel.send("Refresh failed: " + e);
        }
        return msg.channel.send("Sucessfully Refreshed");
    }

    // other commands
    try {  client.commands.get(command).execute(client, msg, args);        
    } catch (e) {
        msg.channel.send("Error: " + e);
    }
});

client.on('voiceStateUpdate', async (oldMember, newMember) => {
        // console.log(`a user changes voice state`);
        // console.log('\n\n')
        // console.log(oldMember)
        // console.log('\n\n')
        // console.log(newMember)
        // console.log('\n\n')

        // niiiiiiceeeee
        if(oldMember.channelId==991223199964594276) {
            console.log('user has left studytimer vc')
            stopWatch.stop()

            if('undefined'===stopWatch.duration()) { return }

            const StudyTimeModel = require('./schemas/StudyTimeSchema.js')

                const exists = await StudyTimeModel.findOne({ userId: oldMember.id})

                if (exists) { 
                    // update pre-existing user values
                    await StudyTimeModel.updateOne(  { userId: oldMember.id} , { $set: { pointsAmassed: exists.pointsAmassed + stopWatch.duration() } })

                } 
                else { // accomodate new user in database
                    await StudyTimeModel.create({
                        userId: oldMember.id,
                        pointsAmassed: stopWatch.duration()
                    });   
                }

                const channel = client.channels.cache.get('991223199964594276')
                await channel.send(`<@${oldMember.id}> has gained +${Math.round(stopWatch.duration())} points from their study session.`)

        } else {
            const channel = client.channels.cache.get('991223199964594276')
            console.log(channel)
            await channel.send(`<@${oldMember.id}>, you have started a study session!`)
            stopWatch.start();
        }
});


// wtf am i doing

keepAlive() // + uptimerobot will ping from time to time https://uptimerobot.com/dashboard#792085830
client.login(process.env.TOKEN);