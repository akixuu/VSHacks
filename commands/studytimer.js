const { MessageEmbed, MessageActionRow, MessageButton, Modal, TextInputComponent } = require('discord.js');
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
                    .setDisabled(true),

                new MessageButton()
					.setCustomId('goals')
					.setLabel('Session Goals')
					.setStyle('SECONDARY')
		);
        const rowStop = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('start')
					.setLabel('Start Timer')
					.setStyle('PRIMARY')
                    .setDisabled(true),
                
                new MessageButton()
					.setCustomId('stop')
					.setLabel('Stop Timer')
					.setStyle('DANGER'),

                new MessageButton()
					.setCustomId('goals')
					.setLabel('Session Goals')
					.setStyle('SECONDARY')
                    
		);
module.exports = {
    name: 'studytimer',
    description: 'menu options to start, stop, pause studytimer',
    use:'studyoptions',
    
    execute: async(client, msg, args) => {
        embed = new MessageEmbed()
        .setColor(msg.author.displayHexColor)
        .setTitle('StudyTimer')
        .setTimestamp()
            .setThumbnail(process.env.SMALL_LOGO_URL)
        .setAuthor({ name: (`Requested by user ${msg.author.tag}.`), iconURL: msg.author.displayAvatarURL()})
        .setDescription( `Log time studied, keep friends accountable, and compete with other students!`);
        msg.channel.send({ embeds: [embed], components: [rowStart] });
        // optional set your goals

        // err when multiple sessions
        client.on('interactionCreate', async interaction => {
           if(interaction.user.id != msg.author.id) return;
           if (!interaction.isButton()) return;
           // console.log(interaction) // when in doubt, console.log()

            if (interaction.customId === 'goalSetModal') {
                emb.addField('🌟 Session Goals', interaction.fields.getTextInputValue('goalsInput'))
                await interaction.update({ embeds: [embed], components: [rowStop] })
            }
            if (interaction.customId === 'goals') {
                const modal = new Modal()
                    .setCustomId('goalSetModal')
                    .setTitle('🌟 Set your goals!');
                    
                const goals = new TextInputComponent()
                    .setCustomId('goalsInput')
                    .setLabel("What would you like to work on or complete during this study session?")
                    .setStyle('PARAGRAPH');

                const actionRow = new MessageActionRow()
                    .addComponents(modal);
                modal
                    .addComponents(actionRow);
                await interaction.showModal(modal);
                
            }
            if (interaction.customId === 'start') {
            		// await interaction.update({ content: 'Timer has started...!', components: [] });
                    stopWatch = new StopWatch();
                    stopWatch.start();
                    embed.setTitle('StudyTimer | Timer has started...')
                    await interaction.update({ embeds: [embed], components: [rowStop] })
            	}
            if (interaction.customId === 'stop') {
                stopWatch.stop()
                embed.setTitle('StudyTimer | Timer has stopped!').setDescription(`You gained +${Math.round(stopWatch.duration())} points (measured seconds) from this study session - good work!`);
                await interaction.update({ embeds: [embed], components: [] })
            }	
        })
    } //end of execute
}