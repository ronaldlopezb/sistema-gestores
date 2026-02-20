document.addEventListener("DOMContentLoaded", () => {
	const tableCard = document.getElementById("evaluaciones-rapidas-table");
	const tableBody = document.getElementById("evaluaciones-rapidas-body");
	const emptyState = document.getElementById("evaluaciones-rapidas-empty");
	const pagination = document.getElementById("evaluaciones-rapidas-pagination");
	const totalLabel = document.getElementById("evaluaciones-rapidas-total");
	const rangeLabel = document.getElementById("evaluaciones-rapidas-range");
	const prevButton = document.getElementById("evaluaciones-rapidas-prev");
	const nextButton = document.getElementById("evaluaciones-rapidas-next");
	const baseUrl = window.appBaseUrl || "";
	const token = localStorage.getItem("auth_token") || "";
	const estadoValue = tableCard ? tableCard.dataset.estado : "";
	let pageSize = 20;
	let currentPage = 1;
	let cachedRows = [];

	const stateColors = {
		"Recien llegado": "#1B6CA8",
		"Trabajando": "#73C992",
		"Vendido": "#E67BB0",
		"Vendidos": "#E67BB0",
		"Anular": "#E04B4B",
		"Anulado": "#E04B4B",
		"Anulados": "#E04B4B",
		"Con Evaluación Profesional": "#3B7DDD"
	};

	const stateIcons = {
		"Recien llegado": "user-plus",
		"Trabajando": "briefcase",
		"Vendido": "shopping-cart",
		"Vendidos": "shopping-cart",
		"Anular": "x-circle",
		"Anulado": "x-circle",
		"Anulados": "x-circle",
		"Con Evaluación Profesional": "layers"
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

			tr.appendChild(fechaRegistro);

			const lead = document.createElement("td");
			lead.textContent = item.Lead || "-";
			tr.appendChild(lead);

			const pais = document.createElement("td");
			if (item.Bandera) {
				const flag = document.createElement("img");
				flag.src = item.Bandera;
				flag.alt = item.Pais ? "Bandera de " + item.Pais : "Bandera";
				flag.width = 16;
				flag.height = 12;
				flag.loading = "lazy";
				flag.style.objectFit = "cover";
				flag.style.marginRight = "6px";
				flag.style.verticalAlign = "middle";
				pais.appendChild(flag);
			}
			pais.appendChild(document.createTextNode(item.Pais || "-"));
			tr.appendChild(pais);

			const broker = document.createElement("td");
			broker.textContent = item.BrokerActual || "-";
			tr.appendChild(broker);

			const objetivo = document.createElement("td");
			objetivo.textContent = item.ObjetivoPrincipal || "-";
			tr.appendChild(objetivo);

			const estado = document.createElement("td");
			const estadoColor = stateColors[item.Estado] || "#6C757D";
			const estadoIcon = stateIcons[item.Estado];
			estado.appendChild(createBadge(item.Estado, estadoColor, estadoIcon));
			tr.appendChild(estado);

			const accion = document.createElement("td");
			accion.className = "text-end";
			const link = document.createElement("a");
			const ider = encodeURIComponent(item.IDER || "");
			link.href = baseUrl + "/pages/eva-rapida/eva-rapida.php?IDER=" + ider;
			link.className = "btn btn-sm btn-primary rounded-pill";
			link.textContent = "Ver Eva. Rápida";
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
			totalLabel.textContent = "Total de evaluaciones: " + total;
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
			const response = await fetch("https://auto.myduomarkets.com/webhook/ic/evalucaionesrapidas", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					token,
					estado: estadoValue || "Recien llegado"
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
				if (data.length && data[0] && data[0].Tabla) {
					rows = data
						.map((item) => {
							if (!item || !item.Tabla) {
								return null;
							}
							return {
								...item.Tabla,
								CantidadListados: item.CantidadListados !== undefined ? item.CantidadListados : item.CantidadListado
							};
						})
						.filter(Boolean);
					const first = data.find((item) => item && (item.CantidadListados !== undefined || item.CantidadListado !== undefined));
					if (first) {
						cantidadListados = first.CantidadListados !== undefined ? first.CantidadListados : first.CantidadListado;
					}
				} else if (data.length === 1 && data[0] && Array.isArray(data[0].data)) {
					rows = data[0].data;
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
