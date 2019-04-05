function randomString(length_) {
    let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz'.split('');
    if (typeof length_ !== "number") {
        length_ = Math.floor(Math.random() * chars.length_);
    }
    var str = '';
    for (var i = 0; i < length_; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function toast(title, text, type, timeout) {
    VanillaToasts.create({
        title,
        text,
        type,
        timeout
    });
}