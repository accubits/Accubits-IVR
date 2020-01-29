const {
    getNumber
} = require("../number/number-service")
const {
    getIVRs
} = require('./ivr-service')
const VoiceResponse = require('twilio').twiml.VoiceResponse;


const welcome = async (req, res, next) => {

    try {

        const voiceResponse = new VoiceResponse();

        const gather = voiceResponse.gather({
            action: '/ivr/menu',
            numDigits: '1',
            method: 'POST',
        });


        const numberData = await getNumber(req.body.Called)

        let welcomeMsg = numberData.welcomeMessage;
        let ivrMsg = numberData.ivrMessage;
        let endMsg = "Press 9 to repeat the menu."
        let introMsg = welcomeMsg + " " + ivrMsg + " " + endMsg;

        gather.say(
            introMsg, {
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
    const phone = req.body.Called;
    const getIVRNumbers = await getIVRs(phone, digit)


    if (getIVRNumbers.length && digit != '9') {
        const twiml = new VoiceResponse();
        const dial = twiml.dial();

        getIVRNumbers.forEach(num => {
            dial.number(num.dataValues.userInfo.phoneNo)
        });
        return res.send(twiml.toString());
    }

    let ivrMsg = getIVRNumbers.dataValues.numberInfo.ivrMessage;
    let endMsg = "Press 9 to repeat the menu."
    var menuMsg = ivrMsg + " " + endMsg;

    return res.send(redirectWelcome(menuMsg));

}

function redirectWelcome(menuMsg) {
    const voiceResponse = new VoiceResponse();

    const gather = voiceResponse.gather({
        action: '/ivr/menu',
        numDigits: '1',
        method: 'POST',
    });

    gather.say(
        menuMsg, {
            voice: 'woman',
            language: 'en-US'
        }
    );

    return voiceResponse.toString();
}
module.exports = {
    welcome,
    menu
}