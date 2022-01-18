export default (question) => {
	const options = []

	switch (Number(question.type)) { // придумываю все возможные ситуации в зависимости от типа задания
		case 3:
			console.log('Я пока не умею отвечать на вопросы письменно(\n')
			break
		case 4:
			for (let variant = 1; variant <= Number(''.padStart(question.answers.length, JSON.parse(question.annotation).length.toString())); variant++)
				if (variant.toString().length === question.answers.length && [...variant.toString()].every(e => Array.from({ length: JSON.parse(question.annotation).length }, (_, i) => i + 1).includes(Number(e)))) {
					const option = { variant: [], answer: [] }

					for (const [index, value] of [...variant.toString()].entries()) {
						const answer = question.answers.at(index)

						option.variant.push({ 'answer_id': answer.id, 'answer': Number(value) })
						option.answer.push({ 'judgment': answer.text, 'answer': JSON.parse(question.annotation).at(Number(value) - 1).text })
					}

					options.push(option)
				}
			break
		case 5:
			for (let variant = 1; variant <= Number(''.padStart(question.answers.length, question.answers.length.toString())); variant++)
				if (variant.toString().length === question.answers.length && ![...variant.toString()].some((e, i) => [...variant.toString()].indexOf(e) != i) && [...variant.toString()].every(e => Array.from({ length: question.answers.length }, (_, i) => i + 1).includes(Number(e)))) {
					const option = { variant: [], answer: [] }

					for (const [index, value] of [...variant.toString()].entries()) {
						const answer = question.answers.at(index)

						option.variant.push({ 'answer_id': answer.id, 'answer': Number(value) })
						option.answer.push({ 'judgment': answer.text, 'answer': Number(value) })
					}

					options.push(option)
				}
			break
		case 6:
			for (let i = 1; i <= parseInt('1'.repeat(question.answers.length), 2); i++) { // перебираю вопросы через "двоичную" систему счисления
				const option = { variant: [], answer: [] }

				for (const [index, value] of [...i.toString(2).padStart(question.answers.length, '0')].entries()) {
					const answer = question.answers.at(index)

					option.variant.push({ 'answer_id': answer.id, 'answer': Number(value) })
					option.answer.push({ 'judgment': answer.text, 'answer': Number(value) })
				}

				options.push(option)
			}
			break
		default:
			for (let i = 1; i <= parseInt('1'.repeat(question.answers.length), 2); i++) { // перебираю вопросы через "двоичную" систему счисления
				const option = { variant: [], answer: [] }

				for (const [index, value] of [...i.toString(2).padStart(question.answers.length, '0')].entries())
					if (value === '1') {
						const answer = question.answers.at(index)

						option.variant.push(answer.id)
						option.answer.push(answer.text)
					}

				options.push(option)
			}
			break
	}

	return options
}