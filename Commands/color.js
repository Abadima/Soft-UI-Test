module.exports = {
    name: 'color',
    description: "Indicates the colour selected by the user through Soft UI's Color Picker!",
    category: 'Test Commands',
    guildOnly: true,
    slash: true,

    callback: async ({ interaction, instance }) => {
        await interaction.deferReply();
        const db = instance._mongoConnection.models['guilds']
        const color = await db?.findOne({ _id: interaction.guild.id }).then(d => d?.color || null).catch(() => null)
        interaction.editReply({
            embeds: [{
                color: color.hex,
                title: "Color Choice",
                description: `The color selected by the user is \`${color.hex || '[NOT CHOSEN]'}\` \nDoes the community like the colour? \`${color.boolean}\``,
            }]
        }).catch(() => interaction.editReply({
            embeds: [{
                color: "BLURPLE",
                title: "Color Choice",
                description: `The color selected by the user is \`${color.hex || '[NOT CHOSEN]'}\` \nDoes the community like the colour? \`${color.boolean}\``,
                fields: [{ name: "⚠️ Problem", value: "The color selected by the user can't be used on Rich Embeds!" }]
            }]
        }))
    }
}