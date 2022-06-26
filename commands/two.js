module.exports = {
    name: 'two',
    description: 'placeholer two...',
    use:'two',

   execute: async (client, msg, args) => {
        msg.channel.send('pong')
   }
};