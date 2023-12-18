import { v4 as uuidv4 } from 'uuid'

function generateUniqueItemId () {
  return uuidv4()
}

export default generateUniqueItemId
