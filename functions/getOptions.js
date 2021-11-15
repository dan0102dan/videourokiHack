export default (question) => {
	const options = []

	switch (Number(question.type)) { // придумываю все возможные ситуации в зависимости от типа задания
		case 3:
			console.log('Я пока не умею отвечать на вопросы письменно(')
			break
		// case 4:
		// case 5:
		// 	for (let i = 0; i < question.answers.length; i++) {
		// 		const option = { variant: [], answer: [] }

		// 		for (let index = 0; index < JSON.parse(question.annotation).length; index++) {
		// 			console.log(index)
		// 			const answer = question.answers.at(index)

		// 			option.variant.push({ 'answer_id': answer.id, 'answer': Number(i) + 1 })
		// 			option.answer.push({ 'judgment': answer.text, 'answer': Number(i) + 1 })
		// 		}

		// 		options.push(option)
		// 	}
		// 	break
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