const fs = require('fs')
const path = require('path')
const HttpError = require('http-errors')
const { sendReq } = require('../services/pekaoExchangeService')
require('dotenv').config()

const TEMP_CATALOG = process.env.TEMP_CATALOG || path.join(__dirname, '..', '..', 'temp')

module.exports.getData = async function (request, _reply) {
  const { reqType, text, offset } = request.body
  const employeesFIOArray = request.body?.employeesFIOArray

  let answer
  let responseData

  if (offset === undefined || offset === 0) {
    answer = await sendReq(reqType, text, employeesFIOArray)
    if (!answer) {
      throw new HttpError[501]('Command execution failed')
    }
    if (offset === undefined) {
      return answer
    }
    await writeToTempFile(answer)
  } else {
    answer = await readFromFile()
  }

  const SLICE_SIZE = Number(process.env.SLICE_SIZE) || 50
  const startIndex = offset || 0
  const endIndex = startIndex + SLICE_SIZE
  responseData = {
    subdivisions: answer.subdivisions.slice(startIndex, endIndex),
    positions: answer.positions.slice(startIndex, endIndex),
    employees: answer.employees.slice(startIndex, endIndex)
  }

  return { answer: responseData }
}

