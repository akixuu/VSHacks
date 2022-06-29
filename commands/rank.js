module.exports = {
    name: 'rank',
    description: 'find study time rank of a user',
    use:'rank <@user>',
    
    execute: async(client, msg, args) => {

        if (args.length==1) {
            return await msg.channel.send("Invalid operation, use '.rank <@user>'")
        }

        let id = args[1]
        if (id.startsWith('<@') && id.endsWith('>')) { // trunc syntax 
            id = id.slice(2, -1);
    
            if (id.startsWith('!')) { // case nickname
                id = id.slice(1);
            }
            
        }

        // now query in db
        const StudyTimeModel = require('../schemas/StudyTimeSchema.js')
        const sorted = await StudyTimeModel.aggregate([{ $sort:{pointsAmassed:-1 }}])
        const exists = await StudyTimeModel.findOne({ userId: id })
        
        if (exists) { // user found
            const { MessageEmbed } = require('discord.js');            

            const mentionedUser = await client.users.fetch(id); // discord query for mention (id) (fetch()>cache.get())
            console.log(mentionedUser)
            console.log(sorted[0])

            let i=0;
            for(x of sorted) {
                if (x.userId === mentionedUser.id) { break; }
                ++i;
            }
            ++i;

            embed = new MessageEmbed()
            .setColor(mentionedUser.hexAccentColor)
            .setDescription(`Rank of <@${id}>`)
            .addFields(
                { name: 'Rank', value: `**#${i}**`, inline: true },
                { name: 'Points Amassed', value: `${Math.round(exists.pointsAmassed)}`, inline: true },
            )
            .setThumbnail(mentionedUser.displayAvatarURL())
            .setTimestamp()

            await msg.channel.send({ embeds: [embed] });
            
        } else { // user doesn't exist in db
            await msg.channel.send("This user has not studied using Study Timer yet!")
        }
        
    }
}