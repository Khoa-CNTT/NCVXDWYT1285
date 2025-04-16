import db from "../models";

let createNewClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name
                || !data.address
                || !data.descriptionHTML
                || !data.imageBase64
                || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter!'
                })
            } else {
                await db.Clinic.create({
                    name: data.name,
                    address: data.address,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
                })

                resolve({
                    errCode: 0,
                    errMessage: 'Create a new specialty succeed!'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllClinic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinic.findAll()
            if (data && data.length) {
                data.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary')
                    return item
                })
            }
            resolve({
                errCode: 0,
                errMessage: 'OK',
                data
            })
        } catch (e) {
            reject(e)
        }
    })
}

let getDetailClinicById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter!'
                })
            } else {
                //find doctor location = ALL
                let data = await db.Clinic.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: [
                        'name', 'address', 'descriptionHTML', 'descriptionMarkdown', 
                    ]
                })
                if (data) {
                    let doctorClinic = []
                    doctorClinic = await db.Doctor_Info.findAll({
                        where: {
                            clinicId: inputId
                        },
                        attributes: [
                            'doctorId', 'provinceId'
                        ]
                    })
                    data.doctorClinic = doctorClinic
                } else data = {}
                resolve({
                    errCode: 0,
                    errMessage: 'OK',
                    data
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createNewClinic, getAllClinic, getDetailClinicById
}