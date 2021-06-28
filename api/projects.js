const { getProjects } = require('../services/notion')

module.exports = async (req, res) => {
	try {
		const projects = await getProjects()
		res.json(projects)
	} catch (error) {
		res.status(500).send('Server Error')
	}
}
