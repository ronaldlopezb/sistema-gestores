document.addEventListener("DOMContentLoaded", async () => {
	const token = localStorage.getItem("auth_token");

	const clearSession = () => {
		localStorage.removeItem("auth_token");
		localStorage.removeItem("user_id");
		localStorage.removeItem("user_email");
		localStorage.removeItem("user_name");
	};

	const baseUrl = window.appBaseUrl || "";
	const redirectToLogin = () => {
		window.location.href = baseUrl + "/index.php";
	};

	if (!token) {
		clearSession();
		redirectToLogin();
		return;
	}

	try {
		const response = await fetch("https://auto.myduomarkets.com/webhook/api/auth/validate", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				token
			})
		});

		const data = await response.json();

		if (!data || data.success !== true) {
			clearSession();
			redirectToLogin();
		}
	} catch (error) {
		clearSession();
		redirectToLogin();
	}
});
