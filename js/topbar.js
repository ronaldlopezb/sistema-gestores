document.addEventListener("DOMContentLoaded", () => {
	const token = localStorage.getItem("auth_token");
	const logoutButton = document.getElementById("logout-button");
	const logoutLinks = document.querySelectorAll("[data-logout='true']");
	const userName = document.getElementById("user-name");
	const userAvatar = document.getElementById("user-avatar");
	const embudosItem = document.getElementById("sidebar-embudos");
	const logoutWebhookUrl = "https://auto.myduomarkets.com/webhook/api/auth/logout";
	const userInfoWebhookUrl = "https://auto.myduomarkets.com/webhook/auth/userinfo";
	const baseUrl = window.appBaseUrl || "";

	const clearSession = () => {
		localStorage.removeItem("auth_token");
		localStorage.removeItem("user_id");
		localStorage.removeItem("user_email");
		localStorage.removeItem("user_name");
	};

	const redirectToLogin = () => {
		window.location.href = baseUrl + "/index.php";
	};

	const handleLogout = async () => {
		if (token) {
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

	const loadUserInfo = async () => {
		if (!token) {
			return;
		}

		try {
			const response = await fetch(userInfoWebhookUrl, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					token
				})
			});

			const data = await response.json();

			if (data && data.nombre && userName) {
				userName.textContent = data.nombre;
				localStorage.setItem("user_name", data.nombre);
			}

			if (data) {
				const resolvedId = data.user_id || data.userId || data.id || data.ID || data.Id;
				if (resolvedId) {
					localStorage.setItem("user_id", resolvedId);
				}
			}

			if (data && data.foto && userAvatar) {
				userAvatar.src = data.foto;
				userAvatar.alt = data.nombre || "Usuario";
			}

			if (embudosItem) {
				const funnelActive = data && data.FunnelActive !== undefined ? data.FunnelActive : false;
				const isActive = funnelActive === true || funnelActive === 1 || funnelActive === "1" || funnelActive === "true";
				if (isActive) {
					embudosItem.classList.remove("d-none");
				} else {
					embudosItem.classList.add("d-none");
				}
			}
		} catch (error) {
		}
	};

	if (logoutButton) {
		logoutButton.addEventListener("click", (event) => {
			event.preventDefault();
			handleLogout();
		});
	}

	logoutLinks.forEach((link) => {
		link.addEventListener("click", (event) => {
			event.preventDefault();
			handleLogout();
		});
	});

	loadUserInfo();
});
