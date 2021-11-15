import { createTest, getOptions, getResults } from './functions/index.js'
import axios from 'axios'

const id = 9010022
const user = 'Антон Анатоль'
const grade = '11'

async function main () {
	const test = await createTest(id, user, grade)

	for (const question of JSON.parse(test.questions))
		try {
			// console.log('Внимание, вопрос:', question)
			console.log('Внимание, вопрос:', question.description, 'Тип:', question.type)

			const options = getOptions(question) // получаем все возможные варианты, как можно ответить
			for (const option of options) {
				const test = await createTest(id, user, grade)
				// console.log('Пробую', variant)
				await axios.post(
					`https://videouroki.net/tests/api/save/${test.member.fakeId}/`,
					{
						'answer': {
							'id': question.id,
							'variants': option.variant.length > 1 ? option.variant : option.variant.at(0)
						},
						'member': test.member
					}
				)

				const result = await getResults(test.member.uuid)
				if (result > 0) {
					console.log('Правильный ответ:', option.answer)
					break
				}
			}
		}
		catch (e) {
			console.log(e)
		}
	console.log('все, я спать...')
}

main()