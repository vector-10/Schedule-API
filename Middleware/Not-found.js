const notFound = ((req, res) => {
    res.status(404).send('Error 404 : the requested resource does not exist')
});

module.exports = notFound;