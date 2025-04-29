const captainModel = require('../models/captain.model');


module.exports.createCaptain = async ({
    firstname, lastname, email, password, vehicleNo, plate, capacity, vehicleType
}) => {
    if (!firstname || !email || !password || !vehicleNo || !plate || !capacity || !vehicleType) {
        throw new Error('All fields are required');
    }
    const captain = captainModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            vehicleNo,
            plate,
            capacity,
            vehicleType
        }
    })

    return captain;
}