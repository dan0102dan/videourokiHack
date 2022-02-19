import axios from 'axios'
import cheerio from 'cheerio'

export default async (id, user, grade) => {
	const { data: test } = await axios.post(
		`https://videouroki.net/tests/api/beginTest/${id}/`,
		{ 'member': { 'id': false, 'firstname': user.split(' ')[0], 'lastname': user.split(' ')[1], 'classTxt': grade } }
	)
	if (test.errors) throw test

	let { data: fullTest } = await axios.post(`https://videouroki.net/tests/do/${test.uuid}/`)
	const $ = cheerio.load(fullTest)
	for (let i = 0; i < $('body > script').length; i++)
		try {
			fullTest = JSON.parse($('body > script').get()[i].children[0].data.replace('window.backend = ', ''))
		}
		catch { continue }

	return fullTest
}