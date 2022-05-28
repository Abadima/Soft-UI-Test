const { inspect } = require('util')

module.exports = {
    name: 'eval',
    description: "This command is used to execute code in the bot's environment.",
    category: 'Test Commands',
    ownerOnly: true,
    slash: true,
    options: [{
        name: "code",
        description: 'Test Code ;)',
        required: true,
        type: 3
    }],

    callback: async ({ interaction, instance, args }) => {
        await interaction.deferReply();

        try {
            evaled = await eval(args[0].substring(0, 1024))
            const res = typeof evaled === 'string' ? evald : inspect(evaled, {
                depth: 0
            }); interaction.editReply({
                embeds: [{
                    color: "BLURPLE",
                    title: "Success",
                    fields: [{
                        name: "JavaScript Code",
                        value: `${args[0].substring(0, 1024)}`
                    }, {
                        name: "Response",
                        value: `${res.substring(0, 1024)}`
                    }]
                }], ephemeral: false
            })
        } catch (error) {
            if (`${error}` === "ReferenceError: evald is not defined") {
                try {
                    let results = await eval(args[1])
                    interaction.editReply({
                        embeds: [{
                            color: "BLURPLE",
                            title: "Success",
                            fields: [{
                                name: "JavaScript Code",
                                value: `${args[0].substring(0, 1024)}`
                            }, {
                                name: "Response",
                                value: `${results.substring(0, 1024)}`
                            }]
                        }], ephemeral: false
                    })
                } catch (error) {
                    interaction.editReply({
                        embeds: [{
                            color: '#ff0000',
                            title: "Failure",
                            fields: [{
                                name: "JavaScript Code",
                                value: `${args[0].substring(0, 1024)}`
                            }, {
                                name: "Error Response",
                                value: `${error.substring(0, 1024)}`
                            }]
                        }], ephemeral: false
                    })
                }
            } else {
                interaction.editReply({
                    embeds: [{
                        color: '#ff0000',
                        title: "Failure",
                        fields: [{
                            name: "JavaScript Code",
                            value: `${args[0].substring(0, 1024)}`
                        }, {
                            name: "Error Response",
                            value: `${error.toString().substring(0, 1024)}`
                        }]
                    }], ephemeral: false
                })
            }
        }
    }
}