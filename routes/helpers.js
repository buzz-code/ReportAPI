function say(text) {
    return {
        type: "say",
        payload: text,
    };
}

function ask(text, params) {
    return {
        type: "ask",
        payload: { text, params },
    };
}

function hangup() {
    return {
        type: "hangup",
    };
}

module.exports = { say, ask, hangup };
