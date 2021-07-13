const router = require('express').Router()
const { getProjectDetails, getProjects } = require('./services/notion')

router.get('/', async (_, res) => {
	try {
		const projects = await getProjects()
		res.json(projects)
	} catch (error) {
		res.status(500).send('Server Error')
	}
})

router.get('/:pageId', async (req, res) => {
	try {
		const { pageId } = req.params
		const result = await getProjectDetails(pageId)
		res.json(result)
	} catch (error) {
		res.status(500).send('Server Error')
	}
})

module.exports = router
