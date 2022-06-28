module.exports = {
    name: 'leaderboard',
    description: 'check Study Timer leadboards',
    use:'.leaderboard',

   execute: async (client, msg, args) => {
        const StudyTimeModel = require('../schemas/StudyTimeSchema.js')
        const sorted = await StudyTimeModel.aggregate([{ $sort:{pointsAmassed:-1} }])

        const { MessageEmbed } = require('discord.js')
        embed = new MessageEmbed()
        .setColor('#FFFFFF')
        .setTitle("Study Timer Leaderboard")
        .setThumbnail(process.env.SMALL_LOGO_URL)
        .setTimestamp();

        console.log(sorted[0])

        let names=''
        let ranks=''
        let points=''

        for(let i = 0; i < 10; ++i) {
            const searchId = sorted[i].userId
            console.log(searchId)
            const user = await client.users.fetch(searchId); // discord query for mention (id) (fetch()>cache.get())
            console.log(user)
            ranks += `**#${i+1}**\n`
            names += `<@${user.id}>\n`
            points += `${Math.round(sorted[i].pointsAmassed)}\n`
        }

        embed.addFields(
            { name: 'Rank', value: ranks, inline: true},
            { name: 'Username', value: names + `   `, inline: true}, // wtf why can't i add spacing, 
            { name: 'Points Amassed', value: points, inline: true} // FIXME ?
        )

        await msg.channel.send({ embeds: [embed] });
   }
}