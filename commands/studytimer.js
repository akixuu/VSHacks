const { MessageEmbed, MessageActionRow, MessageButton, Modal, TextInputComponent } = require('discord.js');
const StopWatch = require('stopwatch-js')

// button setups
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

const mongoose = require('mongoose')

module.exports = {
    name: 'studytimer',
    description: 'menu options to start, stop, pause studytimer',
    use:'studyoptions',
    
    execute: async(client, msg, args) => {
        embed = new MessageEmbed()
        .setColor(msg.author.displayHexColor)
        .setTitle('Study Timer')
        .setTimestamp()
        .setThumbnail(process.env.SMALL_LOGO_URL)
        .setAuthor({ name: (`Requested by user ${msg.author.tag}.`), iconURL: msg.author.displayAvatarURL()})
        .setDescription( `Log time studied, keep friends accountable, and compete with other students!`);
        msg.channel.send({ embeds: [embed], components: [rowStart] });

        // FIXME: err when multiple sessions
        client.on('interactionCreate', async interaction => {
           if(interaction.user.id != msg.author.id) return;

            if (interaction.customId === 'goalSetModal') {
                embed.addField('🌟 Session Goals', interaction.fields.getTextInputValue('goalsInput'))
                await interaction.update({ embeds: [embed] })
            }

            if (interaction.customId === 'goals') {
                const modal = new Modal()
                    .setCustomId('goalSetModal')
                    .setTitle('🌟 Set your goals!');
                    
                const goalsInput = new TextInputComponent()
                    .setCustomId('goalsInput')
                    .setLabel("What would you like to work on today?")
                    .setStyle('PARAGRAPH')
                    .setRequired(true);

                const actionRow = new MessageActionRow()
                    .addComponents(goalsInput);
                
                modal.addComponents(actionRow);

                await interaction.showModal(modal);
            }

            if (interaction.customId === 'start') {
                    stopWatch = new StopWatch();
                    stopWatch.start();
                    embed.setTitle('Study Timer | Timer has started...')
                    await interaction.update({ embeds: [embed], components: [rowStop] })
            }
            
            if (interaction.customId === 'stop') {
                
                stopWatch.stop()
                
                embed.setTitle('Study Timer | Timer has stopped!').setDescription(`You gained +${Math.round(stopWatch.duration())} points (measured seconds) from this study session - good work!`);
                await interaction.update({ embeds: [embed], components: [] })
                
                //TODO: update db
                

                const StudyTimeModel = require('../schemas/StudyTimeSchema.js')

                const exists = await StudyTimeModel.findOne({ userId: msg.author.id })

                if (exists) { 
                    // update pre-existing user values
                    await StudyTimeModel.updateOne(  { userId: msg.author.id} , { $set: { pointsAmassed: exists.pointsAmassed + stopWatch.duration() } })
                } 
                else { // accomodate new user in database
                    await StudyTimeModel.create({
                        userId: msg.author.id,
                        pointsAmassed: stopWatch.duration()
                    });
                }
                
            }	
        })
    } //end of execute
}