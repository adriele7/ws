function toUTF8(text) {
    return Buffer.from(text, 'utf-8')
}

module.exports = {
    toUTF8
}