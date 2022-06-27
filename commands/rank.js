module.exports = {
    name: 'rank',
    description: 'find study time rank of a user',
    use:'rank <@user>',
    
    execute: async(client, msg, args) => {
        if(args.length<2 || !(args[1].startsWith('<@') && args[1].endsWith('>'))) {
            return msg.channel.send('Invalid arguments, use \'.rank <@user>\'')
        }

        // read from db
        // send data
        
    }
}