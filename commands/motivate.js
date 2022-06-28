module.exports = {
    name: 'motivate',
    description: 'receive a inspirational quote!', 
    use:'motivate',
    
    execute: async(client, msg, args) => {
        const fetch = require('node-fetch')
        const url = 'https://zenquotes.io/api/random/'
        const response = await fetch(url);
        const data = await response.json();

        // send data out with as a embed
        const { MessageEmbed } = require('discord.js');
        
        embed = new MessageEmbed()
        .setColor('#FFFF00')
        .setTitle(data[0]['q'])
        .setFooter(`-${data[0]['a']} | zenquotes.io`);

        await msg.channel.send({ embeds: [embed] });
    }
}