import bcrypt from 'bcrypt'

const getId = (length) => {
    var result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    var counter = 0
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
      counter += 1
    }
    var date_ob = new Date()
    // adjust 0 before single digit date
    var date = ("0" + date_ob.getDate()).slice(-2)
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2)

    var year = date_ob.getFullYear()
    var hours = date_ob.getHours()
    var minutes = date_ob.getMinutes()
    var seconds = date_ob.getSeconds()
    var dateFormat = year + month + date + hours + minutes + seconds
    return dateFormat + result;
}

const getDateString = () => {
    // adjust 0 before single digit date
    var date_ob = new Date()
    var date = ("0" + date_ob.getDate()).slice(-2)
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2)

    var year = date_ob.getFullYear()
    var hours = date_ob.getHours()
    var minutes = ("0" + date_ob.getMinutes()).slice(-2)
    var seconds = ("0" + date_ob.getSeconds()).slice(-2)
    var dateFormat = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds
    return dateFormat
}

const encryptPassword = async (password) => {
    var saltRounds = 10
    return await bcrypt.hash(password, saltRounds)
}

export default {encryptPassword, getDateString, getId}