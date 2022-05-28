module.exports = {
    name: 'date',
    description: "Indicates the colour selected by the user through Soft UI's Color Picker!",
    category: 'Test Commands',
    guildOnly: true,
    slash: true,

    callback: async ({ interaction, instance }) => {
        await interaction.deferReply();
        const db = instance._mongoConnection.models['guilds']
        const date = await db?.findOne({ _id: interaction.guild.id }).then(d => d?.date || null).catch(() => null)
        interaction.editReply({
            embeds: [{
                color: "BLURPLE",
                title: "Date Choices",
                description: `Wanna go on a date on \`${date.date}\`?`,
                fields: [{ name: "⚠️ Notice", value: `The community is \`${date.confidence}%\` confident` }]
            }]
        })
    }
}