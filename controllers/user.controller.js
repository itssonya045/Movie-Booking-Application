const userService = require("../services/user.services")
const { successResponseBody, errorResponseBody } = require("../utils/resposebody")

const update = async( req , res) =>{
    try {
        
        const response = await userService.updateUserRoleorStatus(req.body , req.params.id)

        successResponseBody.data = response
        successResponseBody.message = "Successfully updated the user"

        return res.status(200).json(successResponseBody)
    } catch (error) {
        errorResponseBody.err = error
        res.status(500).json(errorResponseBody)
        
    }
}

module.exports ={
    update
}