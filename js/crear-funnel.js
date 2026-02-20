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

	const updateSubmitState = () => {
		if (!submitButton) {
			return;
		}
		const nameValue = funnelName ? funnelName.value.trim() : "";
		const stageInputs = container ? Array.from(container.querySelectorAll(".stage-card input")) : [];
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

		const label = document.createElement("label");
		label.className = "form-label";
		label.setAttribute("for", "stage-name-" + stageCount);
		label.textContent = "Nombre de la etapa";

		const input = document.createElement("input");
		input.type = "text";
		input.className = "form-control";
		input.id = "stage-name-" + stageCount;
		input.name = "etapa_nombre[]";
		input.placeholder = "Ej. Contacto inicial";
		input.addEventListener("input", () => {
			updateSubmitState();
			setSubmitError("");
		});

		body.appendChild(label);
		body.appendChild(input);

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
		const stageInputs = stageCards.map((card) => card.querySelector("input"));
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

		const etapas = stageValues.map((value, index) => ({
			Etapa: value,
			Orden: index + 1
		}));

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
