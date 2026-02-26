document.addEventListener("DOMContentLoaded", () => {
	const listCard = document.getElementById("funnels-card");
	const grid = document.getElementById("funnels-grid");
	const emptyState = document.getElementById("funnels-empty");
	const pagination = document.getElementById("funnels-pagination");
	const totalLabel = document.getElementById("funnels-total");
	const rangeLabel = document.getElementById("funnels-range");
	const prevButton = document.getElementById("funnels-prev");
	const nextButton = document.getElementById("funnels-next");
	const deleteModalEl = document.getElementById("delete-funnel-modal");
	const deleteTitle = document.getElementById("delete-funnel-title");
	const deleteDescription = document.getElementById("delete-funnel-description");
	const deleteEtapas = document.getElementById("delete-funnel-etapas");
	const deleteLeads = document.getElementById("delete-funnel-leads");
	const deleteStatus = document.getElementById("delete-funnel-status");
	const deleteDate = document.getElementById("delete-funnel-date");
	const deleteId = document.getElementById("delete-funnel-id");
	const deleteConfirm = document.getElementById("delete-funnel-confirm");
	const deleteAction = document.getElementById("delete-funnel-action");
	const deleteSuccessMessage = document.getElementById("delete-success-message");
	const updateSuccessMessage = document.getElementById("update-success-message");
	const createSuccessMessage = document.getElementById("create-success-message");
	const token = localStorage.getItem("auth_token") || "";
	const baseUrl = window.appBaseUrl || "";
	let pageSize = 15;
	let currentPage = 1;
	let cachedRows = [];
	let deleteModalInstance = null;
	let selectedFunnelId = null;

	const showEmpty = () => {
		if (listCard) {
			listCard.classList.add("d-none");
		}
		if (pagination) {
			pagination.classList.add("d-none");
		}
		if (emptyState) {
			emptyState.classList.remove("d-none");
		}
	};

	const showTable = () => {
		if (listCard) {
			listCard.classList.remove("d-none");
		}
		if (pagination) {
			pagination.classList.remove("d-none");
		}
		if (emptyState) {
			emptyState.classList.add("d-none");
		}
	};

	const createBadge = (label, isActive) => {
		const span = document.createElement("span");
		span.className = "badge rounded-pill";
		span.textContent = label;
		span.style.color = "#fff";
		span.style.backgroundColor = isActive ? "#2EAE6E" : "#E04B4B";
		return span;
	};

	const normalizeDeleteConfirm = (value) => {
		const trimmed = value.trim();
		return trimmed;
	};

	const showDeleteModalFallback = () => {
		if (!deleteModalEl) {
			return;
		}
		deleteModalEl.style.display = "block";
		deleteModalEl.classList.add("show");
		deleteModalEl.removeAttribute("aria-hidden");
		deleteModalEl.setAttribute("aria-modal", "true");
		document.body.classList.add("modal-open");
		const backdrop = document.createElement("div");
		backdrop.className = "modal-backdrop fade show";
		backdrop.dataset.deleteModalBackdrop = "true";
		document.body.appendChild(backdrop);
	};

	const hideDeleteModalFallback = () => {
		if (!deleteModalEl) {
			return;
		}
		deleteModalEl.classList.remove("show");
		deleteModalEl.setAttribute("aria-hidden", "true");
		deleteModalEl.removeAttribute("aria-modal");
		deleteModalEl.style.display = "none";
		document.body.classList.remove("modal-open");
		const backdrop = document.querySelector("[data-delete-modal-backdrop]");
		if (backdrop) {
			backdrop.remove();
		}
	};

	const updateDeleteActionState = () => {
		if (!deleteConfirm || !deleteAction) {
			return;
		}
		const rawValue = deleteConfirm.value;
		const value = normalizeDeleteConfirm(rawValue);
		const hasSpaces = /\s/.test(rawValue);
		const matches = value.toLowerCase() === "eliminar" && !hasSpaces;
		deleteAction.disabled = !matches;
	};

	const showTimedMessage = (element) => {
		if (!element) {
			return;
		}
		element.classList.remove("d-none");
		element.style.display = "flex";
		if (window.feather && typeof window.feather.replace === "function") {
			window.feather.replace();
		}
		window.setTimeout(() => {
			element.classList.add("d-none");
			element.style.display = "none";
		}, 3000);
	};

	const openDeleteModal = (item) => {
		const hasBootstrapModal = window.bootstrap && typeof window.bootstrap.Modal === "function";
		if (hasBootstrapModal && !deleteModalInstance) {
			deleteModalInstance = new window.bootstrap.Modal(deleteModalEl);
		}
		selectedFunnelId = item.IdFunnel || null;
		const isActive = item.Activo === true || item.Activo === 1 || item.Activo === "1" || item.Activo === "true";
		if (deleteTitle) {
			deleteTitle.textContent = item.Nombre || "-";
		}
		if (deleteDescription) {
			deleteDescription.textContent = item.Descripcion || "Sin descripcion";
		}
		if (deleteEtapas) {
			deleteEtapas.textContent = item.CantidadEtapas ?? 0;
		}
		if (deleteLeads) {
			deleteLeads.textContent = item.CantidadLeadsEnFunnel ?? 0;
		}
		if (deleteStatus) {
			deleteStatus.textContent = isActive ? "Activo" : "Inactivo";
		}
		if (deleteDate) {
			deleteDate.textContent = "Creado: " + (item.FechaCreacion || "-");
		}
		if (deleteId) {
			const idValue = item.IdFunnel ? item.IdFunnel : "-";
			deleteId.textContent = "ID: " + idValue;
		}
		if (deleteConfirm) {
			deleteConfirm.value = "";
		}
		if (deleteAction) {
			deleteAction.disabled = true;
			deleteAction.textContent = "Eliminar";
		}
		updateDeleteActionState();
		if (deleteModalInstance) {
			deleteModalInstance.show();
		} else {
			showDeleteModalFallback();
		}
	};

	const syncDescriptionHeights = () => {
		if (!grid) {
			return;
		}
		const descriptions = Array.from(grid.querySelectorAll(".funnel-description"));
		if (!descriptions.length) {
			return;
		}
		descriptions.forEach((block) => {
			block.style.minHeight = "0";
		});
		let maxHeight = 0;
		descriptions.forEach((block) => {
			const height = block.getBoundingClientRect().height;
			if (height > maxHeight) {
				maxHeight = height;
			}
		});
		if (maxHeight > 0) {
			descriptions.forEach((block) => {
				block.style.minHeight = maxHeight + "px";
			});
		}
	};

	const renderCards = (rows) => {
		if (!grid) {
			return;
		}

		grid.innerHTML = "";

		rows.forEach((item) => {
			const col = document.createElement("div");
			col.className = "col-12 col-md-6 col-xl-4";

			const isActive = item.Activo === true || item.Activo === 1 || item.Activo === "1" || item.Activo === "true";
			const card = document.createElement("div");
			card.className = "card shadow-sm rounded-4";
			card.style.borderLeft = "4px solid " + (isActive ? "#0d6efd" : "#dc3545");

			const cardBody = document.createElement("div");
			cardBody.className = "card-body d-flex flex-column pt-3 pb-3";

			const header = document.createElement("div");
			header.className = "d-flex justify-content-between align-items-start gap-2 mb-1";

			const titleWrap = document.createElement("div");
			titleWrap.style.minHeight = "3.2rem";

			const titleRow = document.createElement("div");
			titleRow.className = "d-flex align-items-center gap-2";

			const titleIcon = document.createElement("span");
			titleIcon.className = "d-inline-flex align-items-center justify-content-center rounded-3";
			titleIcon.style.width = "32px";
			titleIcon.style.height = "32px";
			titleIcon.style.color = isActive ? "#0d6efd" : "#dc3545";
			titleIcon.style.background = isActive ? "#e7f1ff" : "#fdeaea";
			titleIcon.innerHTML = '<i data-feather="filter"></i>';

			const title = document.createElement("h5");
			title.className = "card-title mb-0 fs-4 fw-bold text-dark";
			title.style.lineHeight = "1.2";
			title.textContent = item.Nombre || "-";

			const actionIcons = document.createElement("div");
			actionIcons.className = "d-flex gap-2";

			const descriptionWrap = document.createElement("div");
			descriptionWrap.className = "funnel-description mt-1 px-3 py-2 rounded-3";
			descriptionWrap.style.background = "#fffaf2";
			descriptionWrap.style.marginBottom = "10px";

			const description = document.createElement("p");
			description.className = "card-text text-muted mb-0 fst-italic";
			description.style.fontSize = "0.9rem";
			description.textContent = item.Descripcion || "Sin descripcion";
			descriptionWrap.appendChild(description);

			const meta = document.createElement("div");
			meta.className = "text-muted small mt-0 mb-0";
			meta.textContent = "Creado: " + (item.FechaCreacion || "-");

			const stats = document.createElement("div");
			stats.className = "row g-0 bg-light rounded-3 px-2 py-1 mb-2 small";
			const leads = item.CantidadLeadsEnFunnel ?? 0;
			const etapas = item.CantidadEtapas ?? 0;

			const leadsItem = document.createElement("div");
			leadsItem.className = "col-6 d-flex align-items-center gap-1";
			leadsItem.innerHTML = '<i data-feather="users" class="text-primary"></i><span class="text-muted">Leads:</span><span class="fw-semibold">' + leads + "</span>";

			const etapasItem = document.createElement("div");
			etapasItem.className = "col-6 d-flex align-items-center gap-1";
			etapasItem.innerHTML = '<i data-feather="layers" class="text-primary"></i><span class="text-muted">Etapas:</span><span class="fw-semibold">' + etapas + "</span>";

			stats.appendChild(etapasItem);
			stats.appendChild(leadsItem);

			const link = document.createElement("a");
			const idFunnel = encodeURIComponent(item.IdFunnel || "");
			link.href = baseUrl + "/pages/funnels/editar-funnel.php?IdFunnel=" + idFunnel;
			link.className = "btn btn-link p-0 text-primary";
			link.innerHTML = '<i data-feather="edit-2"></i>';
			link.setAttribute("aria-label", "Editar");

		const deleteButton = document.createElement("button");
		deleteButton.type = "button";
		deleteButton.className = "btn btn-link p-0 text-danger";
		deleteButton.innerHTML = '<i data-feather="trash-2"></i>';
			deleteButton.setAttribute("aria-label", "Borrar");
			deleteButton.disabled = item.Borrar === false || item.Borrar === 0 || item.Borrar === "0" || item.Borrar === "false";
		if (deleteButton.disabled) {
			deleteButton.classList.add("text-muted");
			deleteButton.classList.add("opacity-50");
		}
		deleteButton.addEventListener("click", () => {
			if (deleteButton.disabled) {
				return;
			}
			openDeleteModal(item);
		});

			actionIcons.appendChild(link);
			actionIcons.appendChild(deleteButton);

			const statusButton = document.createElement("div");
			statusButton.className = "btn btn-sm w-100 rounded-3";
			statusButton.textContent = isActive ? "Activo" : "Inactivo";
			statusButton.style.background = isActive ? "#0d6efd" : "#dc3545";
			statusButton.style.borderColor = isActive ? "#0d6efd" : "#dc3545";
			statusButton.style.color = "#ffffff";
			statusButton.style.fontSize = "0.95rem";
			statusButton.style.cursor = "default";
			statusButton.style.textDecoration = "none";

			titleRow.appendChild(titleIcon);
			titleRow.appendChild(title);
			titleWrap.appendChild(titleRow);
			header.appendChild(titleWrap);
			header.appendChild(actionIcons);
			const footer = document.createElement("div");
			footer.appendChild(stats);
			footer.appendChild(statusButton);
			footer.appendChild(meta);

			cardBody.appendChild(header);
			cardBody.appendChild(descriptionWrap);
			cardBody.appendChild(footer);
			card.appendChild(cardBody);
			col.appendChild(card);
			grid.appendChild(col);
		});

		if (window.feather && typeof window.feather.replace === "function") {
			window.feather.replace();
		}
		requestAnimationFrame(() => {
			syncDescriptionHeights();
		});
	};

	if (updateSuccessMessage && window.sessionStorage) {
		const updatedFlag = window.sessionStorage.getItem("funnel_updated");
		if (updatedFlag === "1") {
			window.sessionStorage.removeItem("funnel_updated");
			showTimedMessage(updateSuccessMessage);
		}
	}

	if (createSuccessMessage && window.sessionStorage) {
		const createdFlag = window.sessionStorage.getItem("funnel_created");
		if (createdFlag === "1") {
			window.sessionStorage.removeItem("funnel_created");
			showTimedMessage(createSuccessMessage);
		}
	}

	if (deleteConfirm) {
		deleteConfirm.addEventListener("input", () => {
			updateDeleteActionState();
		});
	}

	if (deleteAction) {
		deleteAction.addEventListener("click", async () => {
			if (deleteAction.disabled || !selectedFunnelId) {
				return;
			}
			deleteAction.disabled = true;
			deleteAction.innerHTML = "<span class=\"delete-spinner me-2\"></span>Eliminando";
			try {
				const response = await fetch("https://auto.myduomarkets.com/webhook/api/funnels/delete", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						IdFunnel: selectedFunnelId
					})
				});
				const data = await response.json();
				if (data && data.success === true) {
					if (deleteModalInstance) {
						deleteModalInstance.hide();
					} else {
						hideDeleteModalFallback();
					}
					fetchData();
					showTimedMessage(deleteSuccessMessage);
					return;
				}
			} catch (error) {
				// no-op
			}
			deleteAction.textContent = "Eliminar";
			updateDeleteActionState();
		});
	}

	if (deleteModalEl) {
		deleteModalEl.addEventListener("hidden.bs.modal", () => {
			if (deleteConfirm) {
				deleteConfirm.value = "";
			}
			if (deleteAction) {
				deleteAction.textContent = "Eliminar";
			}
			updateDeleteActionState();
		});
		const dismissButtons = deleteModalEl.querySelectorAll('[data-bs-dismiss="modal"]');
		dismissButtons.forEach((button) => {
			button.addEventListener("click", () => {
				if (!deleteModalInstance) {
					hideDeleteModalFallback();
				}
			});
		});
	}

	const updatePagination = () => {
		const total = cachedRows.length;
		const totalPages = Math.ceil(total / pageSize) || 1;

		if (currentPage > totalPages) {
			currentPage = totalPages;
		}

		const startIndex = (currentPage - 1) * pageSize;
		const endIndex = Math.min(startIndex + pageSize, total);
		const visibleRows = cachedRows.slice(startIndex, endIndex);

		if (totalLabel) {
			totalLabel.textContent = "Total de funnels: " + total;
		}

		if (rangeLabel) {
			const startLabel = total === 0 ? 0 : startIndex + 1;
			rangeLabel.textContent = startLabel + "-" + endIndex + " de " + total;
		}

		if (prevButton) {
			prevButton.disabled = currentPage <= 1;
		}
		if (nextButton) {
			nextButton.disabled = endIndex >= total;
		}

		renderCards(visibleRows);
	};

	const fetchData = async () => {
		try {
			const response = await fetch("https://auto.myduomarkets.com/webhook/api/funnels/list", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					token,
					Tipo: "Tabla"
				})
			});

			const data = await response.json();
			if (!data || data.success === false) {
				showEmpty();
				return;
			}

			const rows = Array.isArray(data)
				? data
				: Array.isArray(data.data)
					? data.data
					: [];

			if (!rows.length) {
				showEmpty();
				return;
			}

			cachedRows = rows;
			currentPage = 1;
			showTable();
			updatePagination();
		} catch (error) {
			showEmpty();
		}
	};

	if (prevButton) {
		prevButton.addEventListener("click", () => {
			if (currentPage > 1) {
				currentPage -= 1;
				updatePagination();
			}
		});
	}

	if (nextButton) {
		nextButton.addEventListener("click", () => {
			const total = cachedRows.length;
			const totalPages = Math.ceil(total / pageSize) || 1;
			if (currentPage < totalPages) {
				currentPage += 1;
				updatePagination();
			}
		});
	}

	fetchData();
});
