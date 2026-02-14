document.addEventListener("DOMContentLoaded", async () => {
	const token = localStorage.getItem("auth_token");
	const logoutButton = document.getElementById("logout-button");
	const logoutWebhookUrl = "https://auto.myduomarkets.com/webhook/api/auth/logout";

	const clearSession = () => {
		localStorage.removeItem("auth_token");
		localStorage.removeItem("user_id");
		localStorage.removeItem("user_email");
		localStorage.removeItem("user_name");
	};

	const redirectToLogin = () => {
		window.location.href = "index.php";
	};

	const handleLogout = async () => {
		if (logoutWebhookUrl) {
			try {
				await fetch(logoutWebhookUrl, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						token
					})
				});
			} catch (error) {
			}
		}

		clearSession();
		redirectToLogin();
	};

	if (logoutButton) {
		logoutButton.addEventListener("click", (event) => {
			event.preventDefault();
			handleLogout();
		});
	}

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
