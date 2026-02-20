document.addEventListener("DOMContentLoaded", () => {
	const lineCanvas = document.getElementById("chartjs-dashboard-line");
	const clasificacionAltCanvas = document.getElementById("chartjs-prospectos-clasificacion-alt");
	const avanceAltCanvas = document.getElementById("chartjs-prospectos-avance-alt");
	const filtroPeriodo = document.getElementById("filtro-periodo");
	const filtroDesde = document.getElementById("filtro-desde");
	const filtroHasta = document.getElementById("filtro-hasta");
	const filtroAplicar = document.getElementById("filtro-aplicar");
	const filtroDesdeLabel = document.querySelector("label[for=\"filtro-desde\"]");
	const kpiLeadsNuevos = document.getElementById("kpi-leads-nuevos");
	const kpiLeadsNuevosVar = document.getElementById("kpi-leads-nuevos-var");
	const kpiLeadsTrabajo = document.getElementById("kpi-leads-trabajo");
	const kpiLeadsTrabajoVar = document.getElementById("kpi-leads-trabajo-var");
	const kpiProspectosActivos = document.getElementById("kpi-prospectos-activos");
	const kpiProspectosActivosVar = document.getElementById("kpi-prospectos-activos-var");
	const kpiVendidos = document.getElementById("kpi-vendidos");
	const kpiVendidosVar = document.getElementById("kpi-vendidos-var");
	const periodoTitulo = document.getElementById("dashboard-periodo-titulo");
	const rankingPaisBody = document.getElementById("ranking-pais-body");
	const conversionPaisBody = document.getElementById("conversion-pais-body");
	const rankingBrokerBody = document.getElementById("ranking-broker-body");
	const topProspectosBody = document.getElementById("top-prospectos-body");
	const prospectosClasificacionBody = document.getElementById("prospectos-clasificacion-body");
	const prospectosAvanceBody = document.getElementById("prospectos-avance-body");
	const token = localStorage.getItem("auth_token") || "";
	const theme = window.theme || {};
	let dashboardLineChart = null;
	let clasificacionChart = null;
	let avanceChart = null;

	if (lineCanvas && window.Chart) {
		const ctx = lineCanvas.getContext("2d");
		const gradient = ctx.createLinearGradient(0, 0, 0, 225);
		gradient.addColorStop(0, "rgba(13, 110, 253, 0.35)");
		gradient.addColorStop(1, "rgba(13, 110, 253, 0)");

		dashboardLineChart = new Chart(lineCanvas, {
			type: "line",
			data: {
			labels: ["12am", "2am", "4am", "6am", "8am", "10am", "12pm", "2pm", "4pm", "6pm", "8pm", "10pm"],
			datasets: [
				{
					label: "Leads nuevos",
					fill: true,
					backgroundColor: gradient,
					borderColor: theme.primary || "#0d6efd",
					pointBackgroundColor: theme.primary || "#0d6efd",
					data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
				},
				{
					label: "Vendidos",
					fill: false,
					borderColor: theme.success || "#2e7d32",
					pointBackgroundColor: theme.success || "#2e7d32",
					data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
				}
			]
		},
		options: {
				maintainAspectRatio: false,
				legend: {
					display: true,
					position: "bottom"
				},
				tooltips: {
					intersect: false
				},
				hover: {
					intersect: true
				},
				plugins: {
					filler: {
						propagate: false
					}
				},
				scales: {
				xAxes: [
					{
						gridLines: {
							color: "rgba(0,0,0,0.0)"
						}
					}
				],
				yAxes: [
					{
						beginAtZero: true,
						ticks: {
							stepSize: 1,
							suggestedMax: 1
						},
						display: true,
						borderDash: [3, 3],
						gridLines: {
							color: "rgba(0,0,0,0.0)"
						}
					}
				]
			}
		}
	});
	}

	const setVariation = (element, value) => {
		if (!element) {
			return;
		}
		element.textContent = value || "";
		const numeric = parseFloat(String(value || "").replace(/[^0-9.-]/g, ""));
		element.classList.remove("text-success", "text-danger");
		if (!isNaN(numeric) && numeric <= 0) {
			element.classList.add("text-danger");
			return;
		}
		element.classList.add("text-success");
	};

	const updateDashboardFila2 = (fila2) => {
		if (!fila2 || typeof fila2 !== "object") {
			return;
		}
		const kpis = fila2.Kpis || {};
		if (kpis.LeadNuevos && kpiLeadsNuevos) {
			kpiLeadsNuevos.textContent = kpis.LeadNuevos.Valor ?? "";
			setVariation(kpiLeadsNuevosVar, kpis.LeadNuevos.Variacion);
		}
		if (kpis.LeadTrabajo && kpiLeadsTrabajo) {
			kpiLeadsTrabajo.textContent = kpis.LeadTrabajo.Valor ?? "";
			setVariation(kpiLeadsTrabajoVar, kpis.LeadTrabajo.Variacion);
		}
		if (kpis.ProspectosActivos && kpiProspectosActivos) {
			kpiProspectosActivos.textContent = kpis.ProspectosActivos.Valor ?? "";
			setVariation(kpiProspectosActivosVar, kpis.ProspectosActivos.Variacion);
		}
		if (kpis.Vendidos && kpiVendidos) {
			kpiVendidos.textContent = kpis.Vendidos.Valor ?? "";
			setVariation(kpiVendidosVar, kpis.Vendidos.Variacion);
		}

		const tendencia = fila2.TendenciaLead || {};
		const grafico = tendencia.GraficoTendencia || fila2.GraficoTendencia || tendencia || {};
		if (!dashboardLineChart || !grafico.labels || !grafico.leads || !grafico.vendidos) {
			return;
		}
		dashboardLineChart.data.labels = grafico.labels;
		if (dashboardLineChart.data.datasets && dashboardLineChart.data.datasets[0]) {
			dashboardLineChart.data.datasets[0].data = grafico.leads;
		}
		if (dashboardLineChart.data.datasets && dashboardLineChart.data.datasets[1]) {
			dashboardLineChart.data.datasets[1].data = grafico.vendidos;
		}
		dashboardLineChart.update();
	};

	const formatPercent = (value) => {
		if (value === null || value === undefined || value === "") {
			return "-";
		}
		const text = String(value).trim();
		if (!text) {
			return "-";
		}
		if (text.includes("%")) {
			return text;
		}
		const numeric = parseFloat(text.replace(/[^0-9.-]/g, ""));
		if (Number.isNaN(numeric)) {
			return text;
		}
		return numeric + "%";
	};

	const normalizePercent = (value) => {
		const numeric = parseFloat(String(value || "").replace(/[^0-9.-]/g, ""));
		if (Number.isNaN(numeric)) {
			return 0;
		}
		return Math.max(0, Math.min(100, numeric));
	};

	const clearTableBody = (tbody) => {
		if (!tbody) {
			return;
		}
		tbody.innerHTML = "";
	};

	const appendEmptyRow = (tbody, columns) => {
		if (!tbody) {
			return;
		}
		const tr = document.createElement("tr");
		const td = document.createElement("td");
		td.colSpan = columns;
		td.className = "text-center text-muted";
		td.textContent = "Sin datos";
		tr.appendChild(td);
		tbody.appendChild(tr);
	};

	const createCountryCell = (bandera, pais) => {
		const td = document.createElement("td");
		const wrapper = document.createElement("div");
		wrapper.className = "d-flex align-items-center gap-2";
		if (bandera) {
			const img = document.createElement("img");
			img.src = bandera;
			img.alt = pais || "Bandera";
			img.width = 20;
			img.height = 15;
			img.loading = "lazy";
			wrapper.appendChild(img);
		}
		const span = document.createElement("span");
		span.textContent = pais || "-";
		wrapper.appendChild(span);
		td.appendChild(wrapper);
		return td;
	};

	const renderRankingPorPais = (items) => {
		clearTableBody(rankingPaisBody);
		if (!rankingPaisBody) {
			return;
		}
		if (!Array.isArray(items) || !items.length) {
			appendEmptyRow(rankingPaisBody, 3);
			return;
		}
		items.forEach((item) => {
			const tr = document.createElement("tr");
			tr.appendChild(createCountryCell(item.Bandera, item.Pais));
			const leadsTd = document.createElement("td");
			leadsTd.className = "text-end";
			leadsTd.textContent = item.Leads ?? "-";
			tr.appendChild(leadsTd);
			const percentTd = document.createElement("td");
			percentTd.className = "text-end";
			percentTd.textContent = formatPercent(item.Porcentaje);
			tr.appendChild(percentTd);
			rankingPaisBody.appendChild(tr);
		});
	};

	const renderConversionPorPais = (items) => {
		clearTableBody(conversionPaisBody);
		if (!conversionPaisBody) {
			return;
		}
		if (!Array.isArray(items) || !items.length) {
			appendEmptyRow(conversionPaisBody, 3);
			return;
		}
		items.forEach((item) => {
			const tr = document.createElement("tr");
			tr.appendChild(createCountryCell(item.Bandera, item.Pais));
			const conversionTd = document.createElement("td");
			conversionTd.className = "text-end";
			conversionTd.textContent = formatPercent(item.Conversion);
			tr.appendChild(conversionTd);
			const leadsTd = document.createElement("td");
			leadsTd.className = "text-end";
			leadsTd.textContent = item.Leads ?? "-";
			tr.appendChild(leadsTd);
			conversionPaisBody.appendChild(tr);
		});
	};

	const renderRankingPorBroker = (items) => {
		clearTableBody(rankingBrokerBody);
		if (!rankingBrokerBody) {
			return;
		}
		if (!Array.isArray(items) || !items.length) {
			appendEmptyRow(rankingBrokerBody, 3);
			return;
		}
		items.forEach((item) => {
			const tr = document.createElement("tr");
			const brokerTd = document.createElement("td");
			brokerTd.textContent = item.Broker || "-";
			tr.appendChild(brokerTd);
			const leadsTd = document.createElement("td");
			leadsTd.className = "text-end";
			leadsTd.textContent = item.Leads ?? "-";
			tr.appendChild(leadsTd);
			const percentTd = document.createElement("td");
			percentTd.className = "text-end";
			percentTd.textContent = formatPercent(item.Porcentaje);
			tr.appendChild(percentTd);
			rankingBrokerBody.appendChild(tr);
		});
	};

	const getClasificacionBadge = (clasificacion) => {
		const normalized = String(clasificacion || "").trim();
		if (normalized === "Alta Promesa") {
			return { className: "bg-success", color: theme.success || "#2e7d32", textClass: "" };
		}
		if (normalized === "Buen Prospecto") {
			return { className: "bg-primary", color: theme.primary || "#0d6efd", textClass: "" };
		}
		if (normalized === "En Desarrollo") {
			return { className: "bg-warning", color: theme.warning || "#ffca28", textClass: "text-dark" };
		}
		if (normalized === "Bajo Potencial") {
			return { className: "bg-secondary", color: theme.secondary || "#6c757d", textClass: "" };
		}
		return { className: "bg-secondary", color: theme.secondary || "#6c757d", textClass: "" };
	};

	const getAvanceStyles = (percent) => {
		if (percent <= 30) {
			return { barColor: "#dc3545", badgeClass: "bg-danger", badgeTextClass: "" };
		}
		if (percent <= 60) {
			return { barColor: "#ffc107", badgeClass: "bg-warning", badgeTextClass: "text-dark" };
		}
		if (percent <= 75) {
			return { barColor: "#0dcaf0", badgeClass: "bg-info", badgeTextClass: "" };
		}
		return { barColor: "#198754", badgeClass: "bg-success", badgeTextClass: "" };
	};

	const resolveLeadLink = (value) => {
		const basePath = "pages/lead/detalle.php";
		if (!value) {
			return basePath;
		}
		const link = String(value).trim();
		if (!link) {
			return basePath;
		}
		if (link.startsWith("http://") || link.startsWith("https://")) {
			return link;
		}
		if (link.startsWith("?")) {
			return basePath + link;
		}
		if (link.startsWith("pages/")) {
			return link;
		}
		if (link.includes("idic=")) {
			return basePath + (link.startsWith("&") || link.startsWith("?") ? link : "?" + link);
		}
		return basePath;
	};

	const renderTopProspectos = (items) => {
		clearTableBody(topProspectosBody);
		if (!topProspectosBody) {
			return;
		}
		if (!Array.isArray(items) || !items.length) {
			appendEmptyRow(topProspectosBody, 6);
			return;
		}
		items.forEach((item) => {
			const tr = document.createElement("tr");

			const fechaTd = document.createElement("td");
			fechaTd.textContent = item.Fecha || "-";
			tr.appendChild(fechaTd);

			const prospectoTd = document.createElement("td");
			const nombre = document.createElement("div");
			nombre.className = "fw-semibold";
			nombre.textContent = item.Nombre || "-";
			const paisRow = document.createElement("div");
			paisRow.className = "d-flex align-items-center gap-2 text-muted small";
			if (item.Bandera) {
				const img = document.createElement("img");
				img.src = item.Bandera;
				img.alt = item.Pais || "Bandera";
				img.width = 20;
				img.height = 15;
				img.loading = "lazy";
				paisRow.appendChild(img);
			}
			const paisText = document.createElement("span");
			paisText.textContent = item.Pais || "-";
			paisRow.appendChild(paisText);
			prospectoTd.appendChild(nombre);
			prospectoTd.appendChild(paisRow);
			tr.appendChild(prospectoTd);

			const avanceTd = document.createElement("td");
			const avanceWrap = document.createElement("div");
			avanceWrap.className = "d-flex align-items-center gap-2";
			const avanceBarWrap = document.createElement("div");
			avanceBarWrap.className = "flex-grow-1";
			avanceBarWrap.style.height = "8px";
			avanceBarWrap.style.backgroundColor = "rgba(13, 110, 253, 0.12)";
			avanceBarWrap.style.border = "1px solid rgba(13, 110, 253, 0.2)";
			avanceBarWrap.style.borderRadius = "999px";
			avanceBarWrap.style.overflow = "hidden";
			const rawAvance = item.Avance;
			const hasAvance = rawAvance !== null && rawAvance !== undefined && rawAvance !== "";
			const avanceValue = hasAvance ? normalizePercent(rawAvance) : 0;
			const avanceStyles = getAvanceStyles(avanceValue);
			const avanceBar = document.createElement("div");
			avanceBar.style.height = "100%";
			avanceBar.style.width = avanceValue + "%";
			avanceBar.style.backgroundColor = avanceStyles.barColor;
			avanceBarWrap.appendChild(avanceBar);
			const avanceBadge = document.createElement("span");
			avanceBadge.className = "badge " + avanceStyles.badgeClass + (avanceStyles.badgeTextClass ? " " + avanceStyles.badgeTextClass : "");
			avanceBadge.textContent = hasAvance ? avanceValue + "%" : "-";
			avanceWrap.appendChild(avanceBarWrap);
			avanceWrap.appendChild(avanceBadge);
			avanceTd.appendChild(avanceWrap);
			tr.appendChild(avanceTd);

			const brokerTd = document.createElement("td");
			brokerTd.textContent = item.Broker || "-";
			tr.appendChild(brokerTd);

			const clasificacionTd = document.createElement("td");
			const badgeStyle = getClasificacionBadge(item.Clasificacion);
			const clasificacionBadge = document.createElement("span");
			clasificacionBadge.className = "badge " + badgeStyle.className + (badgeStyle.textClass ? " " + badgeStyle.textClass : "");
			clasificacionBadge.textContent = item.Clasificacion || "-";
			clasificacionTd.appendChild(clasificacionBadge);
			tr.appendChild(clasificacionTd);

			const actionTd = document.createElement("td");
			actionTd.className = "text-end";
			actionTd.style.width = "90px";
			const actionLink = document.createElement("a");
			actionLink.href = resolveLeadLink(item.Link);
			actionLink.className = "btn btn-sm btn-primary rounded-pill";
			actionLink.textContent = "Ver lead";
			actionTd.appendChild(actionLink);
			tr.appendChild(actionTd);

			topProspectosBody.appendChild(tr);
		});
	};

	const renderProspectosPorClasificacion = (items) => {
		clearTableBody(prospectosClasificacionBody);
		if (!prospectosClasificacionBody) {
			return;
		}
		if (!Array.isArray(items) || !items.length) {
			appendEmptyRow(prospectosClasificacionBody, 3);
			if (clasificacionChart && clasificacionChart.data && clasificacionChart.data.datasets && clasificacionChart.data.datasets[0]) {
				clasificacionChart.data.labels = [];
				clasificacionChart.data.datasets[0].data = [];
				clasificacionChart.data.datasets[0].backgroundColor = [];
				clasificacionChart.update();
			}
			return;
		}
		items.forEach((item) => {
			const tr = document.createElement("tr");
			const clasificacionTd = document.createElement("td");
			const badgeStyle = getClasificacionBadge(item.Clasificacion);
			const badge = document.createElement("span");
			badge.className = "badge";
			badge.style.backgroundColor = badgeStyle.color;
			badge.innerHTML = "&nbsp;";
			clasificacionTd.appendChild(badge);
			clasificacionTd.appendChild(document.createTextNode(" " + (item.Clasificacion || "-")));
			tr.appendChild(clasificacionTd);
			const totalTd = document.createElement("td");
			totalTd.className = "text-end";
			totalTd.textContent = item.Total ?? "-";
			tr.appendChild(totalTd);
			const percentTd = document.createElement("td");
			percentTd.className = "text-end";
			percentTd.textContent = formatPercent(item.Porcentaje);
			tr.appendChild(percentTd);
			prospectosClasificacionBody.appendChild(tr);
		});
		if (clasificacionChart && clasificacionChart.data && clasificacionChart.data.datasets && clasificacionChart.data.datasets[0]) {
			clasificacionChart.data.labels = items.map((item) => item.Clasificacion || "-");
			clasificacionChart.data.datasets[0].data = items.map((item) => (item.Total ?? 0));
			clasificacionChart.data.datasets[0].backgroundColor = items.map((item) => getClasificacionBadge(item.Clasificacion).color);
			clasificacionChart.update();
		}
	};

	const getAvanceRangeColor = (rango) => {
		const text = String(rango || "").replace(/\s+/g, "").toLowerCase();
		if (text.includes("0%-25%") || text.includes("0-25")) {
			return theme.secondary || "#6c757d";
		}
		if (text.includes("26%-50%") || text.includes("26-50")) {
			return theme.warning || "#ffca28";
		}
		if (text.includes("51%-75%") || text.includes("51-75")) {
			return theme.info || "#0dcaf0";
		}
		if (text.includes("76%-100%") || text.includes("76-100")) {
			return theme.success || "#2e7d32";
		}
		return theme.secondary || "#6c757d";
	};

	const renderProspectosPorAvance = (items) => {
		clearTableBody(prospectosAvanceBody);
		if (!prospectosAvanceBody) {
			return;
		}
		if (!Array.isArray(items) || !items.length) {
			appendEmptyRow(prospectosAvanceBody, 3);
			if (avanceChart && avanceChart.data && avanceChart.data.datasets && avanceChart.data.datasets[0]) {
				avanceChart.data.labels = [];
				avanceChart.data.datasets[0].data = [];
				avanceChart.data.datasets[0].backgroundColor = [];
				avanceChart.update();
			}
			return;
		}
		items.forEach((item) => {
			const tr = document.createElement("tr");
			const rangoTd = document.createElement("td");
			const color = getAvanceRangeColor(item.Rango);
			const badge = document.createElement("span");
			badge.className = "badge";
			badge.style.backgroundColor = color;
			badge.innerHTML = "&nbsp;";
			rangoTd.appendChild(badge);
			rangoTd.appendChild(document.createTextNode(" " + (item.Rango || "-")));
			tr.appendChild(rangoTd);
			const totalTd = document.createElement("td");
			totalTd.className = "text-end";
			totalTd.textContent = item.Total ?? "-";
			tr.appendChild(totalTd);
			const percentTd = document.createElement("td");
			percentTd.className = "text-end";
			percentTd.textContent = formatPercent(item.Porcentaje);
			tr.appendChild(percentTd);
			prospectosAvanceBody.appendChild(tr);
		});
		if (avanceChart && avanceChart.data && avanceChart.data.datasets && avanceChart.data.datasets[0]) {
			avanceChart.data.labels = items.map((item) => item.Rango || "-");
			avanceChart.data.datasets[0].data = items.map((item) => (item.Total ?? 0));
			avanceChart.data.datasets[0].backgroundColor = items.map((item) => getAvanceRangeColor(item.Rango));
			avanceChart.update();
		}
	};

	const createClasificacionChart = (canvas) => {
		if (!canvas || !window.Chart) {
			return null;
		}
		return new Chart(canvas, {
			type: "doughnut",
			data: {
				labels: ["Alta Promesa", "Buen Prospecto", "En Desarrollo", "Bajo Potencial"],
				datasets: [
					{
						data: [0, 0, 0, 0],
						backgroundColor: [
							theme.success || "#2e7d32",
							theme.primary || "#0d6efd",
							theme.warning || "#ffca28",
							theme.secondary || "#6c757d"
						],
						borderWidth: 4
					}
				]
			},
			options: {
				responsive: !window.MSInputMethodContext,
				maintainAspectRatio: false,
				legend: {
					display: true,
					position: "bottom"
				},
				cutoutPercentage: 70
			}
		});
	};

	const createAvanceChart = (canvas) => {
		if (!canvas || !window.Chart) {
			return null;
		}
		const avanceLabels = ["0%-25%", "26%-50%", "51%-75%", "76%-100%"];
		const avanceCounts = [0, 0, 0, 0];
		const avanceColors = [
			theme.secondary || "#6c757d",
			theme.warning || "#ffca28",
			theme.info || "#0dcaf0",
			theme.success || "#2e7d32"
		];

		return new Chart(canvas, {
			type: "bar",
			data: {
				labels: avanceLabels,
				datasets: [
					{
						label: "Prospectos",
						backgroundColor: avanceColors,
						borderColor: "transparent",
						data: avanceCounts,
						barPercentage: 0.7,
						categoryPercentage: 0.6
					}
				]
			},
			options: {
				maintainAspectRatio: false,
				legend: {
					display: false
				},
				tooltips: {
					callbacks: {
						label: (tooltipItem) => {
							return "Prospectos: " + tooltipItem.yLabel;
						}
					}
				},
				scales: {
					xAxes: [
						{
							gridLines: {
								color: "transparent"
							}
						}
					],
					yAxes: [
						{
							gridLines: {
								display: false
							},
							ticks: {
								beginAtZero: true,
								stepSize: 10
							}
						}
					]
				}
			}
		});
	};

	clasificacionChart = createClasificacionChart(clasificacionAltCanvas);
	avanceChart = createAvanceChart(avanceAltCanvas);

	const setDesdeLabel = (text) => {
		if (filtroDesdeLabel) {
			filtroDesdeLabel.textContent = text;
		}
	};

	const setFiltroButtonLoading = (isLoading) => {
		if (!filtroAplicar) {
			return;
		}
		if (isLoading) {
			filtroAplicar.dataset.originalText = filtroAplicar.innerHTML;
			filtroAplicar.disabled = true;
			filtroAplicar.innerHTML = "<span class=\"dashboard-spinner me-2\" role=\"status\" aria-hidden=\"true\"></span>Filtrando";
			return;
		}
		filtroAplicar.disabled = false;
		if (filtroAplicar.dataset.originalText) {
			filtroAplicar.innerHTML = filtroAplicar.dataset.originalText;
		}
	};

	const updateCustomDateState = () => {
		if (!filtroPeriodo) {
			return;
		}
		const isOneDay = filtroPeriodo.value === "personalizado-1-dia";
		const isRange = filtroPeriodo.value === "personalizado-rango";

		if (!isOneDay && !isRange) {
			setDesdeLabel("Desde");
			if (filtroDesde) {
				filtroDesde.value = "";
				filtroDesde.disabled = true;
			}
			if (filtroHasta) {
				filtroHasta.value = "";
				filtroHasta.disabled = true;
			}
			if (filtroAplicar) {
				filtroAplicar.disabled = false;
			}
			return;
		}

		if (isOneDay) {
			setDesdeLabel("Elegir Día");
			if (filtroDesde) {
				filtroDesde.disabled = false;
			}
			if (filtroHasta) {
				filtroHasta.value = "";
				filtroHasta.disabled = true;
			}
			const hasDay = Boolean(filtroDesde && filtroDesde.value);
			if (filtroAplicar) {
				filtroAplicar.disabled = !hasDay;
			}
			return;
		}

		setDesdeLabel("Desde");
		if (filtroDesde) {
			filtroDesde.disabled = false;
		}
		if (filtroHasta) {
			filtroHasta.disabled = false;
		}
		let isValid = Boolean(filtroDesde && filtroHasta && filtroDesde.value && filtroHasta.value);
		if (isValid && filtroHasta.value <= filtroDesde.value) {
			filtroHasta.value = "";
			isValid = false;
		}
		if (filtroAplicar) {
			filtroAplicar.disabled = !isValid;
		}
	};

	const normalizeFiltro = (value) => {
		return String(value || "")
			.trim()
			.toLowerCase()
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
			.replace(/\s+/g, " ");
	};

	const applyDashboardFilter = async () => {
		if (!filtroPeriodo || !filtroAplicar || filtroAplicar.disabled) {
			return;
		}
		const tipoFiltro = filtroPeriodo.value || "";
		const payload = {
			TipoFiltro: tipoFiltro
		};
		if (tipoFiltro === "personalizado-1-dia") {
			if (!filtroDesde || !filtroDesde.value) {
				return;
			}
			payload.FiltroDesde = filtroDesde.value;
		}
		if (tipoFiltro === "personalizado-rango") {
			if (!filtroDesde || !filtroHasta || !filtroDesde.value || !filtroHasta.value) {
				return;
			}
			if (filtroHasta.value <= filtroDesde.value) {
				return;
			}
			payload.FiltroDesde = filtroDesde.value;
			payload.FiltroHasta = filtroHasta.value;
		}
		try {
			setFiltroButtonLoading(true);
			await new Promise((resolve) => requestAnimationFrame(resolve));
			const response = await fetch("https://auto.myduomarkets.com/webhook/api/dashboard", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(payload)
			});
			const data = await response.json();
			const responsePayload = Array.isArray(data) ? data[0] : data;
			if (responsePayload && responsePayload.success === true) {
				if (periodoTitulo && responsePayload.PeriodoTitulo) {
					periodoTitulo.textContent = responsePayload.PeriodoTitulo;
				}
				updateDashboardFila2(responsePayload.Fila2);
				const fila3 = responsePayload.Fila3 || {};
				renderRankingPorPais(fila3.RankingPorPais || []);
				renderConversionPorPais(fila3.ConversionPorPais || []);
				renderRankingPorBroker(fila3.RankingPorBroker || []);
				const fila4 = responsePayload.Fila4 || {};
				renderTopProspectos(fila4.TopProspectos || []);
				renderProspectosPorClasificacion(fila4.ProspectosPorClasificacion || []);
				renderProspectosPorAvance(fila4.ProspectosPorAvance || []);
			}
		} catch (error) {
			// Sin manejo de error por ahora
		} finally {
			setFiltroButtonLoading(false);
		}
	};

	const fetchDashboardConfig = async () => {
		if (!token || !filtroPeriodo) {
			return;
		}
		try {
			const response = await fetch("https://auto.myduomarkets.com/webhook/api/dashboard/config", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					token
				})
			});
			const data = await response.json();
			const payload = Array.isArray(data) ? data[0] : data;
			const success = payload && (payload.success === true || payload.success === "true");
			if (!payload || !success) {
				return;
			}
			const rawFiltro = payload.FiltroPredeterminado;
			const normalized = normalizeFiltro(rawFiltro);
			const filtroMap = {
				"hoy": "hoy",
				"esta semana": "semana",
				"ultimos 15 dias": "15-dias",
				"este mes": "mes",
				"ultimos 3 meses": "3-meses",
				"ultimos 6 meses": "6-meses",
				"ano actual": "1-ano",
				"todo": "todo",
				"personalizado": "personalizado"
			};
			const mapped = filtroMap[normalized] || "";
			const optionList = Array.from(filtroPeriodo.options);
			const resolvedValue = mapped
				? mapped
				: (optionList.find((option) => normalizeFiltro(option.textContent) === normalized) || {}).value;
			if (resolvedValue) {
				filtroPeriodo.value = resolvedValue;
				updateCustomDateState();
				const filtroAutomatico = payload && payload.FiltroAutomatico === true;
				if (filtroAutomatico) {
					applyDashboardFilter();
				}
			}
		} catch (error) {
			// Sin manejo de error por ahora
		}
	};

	fetchDashboardConfig();
	updateCustomDateState();

	if (filtroPeriodo) {
		filtroPeriodo.addEventListener("change", updateCustomDateState);
	}
	if (filtroDesde) {
		filtroDesde.addEventListener("change", updateCustomDateState);
		filtroDesde.addEventListener("input", updateCustomDateState);
	}
	if (filtroHasta) {
		filtroHasta.addEventListener("change", updateCustomDateState);
		filtroHasta.addEventListener("input", updateCustomDateState);
	}
	if (filtroAplicar) {
		filtroAplicar.addEventListener("click", async (event) => {
			event.preventDefault();
			applyDashboardFilter();
		});
	}
});
