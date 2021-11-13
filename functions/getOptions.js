export default (answers) => {
	const variants = []

	for (let i = 1; i <= parseInt('1'.repeat(answers.length), 2); i++) {
		const variant = []

		for (const [index, value] of [...i.toString('2').padStart(answers.length, '0')].entries())
			if (value === '1')
				variant.push(answers[index].id)

		variants.push(variant)
	}

	return variants
}