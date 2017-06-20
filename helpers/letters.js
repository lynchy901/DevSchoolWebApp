var alphabet = {};
alphabet.alphabet = {
    'a': 0,
    'b': 1,
    'c': 2,
    'd': 3,
    'e': 4,
    'f': 5,
    'g': 6,
    'h': 7,
    'i': 8,
    'j': 9,
    'k': 10,
    'l': 11,
    'm': 12,
    'n': 13,
    'o': 14,
    'p': 15,
    'q': 16,
    'r': 17,
    's': 18,
    't': 19,
    'u': 20,
    'v': 21,
    'w': 22,
    'x': 23,
    'y': 24,
    'z': 25,
    '1': 26,
    '2': 27,
    '3': 28,
    '4': 29,
    '5': 30,
    '6': 31,
    '7': 32,
    '8': 33,
    '9': 34,
    '0': 35,
    ' ': 36
};

alphabet.shiftForwards = function(msgCharacter, keyCharacter) {
    var msgVal = alphabet.alphabet[msgCharacter];
    var keyVal = alphabet.alphabet[keyCharacter];

    if (msgVal + keyVal > 36) {
        return (msgVal + keyVal - 37);
    } else {
        return (msgVal + keyVal);
    }
};

alphabet.shiftBackwards = function(msgCharacter, keyCharacter) {
    var msgVal = alphabet.alphabet[msgCharacter];
    var keyVal = alphabet.alphabet[keyCharacter];

    if (msgVal - keyVal < 0) {
        return (msgVal - keyVal + 37);
    } else {
        return (msgVal - keyVal);
    }
};

alphabet.getCharacterByKey = function (keyToReturn) {
    for (var key in alphabet.alphabet) {
        if (alphabet.alphabet[key] == keyToReturn) {
            return key;
        }
    }
}

module.exports = alphabet;