import userSevices from '../services/userSevices' 

let handleLogin = async (req, res) => {
    console.log("=============");
    try {
        let email = req.body.email
        let password = req.body.password

        if(!email || !password) {
            return res.status(500).json({
                errCode: 1,
                message: 'Missing inputs parameter!'
            })
        }

        let userData = await userSevices.handleUserLogin(email,password)

        return res.status(200).json({
            errCode: userData.errCode,
            message: userData.errMessage,
            user: userData.user ? userData.user : {}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: 1,
            message: 'Error from server!'
        })
    }   
}

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id //ALL, id
    if(!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameter',
            users: []
        })
    }

    let users = await userSevices.getAllUsers(id)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users
    })
}

let handleCreateNewUser = async (req, res) => {
    let message = await userSevices.createNewUser(req.body)
    return res.status(200).json(message)
}

let handleEditUser = async (req, res) => {
    let data = req.body
    let message = await userSevices.updateUserData(data)
    return res.status(200).json(message)

}

let handleDeleteUser = async (req, res) => {
    if(!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!"
        })
    }
    let message = await userSevices.deleteUser(req.body.id)
    return res.status(200).json(message)
}

let getAllCode = async (req, res) => {
    try{
        let data = await userSevices.getAllCodeService(req.query.type)
        return res.status(200).json(data)
    } catch (e) {
        console.log('Get all code error: ', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!'
        })
    }
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser, 
    handleDeleteUser: handleDeleteUser,
    getAllCode: getAllCode,
}