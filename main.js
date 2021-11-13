import { createTest, getOptions, getResults } from './functions/index.js'
import axios from 'axios'

const id = 5720182
const user = 'Антон Анатоль'
const grade = '11'

async function main () {
	const test = await createTest(id, user, grade)

	for (const question of JSON.parse(test.questions))
		try {
			if (question.answers.length) {
				// console.log('Внимание, вопрос:', question)
				console.log('Внимание, вопрос:', question.description, 'Варианты ответов:', question.answers, 'Тип:', question.type)

				const variants = getOptions(question) // получаем все возможные варианты, как можно ответить
				for (const variant of variants) {
					const test = await createTest(id, user, grade)
					// console.log('Пробую', variant)
					await axios.post(
						`https://videouroki.net/tests/api/save/${test.member.fakeId}/`,
						{
							'answer': {
								'id': question.id,
								'variants': variant.length > 1 ? variant : variant.at(0)
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