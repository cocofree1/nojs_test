function regexMatchOptions(options){
    if(regexPhone(options.regex)){
        options.telephone = options.regex;
    } else if(regexEmail(options.regex)){
        options.email = options.regex;
    } else {
        options.user_name = options.regex;
    }
    delete options.regex;
    return options;
}

function regexPhone(str){
    const phoneRegex = /^1[3456789]\d{9}$/;
    if(!phoneRegex.test(str)){
        return false;
    }
    return true;
}

function regexEmail(str){
    const emailRegex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if(!emailRegex.test(str)){
        return false;
    }
    return true;
}

module.exports = {
    regexPhone,
    regexEmail,
    regexMatchOptions,
}