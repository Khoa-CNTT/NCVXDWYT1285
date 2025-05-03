
let handleMomoPayment = async (req, res) => {
    try {
        // let info = await handbookService.createNewHandbook(req.body)
        return res.status(200).json({})
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!'
        })
    }
}

module.exports = {
    handleMomoPayment
}