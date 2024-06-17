export default function generateRandomPassword() {
	const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
	const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const numbers = '0123456789';
	const symbols = '!@#$%^&*()_+';

	const allCharacters = lowerCaseLetters + upperCaseLetters + numbers + symbols;
	let password = '';

	password += lowerCaseLetters.charAt(
		Math.floor(Math.random() * lowerCaseLetters.length),
	);
	password += upperCaseLetters.charAt(
		Math.floor(Math.random() * upperCaseLetters.length),
	);
	password += numbers.charAt(Math.floor(Math.random() * numbers.length));
	password += symbols.charAt(Math.floor(Math.random() * symbols.length));

	for (let i = 4; i < 8; i++) {
		password += allCharacters.charAt(
			Math.floor(Math.random() * allCharacters.length),
		);
	}

	return password
		.split('')
		.sort(() => 0.5 - Math.random())
		.join('');
}
