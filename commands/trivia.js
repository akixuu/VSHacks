const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

module.exports = { // TODO: FIX BAD IMPLEMENTAATION
    // https://the-trivia-api.com/docs/
    name: 'trivia',
    description: 'test your intellect!',
    use:'trivia <topic>',
    
    execute: async (client, msg, args) => {
        if(args.length!=2){
            return msg.channel.send("Invalid call, use: .trivia <topic>")
        }
        const topics = ['history', 'geography', 'general_knowledge', 'music', 'science', 'society_and_culture', 'arts_and_literature']
        if(!topics.includes(args[1])) {
            return msg.channel.send("Invalid topic, choose from " + topics);
        }
        const topic = args[1]
        
        const url = `https://the-trivia-api.com/api/questions?categories=${topic}&limit=1`;
        const fetch = require('node-fetch')

        const response = await fetch(url);
        const data = await response.json();

        // get values
        const question=data[0]['question'];
        const answer=data[0]['correctAnswer'];
        const options=data[0]['incorrectAnswers'];
~       options.push(answer)


        console.log(answer)

        options.sort(() => Math.random() - 0.5); // bad implementation but it's ok

        const answerIndex = options.indexOf(answer)

        // const shuffledArray = array.sort((a, b) => 0.5 - Math.random());
        // naaah nobody's gonna see it anyways
        const emojis=['🍎','🥝','🍋','🫐']


        let description=''
        for (let i = 0; i < 4; i++) { description+=`${emojis[i]} ${options[i]} \n`; }

        embed = new MessageEmbed()
            .setTitle(question)
            .setDescription(description)

        const sentMsg = await msg.channel.send({ embeds: [embed] });

        for (let i = 0; i < 4; i++) { await sentMsg.react(emojis[i]) }

        client.on("messageReactionAdd", async function(messageReaction, user){
            if(user.bot) return;

            let userSelection;
            for (let i = 0; i < 4; i++) { if(messageReaction._emoji.name==emojis[i]) userSelection=i; }

            sentMsg.reactions.removeAll()
            
            if(answerIndex == userSelection) {
                embed = new MessageEmbed()
                    .setTitle(question)
                    .setDescription(description+'\n**You\'re Right!**')
                await sentMsg.edit({ embeds: [embed] })
            } else {
                embed = new MessageEmbed()
                    .setTitle(question)
                    .setDescription(description+'\n**You\'re Wrong!**')
                await sentMsg.edit({ embeds: [embed] })
            }

        });

    }
}