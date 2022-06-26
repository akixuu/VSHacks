module.exports = {
    name: 'ping',
    description: 'test command',
    
    execute: async(msg, args) => {
        msg.channel.send('poop')
        // `Websocket Latency: ${client.ws.ping}ms\nBot Latency: ${Date.now() - interaction.createdTimestamp}ms`
    }
}