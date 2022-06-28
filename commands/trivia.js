module.exports = {
    // https://the-trivia-api.com/docs/
    name: 'trivia',
    description: 'test your intellect!',
    use:'trivia <topic>',
    
    execute: async(client, msg, args) => {
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
~        options.push(answer)

        // const Math = required('math')
        // const shuffledArray = array.sort((a, b) => 0.5 - Math.random());
        // naaah nobody's gonna see it anyways

        
        // prompt question
        const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

        // bad implementation
        // FIXME: bug
        const row = new MessageActionRow().addComponents(
        new MessageButton()
            .setLabel(options[0])
            .setStyle('SUCESS')
            .setCustomId(options[0]),
        new MessageButton()
            .setLabel(options[1])
            .setStyle('SUCCESS')
            .setCustomId(options[1]),
        new MessageButton()
            .setLabel(options[2])
            .setStyle('SUCCESS')
            .setCustomId(options[2]),
        new MessageButton()
            .setLabel(options[3])
            .setStyle('SUCCESS')
            .setCustomId(options[3])
        );
    
        msg.channel.send({ 
            content: "Choose your answer: ",
            components: [row]
        });
    }
}