module.exports = {
    name: 'rank',
    description: 'find study time rank of a user',
    use:'rank <@user>',
    
    execute: async(client, msg, args) => {

        if (args.length==1) {
            return await msg.channel.send("Invalid operation, use '.rank <@user>'")
        }

        let mention = args[1]
        if (mention.startsWith('<@') && mention.endsWith('>')) { // trunc syntax 
            mention = mention.slice(2, -1);
    
            if (mention.startsWith('!')) { // case nickname
                mention = mention.slice(1);
            }
            
        }

        const mentionedUser = await client.users.cache.get(mention); // discord query for mention (id)

        // now query in db
        const StudyTimeModel = require('../schemas/StudyTimeSchema.js')
        const exists = await StudyTimeModel.findOne({ userId: mentionedUser.id })
        const sorted = await StudyTimeModel.aggregate([{ $sort:{pointsAmassed:-1 }}])
        
        console.log(`Looking for ${mention}... \n\n${mentionedUser}\n`)

        console.log("sorted db:\n" + sorted)

        if (exists) { // user found
            const { MessageEmbed } = require('discord.js');            

            embed = new MessageEmbed()
            .setColor(mentionedUser.hexAccentColor)
            .setDescription(`Rank of <@${mentionedUser.id}>`) //TODO:RANK
            .addFields(
                { name: 'Rank', value: `# RANK HERE ${10000000}`, inline: true },
                { name: 'Points Amassed', value: `${Math.round(exists.pointsAmassed)}`, inline: true },
            )
            .setThumbnail(mentionedUser.displayAvatarURL())

            await msg.channel.send({ embeds: [embed] });
            
        } else { // user doesn't exist in db
            await msg.channel.send("This user has not studied using Study Timer yet!")
        }
        
    }
}