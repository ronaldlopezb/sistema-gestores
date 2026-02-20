document.addEventListener("DOMContentLoaded", () => {
	const tableCard = document.getElementById("funnels-table");
	const tableBody = document.getElementById("funnels-body");
	const emptyState = document.getElementById("funnels-empty");
	const pagination = document.getElementById("funnels-pagination");
	const totalLabel = document.getElementById("funnels-total");
	const rangeLabel = document.getElementById("funnels-range");
	const prevButton = document.getElementById("funnels-prev");
	const nextButton = document.getElementById("funnels-next");
	const token = localStorage.getItem("auth_token") || "";
	const baseUrl = window.appBaseUrl || "";
	let pageSize = 15;
	let currentPage = 1;
	let cachedRows = [];

	const showEmpty = () => {
		if (tableCard) {
			tableCard.classList.add("d-none");
		}
		if (pagination) {
			pagination.classList.add("d-none");
		}
		if (emptyState) {
			emptyState.classList.remove("d-none");
		}
	};

	const showTable = () => {
		if (tableCard) {
			tableCard.classList.remove("d-none");
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
		span.className = "badge";
		span.textContent = label;
		span.style.color = "#fff";
		span.style.backgroundColor = isActive ? "#2EAE6E" : "#E04B4B";
		return span;
	};

	const renderRows = (rows) => {
		if (!tableBody) {
			return;
		}

		tableBody.innerHTML = "";

		rows.forEach((item) => {
			const tr = document.createElement("tr");

			const fecha = document.createElement("td");
			fecha.textContent = item.FechaCreacion || "-";
			tr.appendChild(fecha);

			const nombre = document.createElement("td");
			nombre.textContent = item.Nombre || "-";
			tr.appendChild(nombre);

			const descripcion = document.createElement("td");
			descripcion.textContent = item.Descripcion || "-";
			tr.appendChild(descripcion);

			const estado = document.createElement("td");
			const isActive = item.Activo === true || item.Activo === 1 || item.Activo === "1" || item.Activo === "true";
			estado.appendChild(createBadge(isActive ? "Activo" : "Inactivo", isActive));
			tr.appendChild(estado);

			const accion = document.createElement("td");
			accion.className = "text-end";
			const link = document.createElement("a");
			const idFunnel = encodeURIComponent(item.IdFunnel || "");
			link.href = baseUrl + "/pages/funnels/editar-funnel.php?IdFunnel=" + idFunnel;
			link.className = "btn btn-sm btn-outline-primary";
			link.textContent = "Editar";
			accion.appendChild(link);
			tr.appendChild(accion);

			tableBody.appendChild(tr);
		});
	};

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

		renderRows(visibleRows);
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
