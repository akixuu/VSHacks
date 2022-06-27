const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
 const StopWatch = require('stopwatch-js')
const rowStart = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('start')
					.setLabel('Start Timer')
					.setStyle('PRIMARY'),
                
                new MessageButton()
					.setCustomId('stop')
					.setLabel('Stop Timer')
					.setStyle('DANGER')
                    .setDisabled(true)
		);
        const rowStop = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('start')
					.setLabel('Start Timer')
					.setStyle('PRIMARY'),
                
                new MessageButton()
					.setCustomId('stop')
					.setLabel('Stop Timer')
					.setStyle('DANGER')
                    .setDisabled(true)
		);
        const rowDisabled = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('start')
					.setLabel('Start Timer')
					.setStyle('PRIMARY')
                    .setDisabled(true),
                
                new MessageButton()
					.setCustomId('stop')
					.setLabel('Stop Timer')
					.setStyle('DANGER')
                    .setDisabled(true)
		);

module.exports = {
    name: 'studytime',
    description: 'menu options to start, stop, pause studytimer',
    use:'studyoptions',
    
    execute: async(client, msg, args) => {

        embed = new MessageEmbed()
        .setColor(msg.member.displayHexColor)
        .setTitle('StudyTimer!')
        .setTimestamp()
        .setAuthor({ name: (`Requested by user ${msg.author.tag}.`), iconURL: msg.author.displayAvatarURL})
        .setDescription( `Log your studytime, keep friends accountable, and compete with other students!`);
        msg.channel.send({ embeds: [embed], components: [rowStart] });
        // optional set your goals.

        client.on('interactionCreate', (interaction) => {
	        if (!interaction.isButton()) return;
            const filter = i => i.user.id === msg.author.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 259200 });

            collector.on('collect', async (i) => {
            
            	if (interaction.customId === 'start') {
            		// await interaction.update({ content: 'Timer has started...!', components: [] });
                    stopWatch = new StopWatch();
                    stopWatch.start();
                    embed.setTitle('StudyTimer | Timer has started...')
                    await i.update({ embeds: [embed], components: [rowStop] })
            	}
    
                if (interaction.customId === 'stop') {
                    stopWatch.stop()
                    embed.setTitle('StudyTimer | Timer has stopped!').setDescription(`You gained +${Math.round(stopWatch.duration())} points (measured seconds) from this study session!`)
                    await i.update({ embeds: [embed], components: [rowDisabled] })
            	}
            });
        });
        
    }
}