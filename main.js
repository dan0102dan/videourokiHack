import axios from 'axios'
import cheerio from 'cheerio'

const id = '7135182'
const user = 'Антон Анатоль'
const grade = '11'

const { data: test } = await axios.post(
	`https://videouroki.net/tests/api/beginTest/${id}/`,
	{ "member": { "id": false, "firstname": user.split(' ')[0], "lastname": user.split(' ')[1], "classTxt": grade } }
)
if (test.errors) throw test // если прилетела ошибка
console.log('тест создан', test.uuid)

let { data: fullTest } = await axios.post(`https://videouroki.net/tests/do/${test.uuid}/`)
const $ = cheerio.load(fullTest)
for (let i = 0; i < $('body > script').length; i++)
	try {
		fullTest = JSON.parse($('body > script').get()[i].children[0].data.replace('window.backend = ', ''))
	}
	catch {
		// console.log('не то')
	}

for (const question of JSON.parse(fullTest.questions))
	try {
		console.log('внимание, вопрос:', question.description, question.answers.length)
		if (question.answers) {
			const { data } = await axios.post(
				`https://videouroki.net/tests/api/save/${fullTest.member.fakeId}/`,
				{
					"answer": {
						"id": test.id,
						"variants": question.answers.map(answer => (
							{
								answer_id: answer.id,
								variants: 0
							}
						))
					},
					"member": fullTest.member
				}
			)
			console.log('ответ', data)

			let { data: result } = await axios.get(
				`https://videouroki.net/tests/complete/${test.uuid}/`
			)
			console.log('закончили', result)
		}
	}
	catch (e) {
		console.log(e)
	}