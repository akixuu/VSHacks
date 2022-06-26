module.exports = {
   name: 'two',
   description: 'placeholer two...',

   execute: async (msg, args) => {
        msg.channel.send('pong')
   }
};