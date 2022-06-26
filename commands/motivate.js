module.exports = {
    name: 'motivate',
    description: 'receive a inspirational quote!', 
    use:'motivate',
    
    execute: async(client, msg, args) => {
        const fetch = require('node-fetch')
        const response = await fetch('https://zenquotes.io/api/random/');
        const data = await response.json();
        
        const { MessageEmbed } = require('discord.js');

        embed = new MessageEmbed()
        .setColor('#FFFF00')
        .setTitle(data[0]['q'])
        .setFooter(`-${data[0]['a']} | zenquotes.io`);
        msg.channel.send({ embeds: [embed] });
    }
}