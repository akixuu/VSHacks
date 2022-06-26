module.exports = {
    name: 'trivia',
    description: 'test your intellect!',
    use:'trivia <topic>',
    
    execute: async(client, msg, args) => {
// TODO
        msg.channel.send("Generating...").then((resultMessage) => {
            resultMessage.edit(`placeholder question`)
        });
    }
}