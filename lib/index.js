const { createError } = require('micro')

const missingParameterMessage = 'The parameter {param} is missing'

module.exports = (parameters, validator, message = missingParameterMessage, required = true) => {
  const paramNames = Object.keys(parameters)
  paramNames.forEach(n => {
    if (!parameters[n] && required) {
      throw createError(409, missingParameterMessage.replace('{param}', n))
    }

    if (validator && !validator(parameters[n])) {
      throw createError(409, message.replace('{param}', n))
    }
  })
}
