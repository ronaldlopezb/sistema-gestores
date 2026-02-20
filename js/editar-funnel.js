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
		const stageInputs = container ? Array.from(container.querySelectorAll(".stage-card input")) : [];
		const validStages = stageInputs.filter((input) => input.value.trim());
		const hasRequiredStages = validStages.length >= 2 && validStages.length === stageInputs.length;
		submitButton.disabled = !nameValue || !hasRequiredStages;
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

	const createStageCard = (nameValue, stageId, canDelete, leadsCount) => {
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
		input.addEventListener("input", () => {
			updateSubmitState();
			setSubmitError("");
		});

		const leadsBadge = document.createElement("span");
		leadsBadge.className = "badge bg-success mt-2";
		const parsedLeads = typeof leadsCount === "number"
			? leadsCount
			: parseInt(String(leadsCount || "0"), 10);
		const safeLeads = Number.isNaN(parsedLeads) ? 0 : parsedLeads;
		leadsBadge.textContent = "Leads en esta etapa: " + safeLeads;

		body.appendChild(label);
		body.appendChild(input);
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
		const card = createStageCard("", null, true, 0);
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
			const response = await fetch("https://auto.myduomarkets.com/webhook/api/funnels/edit", {
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
				sorted.forEach((item) => {
					const card = createStageCard(item.Etapa, item.Id, item.Borrar, item.CantidadLeads);
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
			updateSubmitState();
			setSubmitError("");
		});
	}

	loadFunnel();
});
