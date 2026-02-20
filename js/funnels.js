document.addEventListener("DOMContentLoaded", () => {
	const token = localStorage.getItem("auth_token");
	const select = document.getElementById("filtro-periodo");
	const button = document.getElementById("filtro-aplicar");

	const setDisabledState = (message) => {
		if (select) {
			select.innerHTML = "";
			const option = document.createElement("option");
			option.value = "";
			option.textContent = message;
			select.appendChild(option);
			select.disabled = true;
		}
		if (button) {
			button.disabled = true;
		}
	};

	const fillSelect = (items) => {
		if (!select) {
			return;
		}
		select.innerHTML = "";
		const placeholder = document.createElement("option");
		placeholder.value = "";
		placeholder.textContent = "Selecciona un funnel";
		select.appendChild(placeholder);

		items.forEach((item) => {
			const option = document.createElement("option");
			option.value = item.IdFunnel;
			option.textContent = item.Nombre;
			select.appendChild(option);
		});

		select.disabled = false;
		if (button) {
			button.disabled = true;
		}
	};

	const loadFunnels = async () => {
		if (!token) {
			setDisabledState("Sin token");
			return;
		}

		try {
			const response = await fetch("https://auto.myduomarkets.com/webhook/api/funnels/list", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					token,
					Tipo: "Lista"
				})
			});

			const data = await response.json();
			if (!data || data.success === false) {
				setDisabledState("Sin funnels disponibles");
				return;
			}

			const items = Array.isArray(data)
				? data
				: Array.isArray(data.data)
					? data.data
					: [];

			const validItems = items.filter((item) => item && item.IdFunnel !== undefined && item.Nombre);
			if (!validItems.length) {
				setDisabledState("Sin funnels disponibles");
				return;
			}

			fillSelect(validItems);
		} catch (error) {
			setDisabledState("Error al cargar funnels");
		}
	};

	if (select && button) {
		select.addEventListener("change", () => {
			button.disabled = !select.value;
		});
	}

	loadFunnels();
});
