document.addEventListener("DOMContentLoaded", () => {
	const addButton = document.getElementById("stage-add");
	const container = document.getElementById("stages-container");
	const emptyState = document.getElementById("stages-empty");
	const funnelName = document.getElementById("funnel-nombre");
	const funnelDescription = document.getElementById("funnel-descripcion");
	const funnelActive = document.getElementById("funnel-activo");
	const submitButton = document.getElementById("funnel-submit");
	const submitHelper = document.getElementById("funnel-submit-helper");
	const submitError = document.getElementById("funnel-submit-error");
	const content = document.getElementById("funnel-edit-content");
	const emptyCard = document.getElementById("funnel-edit-empty");
	let isSubmitting = false;
	let initialStageIds = [];
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

	const params = new URLSearchParams(window.location.search);
	const idFunnel = params.get("IdFunnel") || params.get("idFunnel") || params.get("idfunnel");

	const showEmpty = () => {
		if (content) {
			content.classList.add("d-none");
		}
		if (emptyCard) {
			emptyCard.classList.remove("d-none");
		}
	};

	const showContent = () => {
		if (content) {
			content.classList.remove("d-none");
		}
		if (emptyCard) {
			emptyCard.classList.add("d-none");
		}
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
		if (!submitButton) {
			return;
		}
		if (state) {
			submitButton.disabled = true;
			submitButton.innerHTML = "<span class=\"funnel-spinner me-2\" role=\"status\" aria-hidden=\"true\"></span>Editando";
		} else {
			submitButton.textContent = "Editar Funnel";
		}
		updateSubmitState();
	};

	const createStageCard = (nameValue, stageId, canDelete, leadsCount, colorValue) => {
		const card = document.createElement("div");
		card.className = "card border shadow-sm stage-card";
		if (stageId) {
			card.dataset.stageId = stageId;
		}

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
		title.textContent = "Etapa";

		const headerActions = document.createElement("div");
		headerActions.className = "d-flex align-items-center gap-2";

		const removeButton = document.createElement("button");
		removeButton.type = "button";
		removeButton.className = "btn btn-sm";
		removeButton.style.color = "#E04B4B";
		removeButton.innerHTML = "<i data-feather=\"trash-2\"></i>";
		if (canDelete === false) {
			removeButton.disabled = true;
			removeButton.style.opacity = "0.4";
			removeButton.style.cursor = "not-allowed";
			removeButton.setAttribute("aria-disabled", "true");
		}
		removeButton.addEventListener("click", () => {
			if (removeButton.disabled) {
				return;
			}
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

		const label = document.createElement("label");
		label.className = "form-label";
		label.textContent = "Nombre de la etapa";

		const input = document.createElement("input");
		input.type = "text";
		input.className = "form-control";
		input.name = "etapa_nombre[]";
		input.placeholder = "Ej. Contacto inicial";
		input.value = nameValue || "";
		input.maxLength = 30;
		input.addEventListener("input", () => {
			if (input.value.length > 30) {
				input.value = input.value.slice(0, 30);
			}
			updateSubmitState();
			setSubmitError("");
		});

		const row = document.createElement("div");
		row.className = "row g-3";

		const nameCol = document.createElement("div");
		nameCol.className = "col-12 col-md-7";

		const colorCol = document.createElement("div");
		colorCol.className = "col-12 col-md-5";

		const colorLabel = document.createElement("label");
		colorLabel.className = "form-label";
		colorLabel.textContent = "Color de la etapa";

		const colorInput = document.createElement("input");
		colorInput.type = "hidden";
		colorInput.name = "etapa_color[]";
		colorInput.value = colorValue || defaultStageColor;

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
			const selected = value || defaultStageColor;
			colorInput.value = selected;
			const match = stageColors.find((item) => item.color === selected);
			const textColor = match ? match.text : "#ffffff";
			colorPreview.style.setProperty("--stage-color", selected);
			colorPreview.style.color = textColor;
			colorPreview.textContent = "Título";
			const options = colorMenu.querySelectorAll(".stage-color-option");
			options.forEach((option) => {
				option.classList.toggle("is-selected", option.dataset.color === selected);
			});
		};

		stageColors.forEach((item) => {
			const option = document.createElement("button");
			option.type = "button";
			option.className = "stage-color-option";
			option.style.setProperty("--stage-color", item.color);
			option.style.color = item.text;
			option.dataset.color = item.color;
			option.setAttribute("aria-label", "Color " + item.color);
			option.textContent = "Título";
			option.addEventListener("click", (event) => {
				event.stopPropagation();
				setSelectedColor(item.color);
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

		setSelectedColor(colorInput.value);
		ensureColorMenuListener();

		const leadsBadge = document.createElement("span");
		leadsBadge.className = "badge bg-success mt-2";
		const parsedLeads = typeof leadsCount === "number"
			? leadsCount
			: parseInt(String(leadsCount || "0"), 10);
		const safeLeads = Number.isNaN(parsedLeads) ? 0 : parsedLeads;
		leadsBadge.textContent = "Leads en esta etapa: " + safeLeads;

		colorSelect.appendChild(colorTrigger);
		colorSelect.appendChild(colorMenu);
		nameCol.appendChild(label);
		nameCol.appendChild(input);
		colorCol.appendChild(colorLabel);
		colorCol.appendChild(colorSelect);
		colorCol.appendChild(colorInput);
		row.appendChild(nameCol);
		row.appendChild(colorCol);
		body.appendChild(row);
		body.appendChild(leadsBadge);

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
		const card = createStageCard("", null, true, 0, defaultStageColor);
		container.appendChild(card);
		updateStageTitles();
		if (window.feather && typeof window.feather.replace === "function") {
			window.feather.replace();
		}
		updateSubmitState();
	};

	const loadFunnel = async () => {
		if (!idFunnel) {
			showEmpty();
			return;
		}
		try {
			const response = await fetch("https://auto.myduomarkets.com/webhook/api/funnels/edit/getinfo", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					IdFunnel: idFunnel
				})
			});

			const data = await response.json();
			const payload = Array.isArray(data) ? data[0] : data;
			if (!payload || !payload.Funnel) {
				showEmpty();
				return;
			}

			const funnel = payload.Funnel || {};
			const etapas = Array.isArray(payload.Etapas) ? payload.Etapas : [];

			if (funnelName) {
				funnelName.value = funnel.Nombre || "";
			}
			if (funnelDescription) {
				funnelDescription.value = funnel.Descripcion || "";
			}
			if (funnelActive) {
				funnelActive.value = funnel.Activo === false ? "false" : "true";
			}

			if (container) {
				container.innerHTML = "";
			const sorted = etapas
				.slice()
				.sort((a, b) => (a.Orden || 0) - (b.Orden || 0));
			initialStageIds = sorted
				.map((item) => item.IdEtapa)
				.filter((value) => value !== null && value !== undefined)
				.map((value) => String(value));
			sorted.forEach((item) => {
				const stageId = item.IdEtapa ?? null;
				const stageColor = item.ColorFondo || item.Color || defaultStageColor;
				const card = createStageCard(item.Etapa, stageId, item.Borrar, item.CantidadLeads, stageColor);
				container.appendChild(card);
			});
				if (sorted.length && emptyState) {
					emptyState.classList.add("d-none");
				}
			}

			updateStageTitles();
			updateSubmitState();
			showContent();
			if (window.feather && typeof window.feather.replace === "function") {
				window.feather.replace();
			}
		} catch (error) {
			showEmpty();
		}
	};

	const handleSubmit = async () => {
		if (!submitButton || submitButton.disabled || isSubmitting) {
			return;
		}
		const token = localStorage.getItem("auth_token") || "";
		const nameValue = funnelName ? funnelName.value.trim() : "";
		const descriptionValue = funnelDescription ? funnelDescription.value.trim() : "";
		const isActive = funnelActive ? funnelActive.value === "true" : true;
		const stageCards = container ? Array.from(container.querySelectorAll(".stage-card")) : [];
		const currentStageIds = [];
		const actualizadas = [];
		const nuevas = [];

		stageCards.forEach((card, index) => {
			const input = card.querySelector("input[name=\"etapa_nombre[]\"]");
			const colorInput = card.querySelector("input[name=\"etapa_color[]\"]");
			const stageName = input ? input.value.trim() : "";
			const stageId = card.dataset.stageId ? String(card.dataset.stageId) : "";
			const selectedColor = colorInput ? colorInput.value : defaultStageColor;
			const match = stageColors.find((item) => item.color === selectedColor);
			const payload = {
				Etapa: stageName,
				Orden: index + 1,
				ColorFondo: selectedColor,
				ColorTexto: match ? match.text : "#ffffff"
			};
			if (stageId) {
				payload.IdEtapa = stageId;
				actualizadas.push(payload);
				currentStageIds.push(stageId);
			} else {
				nuevas.push(payload);
			}
		});

		const eliminadas = initialStageIds.filter((id) => !currentStageIds.includes(id));

		if (!token) {
			setSubmitError("No se encontró la sesión del usuario.");
			return;
		}
		if (!idFunnel) {
			setSubmitError("No se encontró el funnel.");
			return;
		}
		if (!nameValue) {
			setSubmitError("Escribe el nombre del funnel para continuar.");
			return;
		}
		if (stageCards.length < 2) {
			setSubmitError("Agrega al menos 2 etapas para actualizar el funnel.");
			return;
		}
		if (stageCards.some((card) => {
			const input = card.querySelector("input[name=\"etapa_nombre[]\"]");
			return !input || !input.value.trim();
		})) {
			setSubmitError("Todas las etapas deben tener nombre.");
			return;
		}

		const payload = {
			token,
			IdFunnel: idFunnel,
			funnel: {
				IdFunnel: idFunnel,
				Nombre: nameValue,
				Descripcion: descriptionValue,
				Activo: isActive
			},
			etapas: {
				actualizadas,
				nuevas,
				eliminadas
			}
		};

		setSubmitError("");
		setSubmitting(true);
		try {
			const response = await fetch("https://auto.myduomarkets.com/webhook/api/funnels/editinfo", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(payload)
			});
			const data = await response.json();
			if (data && data.success === true) {
				if (window.sessionStorage) {
					window.sessionStorage.setItem("funnel_updated", "1");
				}
				const baseUrl = window.appBaseUrl || "";
				window.location.href = baseUrl + "/pages/funnels/administrar-funnels.php";
				return;
			}
			setSubmitError("No se pudo actualizar el funnel. Intenta nuevamente.");
		} catch (error) {
			setSubmitError("No se pudo actualizar el funnel. Intenta nuevamente.");
		} finally {
			setSubmitting(false);
		}
	};

	if (container && window.Sortable) {
		window.Sortable.create(container, {
			animation: 150,
			handle: ".stage-handle",
			ghostClass: "bg-light",
			onEnd: () => {
				updateStageTitles();
				updateSubmitState();
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

	if (submitButton) {
		submitButton.addEventListener("click", () => {
			handleSubmit();
		});
	}

	loadFunnel();
});
