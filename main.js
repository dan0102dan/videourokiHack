import { createTest, getOptions, getResults } from './functions/index.js'
import axios from 'axios'

const id = '7135182'
const user = 'Антон Анатоль'
const grade = '11'

async function main () {
	const test = await createTest(id, user, grade)
	// console.log('Тест создан', test.member.uuid)

	for (const question of JSON.parse(test.questions))
		try {
			if (question.answers.length) {
				const variants = getOptions(question.answers) // получаем все возможные варианты, как можно ответить
				console.log('Внимание, вопрос:', question.description, question.answers)
				for (const variant of variants) {
					const test = await createTest(id, user, grade)
					// console.log('Пробую', variant)
					await axios.post(
						`https://videouroki.net/tests/api/save/${test.member.fakeId}/`,
						{
							'answer': {
								'id': question.id,
								'variants': variant.length > 1 ? variant : variant[0]
							},
							'member': test.member
						}
					)

					const result = await getResults(test.member.uuid)
					if (result > 0) {
						console.log('Правильный ответ:', variant)
						break
					}
				}
			}
		}
		catch (e) {
			console.log(e)
		}
}

main()