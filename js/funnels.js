document.addEventListener("DOMContentLoaded", () => {
	const token = localStorage.getItem("auth_token");
	const select = document.getElementById("filtro-periodo");
	const button = document.getElementById("filtro-aplicar");
	const board = document.getElementById("kanban-board");
	const title = document.getElementById("kanban-title");
	const titleText = document.getElementById("kanban-title-text");
	const subtitle = document.getElementById("kanban-subtitle");
	const countBadge = document.getElementById("kanban-count");
	const leadsBadge = document.getElementById("kanban-leads-count");
	const alertBox = document.getElementById("kanban-alert");
	const header = document.getElementById("kanban-header");
	const headerCard = document.getElementById("kanban-header-card");
	const headerMainCard = document.getElementById("kanban-header-main-card");
	const winsCard = document.getElementById("kanban-wins-card");
	const lossesCard = document.getElementById("kanban-losses-card");
	const winsDrop = document.getElementById("kanban-wins-drop");
	const lossesDrop = document.getElementById("kanban-losses-drop");
	const overlay = document.getElementById("kanban-overlay");
	let isLoading = false;
	let currentFunnelId = null;
	let winsStageId = null;
	let lossesStageId = null;
	let winsDropSortable = null;
	let lossesDropSortable = null;
	let isDraggingLead = false;
	let pointerLeadCard = null;
	let pointerStart = null;
	let leadModalBackdrop = null;
	const leadModalElement = document.getElementById("lead-modal");
	const classificationColors = {
		"Bajo Potencial": "#1B6CA8",
		"En Desarrollo": "#4FB3E6",
		"Buen Prospecto": "#2EAE6E",
		"Alta Promesa": "#E67BB0"
	};
	const stateColors = {
		"Recien llegado": "#1B6CA8",
		"Trabajando": "#73C992",
		"Vendido": "#E67BB0",
		"Vendidos": "#E67BB0",
		"Anular": "#E04B4B",
		"Anulado": "#E04B4B",
		"Anulados": "#E04B4B"
	};

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

	const setLoading = (state) => {
		isLoading = state;
		if (!button) {
			return;
		}
		if (overlay) {
			overlay.classList.toggle("is-hidden", !state);
			overlay.setAttribute("aria-hidden", state ? "false" : "true");
		}
		if (state) {
			button.disabled = true;
			button.innerHTML = "<span class=\"kanban-spinner me-2\" role=\"status\" aria-hidden=\"true\"></span>Cargando";
		} else {
			button.innerHTML = "<i class=\"align-middle me-1\" data-feather=\"filter\"></i>Cargar Funnel";
			button.disabled = !(select && select.value);
			if (window.feather && typeof window.feather.replace === "function") {
				window.feather.replace();
			}
		}
	};

	const showAlert = (message) => {
		if (!alertBox) {
			return;
		}
		alertBox.textContent = message;
		alertBox.classList.remove("d-none");
	};

	const clearAlert = () => {
		if (!alertBox) {
			return;
		}
		alertBox.textContent = "";
		alertBox.classList.add("d-none");
	};

	const createBadge = (text, color) => {
		const span = document.createElement("span");
		span.className = "badge";
		span.textContent = text || "-";
		span.style.backgroundColor = color || "#6C757D";
		span.style.color = "#fff";
		return span;
	};

	const renderStars = (value) => {
		const starsRow = document.createElement("div");
		starsRow.className = "d-flex align-items-center gap-1 mt-2";
		const count = Number.parseInt(value, 10);
		if (!count || Number.isNaN(count)) {
			return null;
		}
		for (let i = 0; i < count; i += 1) {
			const icon = document.createElement("i");
			icon.setAttribute("data-feather", "star");
			icon.setAttribute("fill", "#fcb92c");
			icon.setAttribute("stroke", "#fcb92c");
			icon.style.width = "12px";
			icon.style.height = "12px";
			icon.style.color = "#fcb92c";
			starsRow.appendChild(icon);
		}
		return starsRow;
	};

	const clearBoard = () => {
		if (board) {
			board.innerHTML = "";
		}
		currentFunnelId = null;
		if (titleText) {
			titleText.textContent = "";
		} else if (title) {
			title.textContent = "";
		}
		if (subtitle) {
			subtitle.textContent = "";
		}
		if (countBadge) {
			countBadge.textContent = "0 etapas";
			countBadge.classList.add("d-none");
		}
		if (leadsBadge) {
			leadsBadge.textContent = "Leads en el Funnel: 0";
			leadsBadge.classList.add("d-none");
		}
		if (header) {
			header.classList.add("is-empty");
			header.classList.add("d-none");
		}
		if (headerCard) {
			headerCard.classList.add("d-none");
		}
	};

	const createEmptyCard = () => {
		const empty = document.createElement("div");
		empty.className = "card border-0 shadow-sm disabled";
		empty.innerHTML = "<div class=\"card-body text-center text-muted small\">Sin leads en esta etapa.</div>";
		return empty;
	};

	const updateEmptyStates = () => {
		if (!board) {
			return;
		}
		const lists = board.querySelectorAll(".funnel-stage-list");
		lists.forEach((list) => {
			const hasLeads = list.querySelectorAll(".funnel-lead-card").length > 0;
			const emptyCard = list.querySelector(".disabled");
			if (hasLeads && emptyCard) {
				emptyCard.remove();
			}
			if (!hasLeads && !emptyCard) {
				list.appendChild(createEmptyCard());
			}
		});
	};

	const updateStageCounts = () => {
		if (!board) {
			return;
		}
		const lists = board.querySelectorAll(".funnel-stage-list");
		lists.forEach((list) => {
			const count = list.querySelectorAll(".funnel-lead-card").length;
			const card = list.closest(".card");
			if (!card) {
				return;
			}
			const badge = card.querySelector(".stage-count");
			if (badge) {
				badge.textContent = String(count);
			}
		});
	};

	const updateFixedCount = (countElement, delta) => {
		if (!countElement) {
			return;
		}
		const current = Number.parseInt(countElement.textContent || "0", 10);
		const next = Number.isNaN(current) ? delta : current + delta;
		countElement.textContent = String(Math.max(0, next));
	};

	const handleFixedDrop = async (event, tipo, dropElement, countElement) => {
		const leadId = event.item ? Number(event.item.dataset.leadId) : null;
		const stageId = dropElement ? Number(dropElement.dataset.stageId) : null;
		const funnelId = currentFunnelId ? Number(currentFunnelId) : null;
		const fromStageId = event.from ? Number(event.from.dataset.stageId) : null;

		const revertMove = () => {
			if (event.from && event.item) {
				const referenceNode = event.from.children[event.oldIndex] || null;
				event.from.insertBefore(event.item, referenceNode);
				if (fromStageId) {
					event.item.dataset.stageId = String(fromStageId);
				}
			}
			updateStageCounts();
			updateEmptyStates();
		};

		if (!leadId || !stageId || !funnelId || !tipo) {
			revertMove();
			return;
		}

		try {
			const response = await fetch("https://auto.myduomarkets.com/webhook/api/funnels/kanban/update/won-lose", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					Tipo: tipo,
					IdLeadFunnel: leadId,
					IdEtapa: stageId,
					IdFunnel: funnelId
				})
			});

			const data = await response.json();
			if (!data || data.success !== true) {
				throw new Error("won_lose_failed");
			}
			if (event.item) {
				event.item.remove();
			}
			updateFixedCount(countElement, 1);
			updateStageCounts();
			updateEmptyStates();
		} catch (error) {
			revertMove();
		}
	};

	const initFixedDrops = () => {
		if (!window.Sortable) {
			return;
		}
		if (winsDrop) {
			if (winsDropSortable) {
				winsDropSortable.destroy();
			}
			winsDropSortable = window.Sortable.create(winsDrop, {
				group: {
					name: "funnel-board",
					pull: false,
					put: true
				},
				sort: false,
				animation: 150,
				onAdd: (event) => {
					const countElement = winsCard ? winsCard.querySelector(".kanban-summary-count") : null;
					handleFixedDrop(event, "Ganado", winsDrop, countElement);
				}
			});
		}
		if (lossesDrop) {
			if (lossesDropSortable) {
				lossesDropSortable.destroy();
			}
			lossesDropSortable = window.Sortable.create(lossesDrop, {
				group: {
					name: "funnel-board",
					pull: false,
					put: true
				},
				sort: false,
				animation: 150,
				onAdd: (event) => {
					const countElement = lossesCard ? lossesCard.querySelector(".kanban-summary-count") : null;
					handleFixedDrop(event, "Perdido", lossesDrop, countElement);
				}
			});
		}
	};

	const openLeadModal = () => {
		if (!leadModalElement) {
			return;
		}
		if (window.bootstrap && typeof window.bootstrap.Modal === "function") {
			const modal = window.bootstrap.Modal.getOrCreateInstance(leadModalElement);
			modal.show();
			return;
		}
		leadModalElement.classList.add("show");
		leadModalElement.style.display = "block";
		leadModalElement.removeAttribute("aria-hidden");
		leadModalElement.setAttribute("aria-modal", "true");
		leadModalElement.setAttribute("role", "dialog");
		document.body.classList.add("modal-open");
		if (!leadModalBackdrop) {
			leadModalBackdrop = document.createElement("div");
			leadModalBackdrop.className = "modal-backdrop fade show";
			document.body.appendChild(leadModalBackdrop);
			leadModalBackdrop.addEventListener("click", () => {
				closeLeadModal();
			});
		}
	};

	const closeLeadModal = () => {
		if (!leadModalElement) {
			return;
		}
		if (window.bootstrap && typeof window.bootstrap.Modal === "function") {
			const modal = window.bootstrap.Modal.getOrCreateInstance(leadModalElement);
			modal.hide();
			return;
		}
		leadModalElement.classList.remove("show");
		leadModalElement.style.display = "none";
		leadModalElement.setAttribute("aria-hidden", "true");
		leadModalElement.removeAttribute("aria-modal");
		document.body.classList.remove("modal-open");
		if (leadModalBackdrop) {
			leadModalBackdrop.remove();
			leadModalBackdrop = null;
		}
	};

	const syncSummaryHeights = () => {
		if (!headerMainCard || !winsCard || !lossesCard) {
			return;
		}
		winsCard.style.height = "auto";
		lossesCard.style.height = "auto";
		const targetHeight = headerMainCard.offsetHeight;
		if (!targetHeight) {
			return;
		}
		winsCard.style.height = targetHeight + "px";
		lossesCard.style.height = targetHeight + "px";
	};

	const buildOrderPayload = (list) => {
		if (!list) {
			return [];
		}
		const cards = Array.from(list.querySelectorAll(".funnel-lead-card"));
		return cards.map((card, index) => ({
			IdLeadFunnel: card.dataset.leadId ? Number(card.dataset.leadId) : null,
			Orden: index + 1
		})).filter((item) => item.IdLeadFunnel !== null);
	};

	const initBoardDrag = () => {
		if (!window.Sortable || !board) {
			return;
		}
		const lists = board.querySelectorAll(".funnel-stage-list");
		lists.forEach((list) => {
			window.Sortable.create(list, {
				group: "funnel-board",
				animation: 150,
				ghostClass: "funnel-ghost",
				chosenClass: "funnel-chosen",
				dragClass: "opacity-50",
				filter: ".disabled",
				onStart: () => {
					isDraggingLead = true;
				},
				onEnd: async (event) => {
					setTimeout(() => {
						isDraggingLead = false;
					}, 0);
					if (event.to && event.to.dataset && event.to.dataset.fixedDrop === "true") {
						return;
					}
					const fromStageId = event.from ? event.from.dataset.stageId : null;
					const toStageId = event.to ? event.to.dataset.stageId : null;
					const leadId = event.item ? event.item.dataset.leadId : null;
					const funnelId = currentFunnelId || (select ? select.value : "");
					if (event.item && toStageId) {
						event.item.dataset.stageId = toStageId;
					}
					updateStageCounts();
					updateEmptyStates();

					if (!leadId || !toStageId || !funnelId) {
						return;
					}

					const sameStage = fromStageId === toStageId;
					let payload = null;
					if (sameStage) {
						payload = {
							Tipo: "Cambio de Orden",
							IdFunnel: Number(funnelId),
							IdEtapa: Number(toStageId),
							LeadsOrden: buildOrderPayload(event.to)
						};
					} else {
						payload = {
							Tipo: "Cambio de Etapa y Orden",
							IdFunnel: Number(funnelId),
							Movimiento: {
								IdLeadFunnel: Number(leadId),
								IdEtapaAnterior: fromStageId ? Number(fromStageId) : null,
								IdEtapaNueva: Number(toStageId)
							},
							Ordenes: {
								EtapaAnterior: buildOrderPayload(event.from),
								EtapaNueva: buildOrderPayload(event.to)
							}
						};
					}

					try {
						const response = await fetch("https://auto.myduomarkets.com/webhook/api/funnels/kanban/update", {
							method: "POST",
							headers: {
								"Content-Type": "application/json"
							},
							body: JSON.stringify(payload)
						});
						const data = await response.json();
						if (!data || data.success !== true) {
							throw new Error("update_failed");
						}
					} catch (error) {
						if (event.from && event.item) {
							const referenceNode = event.from.children[event.oldIndex] || null;
							event.from.insertBefore(event.item, referenceNode);
							event.item.dataset.stageId = fromStageId || "";
						}
						updateStageCounts();
						updateEmptyStates();
						showAlert("No se pudo guardar el cambio. Se revirtió el movimiento.");
					}
				}
			});
		});
	};

	const renderBoard = (payload) => {
		if (!board) {
			return;
		}
		board.innerHTML = "";
		const funnel = payload && payload.Funnel ? payload.Funnel : {};
		const stages = Array.isArray(payload && payload.Etapas ? payload.Etapas : [])
			? payload.Etapas
			: [];
		const fixedStages = Array.isArray(payload && payload.EtapasFijas ? payload.EtapasFijas : [])
			? payload.EtapasFijas
			: [];
		const leads = Array.isArray(payload && payload.Leads ? payload.Leads : [])
			? payload.Leads
			: [];

		const winsStage = fixedStages.find((stage) => stage && stage.Nombre === "Ganados") || null;
		const lossesStage = fixedStages.find((stage) => stage && stage.Nombre === "Perdidos") || null;
		winsStageId = winsStage && winsStage.IdEtapa ? Number(winsStage.IdEtapa) : null;
		lossesStageId = lossesStage && lossesStage.IdEtapa ? Number(lossesStage.IdEtapa) : null;

		const orderedStages = stages.slice().sort((a, b) => (a.Orden || 0) - (b.Orden || 0));
		const leadsByStage = new Map();
		orderedStages.forEach((stage) => {
			leadsByStage.set(String(stage.IdEtapa), []);
		});
		leads.forEach((lead) => {
			const key = String(lead.IdEtapa);
			if (!leadsByStage.has(key)) {
				leadsByStage.set(key, []);
			}
			leadsByStage.get(key).push(lead);
		});

		if (titleText) {
			const name = funnel && funnel.Nombre ? funnel.Nombre : "Funnel Board";
			titleText.textContent = name;
		} else if (title) {
			const name = funnel && funnel.Nombre ? funnel.Nombre : "Funnel Board";
			title.textContent = name;
		}
		currentFunnelId = funnel && funnel.IdFunnel ? String(funnel.IdFunnel) : null;
		if (subtitle) {
			subtitle.textContent = funnel && funnel.Descripcion ? funnel.Descripcion : "Sin descripcion.";
		}
		if (countBadge) {
			countBadge.textContent = orderedStages.length + " etapas";
			countBadge.classList.remove("d-none");
		}
		if (leadsBadge) {
			const totalLeads = funnel && funnel.TotalLeads !== undefined ? funnel.TotalLeads : leads.length;
			leadsBadge.textContent = "Leads en el Funnel: " + totalLeads;
			leadsBadge.classList.remove("d-none");
		}
		if (header) {
			header.classList.remove("is-empty");
			header.classList.remove("d-none");
		}
		if (headerCard) {
			headerCard.classList.remove("d-none");
		}
		if (winsCard && winsStage) {
			winsCard.dataset.stageId = String(winsStage.IdEtapa || "");
			winsCard.style.background = winsStage.ColorFondo || "#00c853";
			winsCard.style.color = winsStage.ColorTexto || "#ffffff";
			const titleEl = winsCard.querySelector(".kanban-summary-title");
			const countEl = winsCard.querySelector(".kanban-summary-count");
			if (titleEl) {
				titleEl.textContent = winsStage.Nombre || "Ganados";
			}
			if (countEl) {
				countEl.textContent = winsStage.TotalLeads !== undefined
					? String(winsStage.TotalLeads)
					: "0";
			}
		}
		if (lossesCard && lossesStage) {
			lossesCard.dataset.stageId = String(lossesStage.IdEtapa || "");
			lossesCard.style.background = lossesStage.ColorFondo || "#e04b4b";
			lossesCard.style.color = lossesStage.ColorTexto || "#ffffff";
			const titleEl = lossesCard.querySelector(".kanban-summary-title");
			const countEl = lossesCard.querySelector(".kanban-summary-count");
			if (titleEl) {
				titleEl.textContent = lossesStage.Nombre || "Perdidos";
			}
			if (countEl) {
				countEl.textContent = lossesStage.TotalLeads !== undefined
					? String(lossesStage.TotalLeads)
					: "0";
			}
		}
		if (winsDrop) {
			winsDrop.dataset.tipo = "Ganado";
			winsDrop.dataset.stageId = winsStageId ? String(winsStageId) : "";
			winsDrop.dataset.fixedDrop = "true";
		}
		if (lossesDrop) {
			lossesDrop.dataset.tipo = "Perdido";
			lossesDrop.dataset.stageId = lossesStageId ? String(lossesStageId) : "";
			lossesDrop.dataset.fixedDrop = "true";
		}

		orderedStages.forEach((stage) => {
			const stageId = stage.IdEtapa;
			const stageName = stage.Nombre || "Etapa";
			const stageColor = stage.ColorFondo || "#f8f9fa";
			const stageText = stage.ColorTexto || "#1f2a37";
			const stageLeads = (leadsByStage.get(String(stageId)) || [])
				.slice()
				.sort((a, b) => (a.Orden || 0) - (b.Orden || 0));

			const col = document.createElement("div");
			col.className = "kanban-column";

			const card = document.createElement("div");
			card.className = "card h-100 border-0 shadow-sm";

			const header = document.createElement("div");
			header.className = "card-header d-flex align-items-center justify-content-between";
			header.style.background = stageColor;
			header.style.color = stageText;

			const titleSpan = document.createElement("span");
			titleSpan.className = "fw-semibold";
			titleSpan.textContent = stageName;

			const countSpan = document.createElement("span");
			countSpan.className = "badge stage-count";
			countSpan.textContent = String(stageLeads.length);
			countSpan.style.backgroundColor = "#ffffff";
			countSpan.style.color = "#111111";

			header.appendChild(titleSpan);
			header.appendChild(countSpan);

			const list = document.createElement("div");
			list.className = "card-body d-flex flex-column gap-2 funnel-stage-list";
			list.dataset.stageId = String(stageId);
			list.style.setProperty("--stage-scroll", stageColor);

			stageLeads.forEach((lead) => {
				const leadCard = document.createElement("div");
				leadCard.className = "card funnel-lead-card";
				leadCard.dataset.leadId = lead.IdLeadFunnel || "";
				leadCard.dataset.stageId = String(stageId);
				const body = document.createElement("div");
				body.className = "card-body p-2";

				const nameRow = document.createElement("div");
				nameRow.className = "d-flex align-items-start justify-content-between gap-2";

				const nameBlock = document.createElement("div");
				nameBlock.className = "d-flex align-items-start gap-2 fw-semibold";
				nameBlock.style.minWidth = "0";
				nameBlock.style.flex = "1";
				const nameIcon = document.createElement("i");
				nameIcon.setAttribute("data-feather", "user");
				nameIcon.className = "lead-icon";
				const nameText = document.createElement("span");
				nameText.textContent = lead.Nombre || "-";
				nameBlock.appendChild(nameIcon);
				nameBlock.appendChild(nameText);

				const countryInline = document.createElement("div");
				countryInline.className = "d-flex align-items-center gap-1 text-muted small";
				countryInline.style.whiteSpace = "nowrap";
				if (lead.Bandera) {
					const flag = document.createElement("img");
					flag.src = lead.Bandera;
					flag.alt = lead.Pais ? "Bandera de " + lead.Pais : "Bandera";
					flag.width = 16;
					flag.height = 12;
					flag.loading = "lazy";
					flag.style.objectFit = "cover";
					flag.style.borderRadius = "2px";
					countryInline.appendChild(flag);
				}
				const countryText = document.createElement("span");
				countryText.textContent = lead.Pais || "-";
				countryInline.appendChild(countryText);
				nameRow.appendChild(nameBlock);
				nameRow.appendChild(countryInline);

				const brokerRow = document.createElement("div");
				brokerRow.className = "text-muted small mt-1";
				brokerRow.textContent = "Broker: " + (lead.Broker || "-");

				const objetivoRow = document.createElement("div");
				objetivoRow.className = "text-muted small";
				objetivoRow.textContent = "Objetivo: " + (lead.Objetivo || "-");

				const badges = document.createElement("div");
				badges.className = "d-flex flex-wrap gap-2 mt-2";
				const estadoBadge = createBadge(lead.Estado, stateColors[lead.Estado]);
				const clasificacionBadge = createBadge(lead.Clasificacion, classificationColors[lead.Clasificacion]);
				badges.appendChild(estadoBadge);
				badges.appendChild(clasificacionBadge);

				const starsRow = renderStars(lead.Estrellas);

				body.appendChild(nameRow);
				body.appendChild(brokerRow);
				body.appendChild(objetivoRow);
				if (starsRow) {
					body.appendChild(starsRow);
				}
				body.appendChild(badges);

				leadCard.appendChild(body);
				list.appendChild(leadCard);
			});

			card.appendChild(header);
			card.appendChild(list);
			col.appendChild(card);
			board.appendChild(col);
		});

		updateEmptyStates();
		initBoardDrag();
		initFixedDrops();
		if (window.feather && typeof window.feather.replace === "function") {
			window.feather.replace();
		}
		requestAnimationFrame(syncSummaryHeights);
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

	const loadBoard = async () => {
		if (!select || !select.value || isLoading) {
			return;
		}
		clearAlert();
		setLoading(true);
		try {
			const response = await fetch("https://auto.myduomarkets.com/webhook/api/funnels/kanban", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					IdFunnel: select.value
				})
			});
			const data = await response.json();
			if (!data || data.success === false) {
				showAlert("No se pudo cargar el funnel.");
				clearBoard();
				return;
			}
			const payload = Array.isArray(data) ? data[0] : data;
			if (!payload || !payload.Etapas || !payload.Leads) {
				showAlert("Respuesta incompleta del webhook.");
				clearBoard();
				return;
			}
			renderBoard(payload);
		} catch (error) {
			showAlert("Error al cargar el funnel.");
			clearBoard();
		} finally {
			setLoading(false);
		}
	};

	if (select && button) {
		select.addEventListener("change", () => {
			button.disabled = !select.value || isLoading;
		});
		button.addEventListener("click", () => {
			loadBoard();
		});
	}

	if (board) {
		board.addEventListener("pointerdown", (event) => {
			const card = event.target.closest(".funnel-lead-card");
			if (!card) {
				return;
			}
			pointerLeadCard = card;
			pointerStart = { x: event.clientX, y: event.clientY };
		});
		board.addEventListener("pointerup", (event) => {
			if (!pointerLeadCard || !pointerStart) {
				return;
			}
			const deltaX = Math.abs(event.clientX - pointerStart.x);
			const deltaY = Math.abs(event.clientY - pointerStart.y);
			const isClick = deltaX < 6 && deltaY < 6;
			const targetCard = pointerLeadCard;
			pointerLeadCard = null;
			pointerStart = null;
			if (!isClick || isDraggingLead) {
				return;
			}
			if (targetCard) {
				openLeadModal();
			}
		});
	}

	if (leadModalElement && !(window.bootstrap && typeof window.bootstrap.Modal === "function")) {
		const closeBtn = leadModalElement.querySelector(".btn-close");
		if (closeBtn) {
			closeBtn.addEventListener("click", (event) => {
				event.preventDefault();
				closeLeadModal();
			});
		}
	}

	window.addEventListener("resize", () => {
		if (headerCard && !headerCard.classList.contains("d-none")) {
			syncSummaryHeights();
		}
	});

	loadFunnels();
});
