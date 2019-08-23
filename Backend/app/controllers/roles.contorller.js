const Roles = require('../schemas/role')
const { wrap } = require('../helpers/functional')


const getRoles = wrap(async req => {

    const roles = await Roles.find({})
        .select('roles.phone client.email orderdetails.status reference')
        .exec();

    return { body: roles };
})


module.exports = {
    getRoles
}