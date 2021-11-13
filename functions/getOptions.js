export default (question) => {
	const variants = []

	for (let i = 1; i <= parseInt('1'.repeat(question.answers.length), 2); i++) {
		const variant = []

		for (const [index, value] of [...i.toString(2).padStart(question.answers.length, '0')].entries())
			switch (Number(question.type)) {
				case 6:
					variant.push({ 'answer_id': question.answers[index].id, 'answer': Number(value) })
					break
				case 4: {
					for (const [index, value] of [...i.toString(JSON.parse(question.annotation).length).padStart(question.answers.length, '0')].entries())
						variant.push({ 'answer_id': question.answers[index].id, 'answer': Number(value) + 1 })
					break
				}
				default:
					if (value === '1')
						variant.push(question.answers[index].id)
					break
			}
		variants.push(variant)
	}

	return variants
}