const getUniqueErrorMessage = (err) => {
    let output

    try {
        let fieldName = err.message.substring(err.mesage.lastIndexOf('.$') + 2, err.message.lastIndexOf('_1'))
        output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + 'already exists'
    } catch (err) {
        output = "Unique field already exists"
    }

    return output
}

const getErrorMessage = (err) => {
    let error = ''
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                error = getUniqueErrorMessage(err)
            default:
                error = "Something went wrong"
        }
    } else {
        for(let errName in err.errors) {
            if (err.errors[errName].message) {
                error = err.errors[errName].message
            }
        }
    }

    return error
}

module.exports = { getErrorMessage, getUniqueErrorMessage }