const { getProjectDetails } = require('../../services/notion')

module.exports = async (req, res) => {
	try {
		const {
			query: { page_id },
		} = req
		const result = await getProjectDetails(page_id)
		res.json(result)
	} catch (error) {
		res.status(500).send('Server Error')
	}
}
