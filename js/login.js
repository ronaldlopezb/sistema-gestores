document.addEventListener("DOMContentLoaded", () => {
	const form = document.getElementById("login-form");
	const emailInput = document.getElementById("login-email");
	const passwordInput = document.getElementById("login-password");
	const errorBox = document.getElementById("login-error");
	const submitButton = form.querySelector("button[type='submit']");
	const token = localStorage.getItem("auth_token");

	const showError = (message) => {
		errorBox.textContent = message;
		errorBox.classList.remove("d-none");
	};

	const hideError = () => {
		errorBox.textContent = "";
		errorBox.classList.add("d-none");
	};

	const validateToken = async () => {
		if (!token) {
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

			if (data && data.success === true) {
				window.location.href = "dashboard.php";
				return;
			}

			if (data && data.success === false) {
				localStorage.removeItem("auth_token");
				localStorage.removeItem("user_id");
				localStorage.removeItem("user_email");
				localStorage.removeItem("user_name");
			}
		} catch (error) {
			// No hacemos nada: si falla, se queda en login
		}
	};

	validateToken();

	form.addEventListener("submit", async (event) => {
		if (!form.checkValidity()) {
			return;
		}

		event.preventDefault();
		hideError();

		const email = emailInput.value.trim();
		const password = passwordInput.value;

		submitButton.disabled = true;
		const originalText = submitButton.textContent;
		submitButton.textContent = "Ingresando...";

		try {
			const response = await fetch("https://auto.myduomarkets.com/webhook/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					email,
					password
				})
			});

			const data = await response.json();

			if (!data || data.success !== true) {
				showError("Los datos son incorrectos.");
				return;
			}

			localStorage.setItem("auth_token", data.token || "");

			window.location.href = "dashboard.php";
		} catch (error) {
			showError("No se pudo iniciar sesion. Intenta de nuevo.");
		} finally {
			submitButton.disabled = false;
			submitButton.textContent = originalText;
		}
	});
});
