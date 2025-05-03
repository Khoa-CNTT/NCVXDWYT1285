import db from "../models";

let createNewHandbook = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.nameHandbook
                || !data.timeToRead
                || !data.descriptionHTML
                || !data.imageBase64
                || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter!'
                })
            } else {
                await db.Handbook.create({
                    name: data.nameHandbook,
                    timeToRead: data.timeToRead,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
                })

                resolve({
                    errCode: 0,
                    errMessage: 'Create a new handbook succeed!'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllHandbook = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Handbook.findAll()
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

let getDetailHandbookById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter!'
                })
            } else {
                let data = await db.Handbook.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: [
                        'name', 'timeToRead', 'descriptionHTML', 'descriptionMarkdown', 'createdAt'
                    ]
                })
                if(!data) data={} 
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
    createNewHandbook,
    getAllHandbook,
    getDetailHandbookById
}