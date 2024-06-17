export default function handleAlertError(error: unknown) {
	if (error instanceof Error) {
		console.error(error.message);
		alert(error.message);
	} else {
		console.error(String(error));
	}
}
