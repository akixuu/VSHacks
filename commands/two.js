const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'two',
    description: 'for testing purposes...',
    use:'test',

   execute: async (client, msg, args) => {
       const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('primary')
                        .setLabel('Primary')
                        .setStyle('PRIMARY'),
                    new MessageButton()
                        .setCustomId('other')
                        .setLabel('Other')
                        .setStyle('SECONDARY')
                );

       await msg.channel.send({content:'hi', components: [row]})
       
       client.on('interactionCreate', async interaction => {
           if(interaction.user.id!=msg.author.id) return;
           if (!interaction.isButton()) return;
           console.log(interaction) // when in doubt, console.log()
           
           if(interaction.customId==='primary') {
               await interaction.update({ content: 'Pong!', components: []})
           }
           if(interaction.customId==='other') {
               await interaction.update({ content: 'Other!', components: []})

           }
        })		
   } //end of execute
} // e