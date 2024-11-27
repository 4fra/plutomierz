function validateAndFormatMessage(message: string): { valid: boolean, formattedMessage?: string, error?: string } {
    const trimmedMessage = message.trim().replace(/\s+/g, ' ');

    if (trimmedMessage.length === 0) {
        return {valid: false, error: 'Message cannot be empty'};
    }

    if (trimmedMessage.length > 200) {
        return {valid: false, error: 'Message too long'};
    }

    return {valid: true, formattedMessage: trimmedMessage};
}

function validateAndFormatNickname(nickname: string): { valid: boolean, formattedNickname?: string, error?: string } {
    const trimmedNickname = nickname.trim().replace(/\s+/g, ' ');

    if (trimmedNickname.length === 0) {
        return {valid: false, error: 'Nickname cannot be empty'};
    }

    if (trimmedNickname.length > 16) {
        return {valid: false, error: 'Nickname too long'};
    }

    return {valid: true, formattedNickname: trimmedNickname};
}

export {validateAndFormatMessage, validateAndFormatNickname};