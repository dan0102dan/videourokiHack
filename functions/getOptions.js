export default (question) => {
	const variants = []

	for (let i = 1; i <= parseInt('1'.repeat(question.answers.length), 2); i++) { // перебираю вопросы в "двоичной" системе счисления
		const variant = []

		switch (Number(question.type)) { // придумываю все возможные ситуации в зависимости от типа задания
			case 4:
			case 5:
				for (const [index, value] of [...i.toString(JSON.parse(question.annotation).length).padStart(question.answers.length, '0')].entries())
					variant.push({ 'answer_id': question.answers[index].id, 'answer': Number(value) + 1 })
				break
			case 6:
				for (const [index, value] of [...i.toString(2).padStart(question.answers.length, '0')].entries())
					variant.push({ 'answer_id': question.answers[index].id, 'answer': Number(value) })
				break
			default:
				for (const [index, value] of [...i.toString(2).padStart(question.answers.length, '0')].entries())
					if (value === '1')
						variant.push(question.answers[index].id)
				break
		}

		variants.push(variant)
	}

	return variants
}