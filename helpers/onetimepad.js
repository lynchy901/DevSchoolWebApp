var onetimepad = {};

onetimepad.generateKey = function (length) {
    var key = [];
    console.log("HERE");

    for (var i = 0; i < length; i++) {
        var rand = Math.floor(Math.random() * 62) + 64;
        console.log(rand);
        key += String.fromCharCode(rand);     
    }
    return key;
};

onetimepad.oneTimePad = function (plainText, key) {
    var cipherText = [];

    for (var i = 0; i < plainText.length; i++) {
        cipherText.push(plainText.charCodeAt(i) ^ key.charCodeAt(i));
    }

    return cipherText;
};

onetimepad.oneTimePadDecrypt = function (cipherText, key) {
    var plainText = "";
    cipherText = cipherText.split(",");

    for (var i = 0; i < cipherText.length; i++) {
        plainText += String.fromCharCode(cipherText[i] ^ key.charCodeAt(i));
    }
    return plainText;
}

module.exports = onetimepad;