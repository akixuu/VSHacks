module.exports = {
    name: 'studytime',
    description: 'start, stop, pause studytimer',
    use:'rank <@user>',
    
    execute: async(client, msg, args) => {
        if(args.length<2 || !(['start','stop','pause'].contains(args[1]))) {
            return msg.channel.send('Invalid arguments, use \'.studytime <start/stop/pause>\'')
        }

        // get time
        // update db
        
    }
}