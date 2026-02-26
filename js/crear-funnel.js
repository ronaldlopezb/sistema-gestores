document.addEventListener("DOMContentLoaded", () => {
	const addButton = document.getElementById("stage-add");
	const container = document.getElementById("stages-container");
	const emptyState = document.getElementById("stages-empty");
	const funnelName = document.getElementById("funnel-nombre");
	const submitButton = document.getElementById("funnel-submit");
	const submitHelper = document.getElementById("funnel-submit-helper");
	const submitError = document.getElementById("funnel-submit-error");
	let stageCount = 0;
	let isSubmitting = false;
	let colorMenuListenerAdded = false;
	const stageColors = [
		{ color: "#3B7DDD", text: "#FFFFFF" },
		{ color: "#0D6EFD", text: "#FFFFFF" },
		{ color: "#5BC0EB", text: "#0B2E3A" },
		{ color: "#2F9BEA", text: "#FFFFFF" },
		{ color: "#1CBB8C", text: "#FFFFFF" },
		{ color: "#2EAE6E", text: "#FFFFFF" },
		{ color: "#7BC043", text: "#1B3A1B" },
		{ color: "#F0B429", text: "#3A2A00" },
		{ color: "#F7C948", text: "#3A2A00" },
		{ color: "#F39C12", text: "#3A1F00" },
		{ color: "#FD7E14", text: "#3A1F00" },
		{ color: "#E04B4B", text: "#FFFFFF" },
		{ color: "#DC3545", text: "#FFFFFF" },
		{ color: "#E83E8C", text: "#FFFFFF" },
		{ color: "#6F42C1", text: "#FFFFFF" },
		{ color: "#8E44AD", text: "#FFFFFF" },
		{ color: "#6C757D", text: "#FFFFFF" },
		{ color: "#ADB5BD", text: "#1B1E21" },
		{ color: "#20C997", text: "#0B2E2A" },
		{ color: "#17A2B8", text: "#FFFFFF" }
	];
	const defaultStageColor = "#3B7DDD";

	const closeAllColorMenus = () => {
		const menus = document.querySelectorAll(".stage-color-menu.show");
		menus.forEach((menu) => {
			menu.classList.remove("show");
		});
	};

	const ensureColorMenuListener = () => {
		if (colorMenuListenerAdded) {
			return;
		}
		colorMenuListenerAdded = true;
		document.addEventListener("click", () => {
			closeAllColorMenus();
		});
	};

	const updateSubmitState = () => {
		if (!submitButton) {
			return;
		}
		const nameValue = funnelName ? funnelName.value.trim() : "";
		const stageInputs = container
			? Array.from(container.querySelectorAll(".stage-card input[name=\"etapa_nombre[]\"]"))
			: [];
		const validStages = stageInputs.filter((input) => input.value.trim());
		const hasRequiredStages = validStages.length >= 2 && validStages.length === stageInputs.length;
		submitButton.disabled = isSubmitting || !nameValue || !hasRequiredStages;
		if (submitHelper) {
			submitHelper.classList.toggle("text-danger", submitButton.disabled);
		}
	};

	const setSubmitError = (message) => {
		if (!submitError) {
			return;
		}
		if (message) {
			submitError.textContent = message;
			submitError.classList.remove("d-none");
		} else {
			submitError.textContent = "";
			submitError.classList.add("d-none");
		}
	};

	const setSubmitting = (state) => {
		isSubmitting = state;
		if (submitButton) {
			if (state) {
				submitButton.disabled = true;
				submitButton.innerHTML = "<span class=\"funnel-spinner me-2\" role=\"status\" aria-hidden=\"true\"></span>Creando Funnel";
			} else {
				submitButton.innerHTML = "Crear Nuevo Funnel";
			}
		}
		updateSubmitState();
	};

	const updateStageTitles = () => {
		if (!container) {
			return;
		}
		const cards = container.querySelectorAll(".stage-card");
		cards.forEach((card, index) => {
			const title = card.querySelector(".stage-title");
			if (title) {
				title.textContent = "Etapa " + (index + 1);
			}
		});
	};

	const createStageCard = () => {
		stageCount += 1;
		const card = document.createElement("div");
		card.className = "card border shadow-sm stage-card";

		const header = document.createElement("div");
		header.className = "card-header d-flex align-items-center justify-content-between";

		const headerLeft = document.createElement("div");
		headerLeft.className = "d-flex align-items-center gap-2";

		const dragHandle = document.createElement("button");
		dragHandle.type = "button";
		dragHandle.className = "btn btn-light btn-sm stage-handle";
		dragHandle.innerHTML = "<i data-feather=\"move\"></i>";
		dragHandle.setAttribute("aria-label", "Arrastrar etapa");

		const title = document.createElement("div");
		title.className = "stage-title fw-semibold";
		title.textContent = "Etapa " + stageCount;

		const headerActions = document.createElement("div");
		headerActions.className = "d-flex align-items-center gap-2";

		const removeButton = document.createElement("button");
		removeButton.type = "button";
		removeButton.className = "btn btn-sm";
		removeButton.style.color = "#E04B4B";
		removeButton.innerHTML = "<i data-feather=\"trash-2\"></i>";
		removeButton.addEventListener("click", () => {
			card.remove();
			updateStageTitles();
			if (container && container.children.length === 0 && emptyState) {
				emptyState.classList.remove("d-none");
			}
			updateSubmitState();
		});

		headerLeft.appendChild(dragHandle);
		headerLeft.appendChild(title);
		headerActions.appendChild(removeButton);
		header.appendChild(headerLeft);
		header.appendChild(headerActions);

		const body = document.createElement("div");
		body.className = "card-body";

		const row = document.createElement("div");
		row.className = "row g-3";

		const nameCol = document.createElement("div");
		nameCol.className = "col-12 col-md-7";

		const colorCol = document.createElement("div");
		colorCol.className = "col-12 col-md-5";

		const label = document.createElement("label");
		label.className = "form-label";
		label.setAttribute("for", "stage-name-" + stageCount);
		label.textContent = "Nombre de la etapa";

		const input = document.createElement("input");
		input.type = "text";
		input.className = "form-control";
		input.id = "stage-name-" + stageCount;
		input.name = "etapa_nombre[]";
		input.maxLength = 30;
		input.placeholder = "Ej. Contacto inicial";
		input.addEventListener("input", () => {
			if (input.value.length > 30) {
				input.value = input.value.slice(0, 30);
			}
			updateSubmitState();
			setSubmitError("");
		});

		const colorLabel = document.createElement("label");
		colorLabel.className = "form-label";
		colorLabel.textContent = "Color de la etapa";

		const colorInput = document.createElement("input");
		colorInput.type = "hidden";
		colorInput.name = "etapa_color[]";
		colorInput.value = defaultStageColor;

		const colorSelect = document.createElement("div");
		colorSelect.className = "stage-color-select";

		const colorTrigger = document.createElement("button");
		colorTrigger.type = "button";
		colorTrigger.className = "stage-color-trigger";
		colorTrigger.setAttribute("aria-label", "Seleccionar color de etapa");

		const colorPreview = document.createElement("span");
		colorPreview.className = "stage-color-preview";

		const colorCaret = document.createElement("span");
		colorCaret.className = "stage-color-caret";

		colorTrigger.appendChild(colorPreview);
		colorTrigger.appendChild(colorCaret);

		const colorMenu = document.createElement("div");
		colorMenu.className = "stage-color-menu";

		const setSelectedColor = (value) => {
			colorInput.value = value;
			const match = stageColors.find((item) => item.color === value);
			const textColor = match ? match.text : "#ffffff";
			colorPreview.style.setProperty("--stage-color", value);
			colorPreview.style.color = textColor;
			colorPreview.textContent = "Título";
			const options = colorMenu.querySelectorAll(".stage-color-option");
			options.forEach((option) => {
				option.classList.toggle("is-selected", option.dataset.color === value);
			});
		};

		stageColors.forEach((item) => {
			const color = item.color;
			const textColor = item.text;
			const option = document.createElement("button");
			option.type = "button";
			option.className = "stage-color-option";
			option.style.setProperty("--stage-color", color);
			option.style.color = textColor;
			option.dataset.color = color;
			option.setAttribute("aria-label", "Color " + color);
			option.textContent = "Título";
			option.addEventListener("click", (event) => {
				event.stopPropagation();
				setSelectedColor(color);
				colorMenu.classList.remove("show");
			});
			colorMenu.appendChild(option);
		});

		colorTrigger.addEventListener("click", (event) => {
			event.stopPropagation();
			const isOpen = colorMenu.classList.contains("show");
			closeAllColorMenus();
			if (!isOpen) {
				colorMenu.classList.add("show");
			}
		});

		setSelectedColor(defaultStageColor);
		ensureColorMenuListener();

		nameCol.appendChild(label);
		nameCol.appendChild(input);
		colorSelect.appendChild(colorTrigger);
		colorSelect.appendChild(colorMenu);
		colorCol.appendChild(colorLabel);
		colorCol.appendChild(colorSelect);
		colorCol.appendChild(colorInput);
		row.appendChild(nameCol);
		row.appendChild(colorCol);
		body.appendChild(row);

		card.appendChild(header);
		card.appendChild(body);
		return card;
	};

	const addStageCard = () => {
		if (!container) {
			return;
		}
		if (emptyState) {
			emptyState.classList.add("d-none");
		}
		const card = createStageCard();
		container.appendChild(card);
		updateStageTitles();
		if (window.feather && typeof window.feather.replace === "function") {
			window.feather.replace();
		}
		updateSubmitState();
	};

	if (container && window.Sortable) {
		window.Sortable.create(container, {
			animation: 150,
			handle: ".stage-handle",
			ghostClass: "bg-light",
			onEnd: () => {
				updateStageTitles();
			}
		});
	}

	if (addButton) {
		addButton.addEventListener("click", () => {
			addStageCard();
		});
	}

	if (funnelName) {
		funnelName.addEventListener("input", () => {
			if (funnelName.value.length > 40) {
				funnelName.value = funnelName.value.slice(0, 40);
			}
			updateSubmitState();
			setSubmitError("");
		});
	}

	const handleSubmit = async () => {
		if (!submitButton || submitButton.disabled || isSubmitting) {
			return;
		}
		const token = localStorage.getItem("auth_token") || "";
		const nameValue = funnelName ? funnelName.value.trim() : "";
		const description = document.getElementById("funnel-descripcion");
		const activeField = document.getElementById("funnel-activo");
		const stageCards = container ? Array.from(container.querySelectorAll(".stage-card")) : [];
		const stageInputs = stageCards.map((card) => card.querySelector("input[name=\"etapa_nombre[]\"]"));
		const stageValues = stageInputs.map((input) => (input ? input.value.trim() : ""));

		if (!token) {
			setSubmitError("No se encontró la sesión del usuario.");
			return;
		}
		if (!nameValue) {
			setSubmitError("Escribe el nombre del funnel para continuar.");
			return;
		}
		if (stageValues.length < 2) {
			setSubmitError("Agrega al menos 2 etapas para crear el funnel.");
			return;
		}
		if (stageValues.some((value) => !value)) {
			setSubmitError("Todas las etapas deben tener nombre.");
			return;
		}

		const etapas = stageCards.map((card, index) => {
			const nameInput = card.querySelector("input[name=\"etapa_nombre[]\"]");
			const colorInput = card.querySelector("input[name=\"etapa_color[]\"]");
			const selectedColor = colorInput ? colorInput.value : defaultStageColor;
			const match = stageColors.find((item) => item.color === selectedColor);
			return {
				Etapa: nameInput ? nameInput.value.trim() : "",
				Orden: index + 1,
				ColorFondo: selectedColor,
				ColorTexto: match ? match.text : "#ffffff"
			};
		});

		const payload = {
			token,
			funnel: {
				Nombre: nameValue,
				Descripcion: description ? description.value.trim() : "",
				Activo: activeField ? activeField.value === "true" : true
			},
			etapas
		};

		setSubmitError("");
		setSubmitting(true);
		try {
			const response = await fetch("https://auto.myduomarkets.com/webhook/api/funnels/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(payload)
			});
			const data = await response.json();
			if (data && data.success === true) {
				const baseUrl = window.appBaseUrl || "";
				if (window.sessionStorage) {
					window.sessionStorage.setItem("funnel_created", "1");
				}
				window.location.href = baseUrl + "/pages/funnels/administrar-funnels.php";
				return;
			}
			setSubmitError("No se pudo crear el funnel. Intenta nuevamente.");
		} catch (error) {
			setSubmitError("No se pudo crear el funnel. Intenta nuevamente.");
		} finally {
			setSubmitting(false);
		}
	};

	if (submitButton) {
		submitButton.addEventListener("click", () => {
			handleSubmit();
		});
	}

	updateSubmitState();
});
