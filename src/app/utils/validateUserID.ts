export default function validateUserID(userId: string) {
	const regex = /^[A-Za-z0-9]{4,16}$/;
	return regex.test(userId);
}
