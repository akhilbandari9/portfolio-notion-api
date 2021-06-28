// req('dotenv').config()
const { Client } = require('@notionhq/client')
// const util = require('util')
const notion = new Client({ auth: process.env.NOTION_API_SECRET })
const databseId = process.env.NOTION_DATABASE_ID

async function getProjects() {
	const { results } = await notion.databases.query({
		database_id: databseId,
	})

	const projectsData = results.map((item) => {
		let tagsArr = item.properties.Tags.multi_select.map((tagObj) => {
			return {
				name: tagObj.name,
				color: tagObj.color,
			}
		})

		return {
			page_id: item.id,
			created_time: item.created_time,
			last_edited_time: item.last_edited_time,
			properties: {
				tags: tagsArr,
				started: item.properties.Started.date,
				live_demo: item.properties['Live Demo'].url,
				github_repo: item.properties['Github Repo'].url,
				project_name: item.properties['Project Name'].title[0].plain_text,
			},
		}
	})
	// console.log(util.inspect(projectsData, false, null, true))
	return projectsData
}

const getProjectDetails = async (pageId) => {
	const { results } = await notion.blocks.children.list({
		block_id: pageId,
	})

	const blocksData = results.map((item) => {
		return {
			block_id: item.id,
			has_children: item.has_children,
			type: item.type,
			text: item.paragraph.text[0].plain_text,
		}
	})
	// console.log(util.inspect(blocksData, false, null, true))
	return { blocksData }
}

module.exports = { getProjects, getProjectDetails }
