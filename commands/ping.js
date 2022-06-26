module.exports = {
    name: 'ping',
    description: 'test command',
    use:'ping',
    
    execute: async(client, msg, args) => {
        msg.channel.send("Calculating ping...").then((resultMessage) => {
            resultMessage.edit(`Bot latency: ${resultMessage.createdTimestamp-msg.createdTimestamp}ms, API Latency: ${client.ws.ping}ms`)
        });
    }
}