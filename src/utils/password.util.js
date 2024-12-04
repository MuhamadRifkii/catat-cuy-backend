const bcrypt = require('bcrypt')
const SALT_ROUND = 10

const encrypt = async (password)=>{
  return await bcrypt.hash(password, SALT_ROUND)
}

const compare = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword)
}

module.exports = {encrypt, compare}