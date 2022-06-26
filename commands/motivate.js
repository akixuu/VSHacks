module.exports = {
    name: 'motivate',
    description: 'receive a inspirational quote!', 
    use:'motivate',
    
    execute: async(client, msg, args) => {
        const response = await fetch('https://zenquotes.io/api/random/');
        const data = await response.json();
        
        embed = discord.Embed(
            title = data[0]['q'])
            .set_footer(
                text = data[0]['a']);
        msg.channel.send(embed);
    }
}