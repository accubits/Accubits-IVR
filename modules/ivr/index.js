const VoiceResponse = require('twilio').twiml.VoiceResponse;


const welcome = async (req, res, next) => {

    try {

        const voiceResponse = new VoiceResponse();

        const gather = voiceResponse.gather({
            action: '/ivr/menu',
            numDigits: '1',
            method: 'POST',
        });

        gather.say(
            'Thank you for calling Accubits Technologies. If you know your party’s extension, please dial it at any time. ' +
            'To speak with our sales representative,   press 1 ,' +
            'To speak with Ops,   press 2 ,' +
            'To speak with finances,   press 3 ,' +
            'To reach the HR department,   press 4 ,' +
            'To reach the marketing department,   press 5 ,' +
            'To reach the research and development,   press 6 ,' +
            'To speak with our support team,   press 7 ,' +
            'For general queries,   press 0 ,' +
            'Press 9 to repeat the menu.', {
                voice: 'woman',
                language: 'en-US'
            }
        );

        return res.send(voiceResponse.toString());
    } catch (e) {
        next(e)
    }

}

const menu = async (req, res, next) => {

    const digit = req.body.Digits;

    const optionActions = {
        '1': '+919400974733',
        '2': '+919400974733',
        '3': '+919400974733',
        '4': '+919400974733',
        '5': '+919400974733',
        '6': '+919400974733',
        '7': '+919400974733',
        '0': '+919400974733,'
    };

    if (optionActions[digit] && digit != '9') {
        const twiml = new VoiceResponse();
        twiml.dial(optionActions[digit]);
        return res.send(twiml.toString());
    }

    return res.send(redirectWelcome());

}

function redirectWelcome() {
    const voiceResponse = new VoiceResponse();

    const gather = voiceResponse.gather({
        action: '/ivr/menu',
        numDigits: '1',
        method: 'POST',
    });

    gather.say(
        'To speak with our sales representative,   press 1 ,' +
        'To speak with Ops,   press 2 ,' +
        'To speak with finances,   press 3 ,' +
        'To reach the HR department,   press 4 ,' +
        'To reach the marketing department,   press 5 ,' +
        'To reach the research and development,   press 6 ,' +
        'To speak with our support team,   press 7 ,' +
        'For general queries,   press 0 ,' +
        'Press 9 to repeat the menu.', {
            voice: 'man',
            language: 'en-US'
        }
    );

    return voiceResponse.toString();
}
module.exports = {
    welcome,
    menu
}