const texts = require("./texts");
const { Teacher } = require("../models");
const {say, ask, hangup} = require('./helpers')

async function logRequest(body) {
    console.log(body);
    return Promise.resolve(body);
}

async function chooseMosad(body) {
    const { ApiPhone, mosad } = body;
    if (mosad) {
        return Promise.resolve(body);
    }
    const data = await Teacher.find({ phone: ApiPhone }).populate("mosad").lean();
    if (data.length === 0) {
        return Promise.reject([say(texts.phoneNumberNotRecognized), hangup()]);
    } else if (data.length === 1) {
        body.mosad = 0;
        return Promise.resolve(body);
    } else {
        const message = [texts.chooseMosad];
        data.forEach((item, index) => {
            message.push(`${item.mosad.name} ${texts.pushButton} ${index + 1}`);
        });
        return Promise.reject(ask(message.join(", "), `mosad,yes,1,${data.length.toString().length},7,No,yes,no`));
    }
}

async function chooseKlass(body) {
    const { ApiPhone, mosad, klass } = body;
    if (klass) {
        return Promise.resolve(body);
    }
    const teachers = await Teacher.find({ phone: ApiPhone }).populate("klasses").lean();
    const item = teachers[parseInt(mosad) - 1];
    const data = item.klasses;

    if (!data || data.length === 0) {
        return Promise.reject([say(texts.noKlassesForTeacher), hangup()]);
    } else if (data.length === 1) {
        body.klass = 0;
        return Promise.resolve(body);
    } else {
        const message = [texts.chooseKlass];
        data.forEach((item, index) => {
            message.push(`${item.name} ${texts.pushButton} ${index + 1}`);
        });
        return Promise.reject(ask(message.join(", "), `klass,yes,1,${data.length.toString().length},7,No,yes,no`));
    }
}

async function endRequest(body) {
    return Promise.reject([say(texts.endOfRequest), hangup()]);
}

module.exports = [logRequest, chooseMosad, chooseKlass, endRequest];
