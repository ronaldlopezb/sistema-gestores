document.addEventListener("DOMContentLoaded", () => {
	const content = document.getElementById("eva-content");
	const emptyState = document.getElementById("eva-empty");
	const title = document.getElementById("eva-title");
	const statusBadge = document.getElementById("eva-status");
	const name = document.getElementById("eva-name");
	const objetivo = document.getElementById("eva-objetivo");
	const infoName = document.getElementById("eva-info-name");
	const infoEmail = document.getElementById("eva-info-email");
	const infoCountry = document.getElementById("eva-info-country");
	const infoNameItem = document.getElementById("eva-info-name-item");
	const infoEmailItem = document.getElementById("eva-info-email-item");
	const infoCountryItem = document.getElementById("eva-info-country-item");
	const traderBroker = document.getElementById("eva-trader-broker");
	const traderPrograma = document.getElementById("eva-trader-programa");
	const traderExperiencia = document.getElementById("eva-trader-experiencia");
	const traderDepositos = document.getElementById("eva-trader-depositos");
	const traderRentabilidad = document.getElementById("eva-trader-rentabilidad");
	const traderBrokerItem = document.getElementById("eva-trader-broker-item");
	const traderProgramaItem = document.getElementById("eva-trader-programa-item");
	const traderExperienciaItem = document.getElementById("eva-trader-experiencia-item");
	const traderDepositosItem = document.getElementById("eva-trader-depositos-item");
	const traderRentabilidadItem = document.getElementById("eva-trader-rentabilidad-item");
	const registroIder = document.getElementById("eva-registro-ider");
	const registroFechaHora = document.getElementById("eva-registro-fecha-hora");
	const estadoUpdateButton = document.getElementById("lead-estado-update");
	const estadoModal = document.getElementById("estado-modal");
	const estadoSelect = document.getElementById("estado-select");
	const estadoSave = document.getElementById("estado-save");
	const estadoAlert = document.getElementById("estado-alert");
	const topbarAvatar = document.getElementById("user-avatar");
	const clientName = document.getElementById("clientName");
	const scoreValue = document.getElementById("scoreValue");
	const scoreLevel = document.getElementById("scoreLevel");
	const scoreMessage = document.getElementById("scoreMessage");
	const gaugeNeedle = document.getElementById("gaugeNeedle");
	const currentSchemeName = document.getElementById("currentSchemeName");
	const currentSchemeDesc = document.getElementById("currentSchemeDesc");
	const potentialSchemeName = document.getElementById("potentialSchemeName");
	const potentialSchemeDesc = document.getElementById("potentialSchemeDesc");
	const leakAlertBox = document.getElementById("leakAlertBox");
	const leakAlertMessage = document.getElementById("leakAlertMessage");
	const intangibleCurrentIcon = document.getElementById("intangibleCurrentIcon");
	const intangibleCurrentTitle = document.getElementById("intangibleCurrentTitle");
	const intangibleCurrentDesc = document.getElementById("intangibleCurrentDesc");
	const intangiblePotentialIcon = document.getElementById("intangiblePotentialIcon");
	const intangiblePotentialTitle = document.getElementById("intangiblePotentialTitle");
	const intangiblePotentialDesc = document.getElementById("intangiblePotentialDesc");
	const auditTableBody = document.getElementById("auditTableBody");
	let currentEstado = "";

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

	const setBadgeContent = (badgeElement, text, iconName) => {
		if (!badgeElement) {
			return;
		}
		badgeElement.innerHTML = "";
		if (iconName) {
			const icon = document.createElement("i");
			icon.setAttribute("data-feather", iconName);
			icon.className = "me-1";
			icon.style.width = "12px";
			icon.style.height = "12px";
			badgeElement.appendChild(icon);
		}
		badgeElement.appendChild(document.createTextNode(text || "-"));
	};

	const showEmpty = () => {
		if (content) {
			content.classList.add("d-none");
		}
		if (emptyState) {
			emptyState.classList.remove("d-none");
		}
	};

	const showContent = () => {
		if (content) {
			content.classList.remove("d-none");
		}
		if (emptyState) {
			emptyState.classList.add("d-none");
		}
	};

	const setTextValue = (element, value, itemElement) => {
		if (!element) {
			return;
		}
		const text = value ? String(value).trim() : "";
		if (!text) {
			if (itemElement) {
				itemElement.classList.add("d-none");
			}
			return;
		}
		if (itemElement) {
			itemElement.classList.remove("d-none");
		}
		element.textContent = text;
	};

	const setReportText = (element, value) => {
		if (!element) {
			return;
		}
		const text = value ? String(value).trim() : "";
		if (!text) {
			return;
		}
		element.textContent = text;
	};

	const setReportHtml = (element, value) => {
		if (!element) {
			return;
		}
		const text = value ? String(value) : "";
		if (!text.trim()) {
			return;
		}
		const formatted = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
		element.innerHTML = formatted;
	};

	const updateEstadoSelect = (estado) => {
		if (!estadoSelect) {
			return;
		}
		const normalized = String(estado || "").trim();
		const hasOption = Array.from(estadoSelect.options).some((option) => option.value === normalized);
		if (hasOption) {
			estadoSelect.value = normalized;
		}
	};

	const showEstadoAlert = () => {
		if (!estadoAlert) {
			return;
		}
		estadoAlert.classList.remove("d-none");
	};

	const hideEstadoAlert = () => {
		if (!estadoAlert) {
			return;
		}
		estadoAlert.classList.add("d-none");
	};

	const openEstadoModal = () => {
		if (!estadoModal) {
			return;
		}
		updateEstadoSelect(currentEstado);
		hideEstadoAlert();
		if (window.bootstrap && typeof window.bootstrap.Modal === "function") {
			const modal = window.bootstrap.Modal.getOrCreateInstance(estadoModal);
			modal.show();
		}
	};

	const updateEstadoBadge = (estado) => {
		const estadoText = (estado || "-").trim();
		const estadoIcon = stateIcons[estadoText];
		if (statusBadge) {
			setBadgeContent(statusBadge, estadoText, estadoIcon);
			statusBadge.style.backgroundColor = stateColors[estadoText] || "#6C757D";
			statusBadge.style.color = "#fff";
			statusBadge.style.display = "inline-block";
		}
	};

	const params = new URLSearchParams(window.location.search);
	const ider = params.get("IDER") || params.get("ider");

	if (!ider) {
		showEmpty();
		return;
	}

	const fetchDetalle = async () => {
		try {
			const response = await fetch("https://auto.myduomarkets.com/webhook/ic/eva-rapida/details", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					IDER: ider
				})
			});

			const data = await response.json();
			const evaRa = Array.isArray(data)
				? data.find((item) => item && item.EvaRa)?.EvaRa
				: data && data.EvaRa
					? data.EvaRa
					: null;
			const dosier = Array.isArray(data)
				? data.find((item) => item && item.DosierPersonal)?.DosierPersonal
				: data && data.DosierPersonal
					? data.DosierPersonal
					: null;

			if (!evaRa) {
				showEmpty();
				return;
			}

			const registro = evaRa.Registro || {};
			const lead = evaRa.Lead || {};
			const trader = evaRa.Trader || {};

			if (title) {
				title.textContent = lead.NombreCompleto ? "Evaluacion rapida - " + lead.NombreCompleto : "Evaluacion rapida";
			}

			setTextValue(name, lead.NombreCompleto);
			setTextValue(infoName, lead.NombreCompleto, infoNameItem);
			setTextValue(infoEmail, lead.CorreoElectronico, infoEmailItem);
			setTextValue(infoCountry, lead.Pais, infoCountryItem);
			setTextValue(traderBroker, trader.BrokerActual, traderBrokerItem);
			setTextValue(traderPrograma, trader.TipoPrograma, traderProgramaItem);
			setTextValue(traderExperiencia, trader.AnosExperiencia, traderExperienciaItem);
			setTextValue(traderDepositos, trader.DepositosMensualesPromedio, traderDepositosItem);
			setTextValue(traderRentabilidad, trader.RentabilidadPromedioAnual, traderRentabilidadItem);
			setTextValue(objetivo, lead.ObjetivoPrincipal);

			if (objetivo && !lead.ObjetivoPrincipal) {
				objetivo.classList.add("d-none");
			} else if (objetivo) {
				objetivo.classList.remove("d-none");
			}

			if (registroIder) {
				registroIder.textContent = registro.IDER ? "IDER: " + registro.IDER : "IDER: -";
			}
			if (registroFechaHora) {
				const fechaHora = [registro.Fecha, registro.Hora].filter(Boolean).join(" ");
				registroFechaHora.textContent = fechaHora || "-";
			}

			const estadoText = registro.Estado || "-";
			currentEstado = estadoText;
			updateEstadoBadge(estadoText);
			updateEstadoSelect(estadoText);

			if (dosier) {
				const diagnostico = dosier.diagnostico || {};
				const rentabilidad = dosier.rentabilidad || {};
				const intangibles = dosier.intangibles || {};
				const auditoria = Array.isArray(dosier.auditoria) ? dosier.auditoria : [];

				if (clientName && dosier.cliente && dosier.cliente.nombre) {
					clientName.textContent = dosier.cliente.nombre;
				}

				const scoreRaw = diagnostico.score;
				const scoreParsed = typeof scoreRaw === "number" ? scoreRaw : parseInt(String(scoreRaw || ""), 10);
				const score = Number.isNaN(scoreParsed) ? null : Math.max(0, Math.min(100, scoreParsed));
				if (score !== null) {
					if (scoreValue) {
						scoreValue.textContent = score + "/100";
					}
					if (gaugeNeedle) {
						const rotation = -90 + (score / 100) * 180;
						gaugeNeedle.style.transform = "rotate(" + rotation + "deg)";
					}
				}
				setReportText(scoreLevel, diagnostico.nivel);
				setReportText(scoreMessage, diagnostico.mensaje);

				setReportText(currentSchemeName, rentabilidad.esquema_actual_nombre);
				setReportText(currentSchemeDesc, rentabilidad.esquema_actual_desc);
				setReportText(potentialSchemeName, rentabilidad.potencial_nombre);
				setReportText(potentialSchemeDesc, rentabilidad.potencial_desc);

				const fuga = rentabilidad.fuga || {};
				if (leakAlertBox) {
					if (fuga.existe === false) {
						leakAlertBox.classList.add("d-none");
					} else {
						leakAlertBox.classList.remove("d-none");
						setReportHtml(leakAlertMessage, fuga.mensaje);
					}
				}

				setReportText(intangibleCurrentIcon, intangibles.situacion_icono);
				setReportText(intangibleCurrentTitle, intangibles.situacion_nombre);
				setReportText(intangibleCurrentDesc, intangibles.situacion_desc);
				setReportText(intangiblePotentialIcon, intangibles.potencial_icono);
				setReportText(intangiblePotentialTitle, intangibles.potencial_nombre);
				setReportText(intangiblePotentialDesc, intangibles.potencial_desc);

				if (auditTableBody && auditoria.length) {
					const rows = Array.from(auditTableBody.querySelectorAll("tr"));
					auditoria.forEach((item) => {
						const variable = item && item.variable ? String(item.variable).trim() : "";
						if (!variable) {
							return;
						}
						const row = rows.find((tr) => {
							const firstCell = tr.querySelector("td");
							return firstCell && firstCell.textContent.trim() === variable;
						});
						if (!row) {
							return;
						}
						const cells = row.querySelectorAll("td");
						if (cells.length < 2) {
							return;
						}
						const icon = item.actual_icono ? String(item.actual_icono).trim() : "";
						const text = item.actual ? String(item.actual).trim() : "";
						cells[1].innerHTML = (icon ? "<span class=\"status-icon\">" + icon + "</span>" : "") + text;
					});
				}
			}

			showContent();
			if (window.feather && typeof window.feather.replace === "function") {
				window.feather.replace();
			}
		} catch (error) {
			showEmpty();
		}
	};

	const updateEstado = async () => {
		if (!estadoSelect || !estadoSave || !ider) {
			return;
		}
		const estado = estadoSelect.value;
		const estadoActual = String(currentEstado || "").trim();

		if (estado && estadoActual && estado === estadoActual) {
			showEstadoAlert();
			return;
		}
		hideEstadoAlert();

		if (!estado) {
			return;
		}

		const originalText = estadoSave.innerHTML;
		estadoSave.disabled = true;
		estadoSave.innerHTML = "<span class=\"d-inline-flex align-items-center justify-content-center me-2\" style=\"width:18px;height:18px;background:#0d6efd;border-radius:999px;\"><span class=\"prospecto-spinner\" role=\"status\" aria-hidden=\"true\"></span></span>Actualizando";

		try {
			const response = await fetch("https://auto.myduomarkets.com/webhook/ic/eva-rap/state/update", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					IDER: ider,
					estado
				})
			});

			const data = await response.json();
			const payload = Array.isArray(data) ? data[0] : data;
			if (payload && payload.success === true) {
				currentEstado = estado;
				updateEstadoBadge(estado);
				updateEstadoSelect(estado);
				fetchDetalle();
				if (estadoModal && window.bootstrap && typeof window.bootstrap.Modal === "function") {
					const modalInstance = window.bootstrap.Modal.getOrCreateInstance(estadoModal);
					modalInstance.hide();
				}
			}
		} catch (error) {
			// Sin mensaje de error por ahora
		} finally {
			estadoSave.disabled = false;
			estadoSave.innerHTML = originalText;
		}
	};

	if (estadoUpdateButton) {
		estadoUpdateButton.addEventListener("click", (event) => {
			event.preventDefault();
			openEstadoModal();
		});
	}

	if (estadoSave) {
		estadoSave.addEventListener("click", (event) => {
			event.preventDefault();
			updateEstado();
		});
	}

	if (estadoSelect) {
		estadoSelect.addEventListener("change", () => {
			hideEstadoAlert();
		});
	}

	fetchDetalle();
});
