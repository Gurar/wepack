class Validator {
    static isValidSelector(param) {
        return param === null ? console.error('ERROR: selector no exist') +  false : true
    }

    static isString(param) {
        if(typeof param !== 'string' || param === null) {
            console.error('ERROr: value not a string');
            return false
        }

        if(param.length === 0) {
            console.error('ERROR: string empry');
            return false;
        }

        return true;
    }
}

export {Validator}