import { createTest, getOptions, getResults } from './functions/index.js'
import { test_id, username, grade } from './config.js'
import axios from 'axios'

async function main () {
	const { questions } = await createTest(test_id, username, grade)

	for (const question of JSON.parse(questions)) {
		console.log('Внимание, вопрос:', question.description, 'Тип:', question.type)

		const options = getOptions(question) // получаем все возможные варианты, как можно ответить
		for (const option of options) {
			const { member } = await createTest(test_id, username, grade)
			// console.log('Пробую', variant)
			await axios.post(
				`https://videouroki.net/tests/api/save/${member.fakeId}/`,
				{
					'answer': {
						'id': question.id,
						'variants': option.variant.length > 1 ? option.variant : option.variant.at(0)
					},
					'member': member
				}
			)

			const result = await getResults(member.uuid)
			if (result > 0) {
				console.log('Правильный ответ:', option.answer, '\n')
				break
			}
		}
	}
	console.log('все, я спать...')
}

main()