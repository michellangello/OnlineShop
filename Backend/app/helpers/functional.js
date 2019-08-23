
const wrap = f => async (req, res) => {
    const { status = 200, headers = {}, body = {} } = await f(req);
    res.status(status).set(headers).json(body);
};

module.exports = {
    wrap
}