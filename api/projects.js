const { getProjectDetails, getProjects } = require('../services/notion')

module.exports = async (req, res) => {
	try {
		if (!req.params) {
			const projects = await getProjects()
			res.json(projects)
		} else {
			const { pageId } = req.params
			const result = await getProjectDetails(pageId)
			res.json(result)
		}
	} catch (error) {
		res.status(500).send('Server Error')
	}
}
