document.addEventListener("DOMContentLoaded", () => {
	const tableCard = document.getElementById("recien-llegados-table");
	const tableBody = document.getElementById("recien-llegados-body");
	const emptyState = document.getElementById("recien-llegados-empty");
	const pagination = document.getElementById("recien-llegados-pagination");
	const totalLabel = document.getElementById("recien-llegados-total");
	const rangeLabel = document.getElementById("recien-llegados-range");
	const prevButton = document.getElementById("recien-llegados-prev");
	const nextButton = document.getElementById("recien-llegados-next");
	const baseUrl = window.appBaseUrl || "";
	const token = localStorage.getItem("auth_token") || "";
	let pageSize = 20;
	let currentPage = 1;
	let cachedRows = [];

	const classificationColors = {
		"Bajo Potencial": "#1B6CA8",
		"En Desarrollo": "#4FB3E6",
		"Buen Prospecto": "#2EAE6E",
		"Alta Promesa": "#E67BB0"
	};

	const classificationIcons = {
		"Bajo Potencial": "trending-down",
		"En Desarrollo": "trending-up",
		"Buen Prospecto": "thumbs-up",
		"Alta Promesa": "star"
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

	const stateIcons = {
		"Recien llegado": "user-plus",
		"Trabajando": "briefcase",
		"Vendido": "shopping-cart",
		"Vendidos": "shopping-cart",
		"Anular": "x-circle",
		"Anulado": "x-circle",
		"Anulados": "x-circle"
	};

	const createBadge = (text, color, iconName) => {
		const span = document.createElement("span");
		span.className = "badge";
		if (iconName) {
			const icon = document.createElement("i");
			icon.setAttribute("data-feather", iconName);
			icon.className = "me-1";
			icon.style.width = "12px";
			icon.style.height = "12px";
			span.appendChild(icon);
		}
		span.appendChild(document.createTextNode(text || "-"));
		span.style.backgroundColor = color || "#6C757D";
		span.style.color = "#fff";
		return span;
	};

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

	const renderRows = (rows) => {
		if (!tableBody) {
			return;
		}

		tableBody.innerHTML = "";

		rows.forEach((item) => {
			const tr = document.createElement("tr");

			const fechaRegistro = document.createElement("td");
			const fechaText = document.createElement("span");
			fechaText.className = "d-block";
			fechaText.textContent = item.Fecha || "-";
			fechaRegistro.appendChild(fechaText);

			if (item.Hora) {
				const horaText = document.createElement("span");
				horaText.className = "d-block text-muted small";
				horaText.innerHTML = "<i data-feather=\"clock\" class=\"me-1\" style=\"width:12px;height:12px;\"></i>" + item.Hora;
				fechaRegistro.appendChild(horaText);
			}

			const registroBadge = document.createElement("span");
			registroBadge.className = "badge bg-primary mt-1";
			registroBadge.textContent = item.Registro || "-";
			fechaRegistro.appendChild(registroBadge);

			tr.appendChild(fechaRegistro);

			const lead = document.createElement("td");
			if (item.EsProspecto === true) {
				const icon = document.createElement("i");
				icon.setAttribute("data-feather", "star");
				icon.setAttribute("fill", "#fcb92c");
				icon.setAttribute("stroke", "#fcb92c");
				icon.className = "me-1";
				icon.style.width = "12px";
				icon.style.height = "12px";
				icon.style.color = "#fcb92c";
				lead.appendChild(icon);
			}
			lead.appendChild(document.createTextNode(item.Lead || "-"));
			tr.appendChild(lead);

			const pais = document.createElement("td");
			pais.textContent = item.Pais || "-";
			tr.appendChild(pais);

			const broker = document.createElement("td");
			broker.textContent = item.Broker || "-";
			tr.appendChild(broker);

			const clasificacion = document.createElement("td");
			const clasificacionColor = classificationColors[item.Clasificacion] || "#6C757D";
			const clasificacionIcon = classificationIcons[item.Clasificacion];
			clasificacion.appendChild(createBadge(item.Clasificacion, clasificacionColor, clasificacionIcon));
			tr.appendChild(clasificacion);

			const estado = document.createElement("td");
			const estadoColor = stateColors[item.Estado] || "#6C757D";
			const estadoIcon = stateIcons[item.Estado];
			estado.appendChild(createBadge(item.Estado, estadoColor, estadoIcon));
			tr.appendChild(estado);

			const accion = document.createElement("td");
			accion.className = "text-end";
			const link = document.createElement("a");
			const idic = encodeURIComponent(item.IDIC || "");
			link.href = baseUrl + "/pages/lead/detalle.php?idic=" + idic;
			link.className = "btn btn-sm btn-primary rounded-pill";
			link.textContent = "Ver lead";
			accion.appendChild(link);
			tr.appendChild(accion);

			tableBody.appendChild(tr);
		});

		if (window.feather && typeof window.feather.replace === "function") {
			window.feather.replace();
		}
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
			totalLabel.textContent = "Total de leads: " + total;
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
			const response = await fetch("https://auto.myduomarkets.com/webhook/ic/lead", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
			body: JSON.stringify({
				tipo: "Estado",
				valor: "Vendido",
				token
			})
		});

			const data = await response.json();

			if (!data || data.success === false) {
				showEmpty();
				return;
			}

			let rows = [];
			let cantidadListados = null;
			if (Array.isArray(data)) {
				if (data.length === 1 && data[0] && Array.isArray(data[0].data)) {
					rows = data[0].data;
				} else if (data.length && data[0] && data[0].Tabla) {
					rows = data.map((item) => item && item.Tabla).filter(Boolean);
					const first = data.find((item) => item && (item.CantidadListados !== undefined || item.CantidadListado !== undefined));
					if (first) {
						cantidadListados = first.CantidadListados !== undefined ? first.CantidadListados : first.CantidadListado;
					}
				} else {
					rows = data;
				}
			} else if (Array.isArray(data.data)) {
				rows = data.data;
				if (data.CantidadListados !== undefined || data.CantidadListado !== undefined) {
					cantidadListados = data.CantidadListados !== undefined ? data.CantidadListados : data.CantidadListado;
				}
			} else if (data && typeof data === "object") {
				rows = [data.Tabla || data];
				if (data.CantidadListados !== undefined || data.CantidadListado !== undefined) {
					cantidadListados = data.CantidadListados !== undefined ? data.CantidadListados : data.CantidadListado;
				}
			}

			if (cantidadListados !== null && cantidadListados !== undefined) {
				const parsedCantidad = parseInt(cantidadListados, 10);
				if (!Number.isNaN(parsedCantidad) && parsedCantidad > 0) {
					pageSize = parsedCantidad;
				}
			}

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
