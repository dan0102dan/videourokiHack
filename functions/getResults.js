import axios from 'axios'
import cheerio from 'cheerio'

export default async (uuid) => {
	const result = []

	const { data } = await axios.get(`https://videouroki.net/tests/complete/${uuid}/`)
	const $ = cheerio.load(data)
	$('div[class="test_main__results_stat"]').find('div > div > span > b').each((i, el) => {
		result.push($(el).text())
	})

	return Number(result[3])
}