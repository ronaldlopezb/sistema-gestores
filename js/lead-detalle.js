document.addEventListener("DOMContentLoaded", () => {
	const tabButtons = document.querySelectorAll("[data-bs-toggle='tab']");
	const title = document.getElementById("lead-title");
	const badge = document.getElementById("lead-badge");
	const statusBadge = document.getElementById("lead-status");
	const content = document.getElementById("lead-content");
	const emptyState = document.getElementById("lead-empty");
	const leadName = document.getElementById("lead-name");
	const leadObjetivo = document.getElementById("lead-objetivo");
	const seguimientoAvatar = document.getElementById("seguimiento-user-avatar");
	const topbarAvatar = document.getElementById("user-avatar");
	const seguimientoList = document.getElementById("seguimiento-list");
	const seguimientoEmpty = document.getElementById("seguimiento-empty");
	const seguimientoInput = document.getElementById("seguimiento-comentario");
	const seguimientoSend = document.getElementById("seguimiento-enviar");
	const seguimientoAlert = document.getElementById("seguimiento-alert");
	const prospectoToggle = document.getElementById("prospecto-toggle");
	const prospectoCard = document.getElementById("prospecto-card");
	const prospectoProgress = document.getElementById("prospecto-progress");
	const prospectoNivel = document.getElementById("prospecto-nivel");
	const prospectoMeta = document.getElementById("prospecto-meta");
	const prospectoUpdate = document.getElementById("prospecto-update");
	const prospectoUpdateBtn = document.getElementById("prospecto-update-btn");
	const prospectoModal = document.getElementById("prospecto-modal");
	const prospectoRange = document.getElementById("prospecto-range");
	const prospectoRangeValue = document.getElementById("prospecto-range-value");
	const prospectoSave = document.getElementById("prospecto-save");
	const estadoUpdateButton = document.getElementById("lead-estado-update");
	const estadoModal = document.getElementById("estado-modal");
	const estadoSelect = document.getElementById("estado-select");
	const estadoSave = document.getElementById("estado-save");
	const estadoAlert = document.getElementById("estado-alert");
	const leadInfoName = document.getElementById("lead-info-name");
	const leadInfoEmail = document.getElementById("lead-info-email");
	const leadInfoCountry = document.getElementById("lead-info-country");
	const leadInfoWhatsapp = document.getElementById("lead-info-whatsapp");
	const leadInfoLinkedin = document.getElementById("lead-info-linkedin");
	const leadInfoLinkedinItem = document.getElementById("lead-info-linkedin-item");
	const icGestorNombre = document.getElementById("ic-gestor-nombre");
	const icGestorPais = document.getElementById("ic-gestor-pais");
	const icGestorBroker = document.getElementById("ic-gestor-broker");
	const icGestorLinkedin = document.getElementById("ic-gestor-linkedin");
	const icGestorLinkedinItem = document.getElementById("ic-gestor-linkedin-item");
	const leadTraderBroker = document.getElementById("lead-trader-broker");
	const leadTraderTiempo = document.getElementById("lead-trader-tiempo");
	const leadTraderGestor = document.getElementById("lead-trader-gestor");
	const leadTraderActividad = document.getElementById("lead-trader-actividad");
	const leadTraderPrograma = document.getElementById("lead-trader-programa");
	const leadTraderAlcance = document.getElementById("lead-trader-alcance");
	const leadTraderColaboracion = document.getElementById("lead-trader-colaboracion");
	const leadRedesSection = document.getElementById("lead-redes-section");
	const leadRedesGrid = document.getElementById("lead-redes-grid");
	const leadRegistroIdic = document.getElementById("lead-registro-idic");
	const leadRegistroId = document.getElementById("lead-registro-id");
	const leadRegistroFechaHora = document.getElementById("lead-registro-fecha-hora");
	const icScoreValor = document.getElementById("ic-score-valor");
	const icScoreValorTotal = document.getElementById("ic-score-valor-total");
	const icScoreTexto = document.getElementById("ic-score-texto");
	const icScoreEtiqueta = document.getElementById("ic-score-etiqueta");
	const icScoreClasificacion = document.getElementById("ic-score-clasificacion");
	const icScorePotencial = document.getElementById("ic-score-potencial");
	const icScoreCircle = document.getElementById("ic-score-circle");
	const icPerfilComercialList = document.getElementById("ic-perfil-comercial-list");
	const icTrayectoriaProfesionalList = document.getElementById("ic-trayectoria-profesional-list");
	const icDolorNecesidadList = document.getElementById("ic-dolor-necesidad-list");
	const icArgumentoVentaTexto = document.getElementById("ic-argumento-venta-texto");
	const icProductosSeguridosList = document.getElementById("ic-productos-seguridos-list");
	const icMetricasClientes = document.getElementById("ic-metricas-clientes");
	const icMetricasVolumen = document.getElementById("ic-metricas-volumen");
	const icMetricasRentabilidad = document.getElementById("ic-metricas-rentabilidad");
	const icMetricasCapital = document.getElementById("ic-metricas-capital");
	const icProximosPasosList = document.getElementById("ic-proximos-pasos-list");
	let currentEstado = "";

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

	const renderSeguimiento = (items) => {
		if (!seguimientoList) {
			return;
		}

		seguimientoList.innerHTML = "";
		if (!items || !items.length) {
			if (seguimientoEmpty) {
				seguimientoEmpty.classList.remove("d-none");
			}
			return;
		}

		if (seguimientoEmpty) {
			seguimientoEmpty.classList.add("d-none");
		}

		items.forEach((item) => {
			const card = document.createElement("div");
			card.className = "card mb-3 shadow-sm";

			const cardBody = document.createElement("div");
			cardBody.className = "card-body d-flex align-items-start";

			const avatar = document.createElement("img");
			avatar.width = 44;
			avatar.height = 44;
			avatar.className = "rounded-circle me-2";
			avatar.alt = item.sender || "Usuario";
			avatar.src = item.foto || (topbarAvatar ? topbarAvatar.src : "");

			const body = document.createElement("div");
			body.className = "flex-grow-1";

			const meta = document.createElement("div");
			meta.className = "d-flex flex-column align-items-end justify-content-center text-end";
			const fecha = document.createElement("small");
			fecha.className = "d-block text-navy";
			fecha.textContent = item.fecha || "";
			const hora = document.createElement("small");
			hora.className = "d-block text-muted";
			hora.textContent = item.hora || "";
			const contentRow = document.createElement("div");
			contentRow.className = "d-flex align-items-center justify-content-between gap-3";

			const leftColumn = document.createElement("div");
			leftColumn.className = "flex-grow-1";

			const author = document.createElement("strong");
			author.textContent = (item.sender || "Usuario") + " dice:";
			leftColumn.appendChild(author);

			const comment = document.createElement("div");
			comment.className = "text-muted mt-1";
			comment.textContent = item.comentario || "";
			leftColumn.appendChild(comment);

			if (fecha.textContent || hora.textContent) {
				meta.appendChild(fecha);
				meta.appendChild(hora);
			}

			contentRow.appendChild(leftColumn);
			if (meta.childNodes.length) {
				contentRow.appendChild(meta);
			}
			body.appendChild(contentRow);

			cardBody.appendChild(avatar);
			cardBody.appendChild(body);
			card.appendChild(cardBody);
			seguimientoList.appendChild(card);
		});
	};

	const showSeguimientoAlert = () => {
		if (!seguimientoAlert) {
			return;
		}
		seguimientoAlert.classList.remove("d-none");
		setTimeout(() => {
			seguimientoAlert.classList.add("d-none");
		}, 5000);
	};

	const parseSeguimiento = (payload) => {
		if (!payload) {
			return [];
		}

		if (Array.isArray(payload)) {
			return payload;
		}

		if (typeof payload === "string") {
			try {
				return JSON.parse(payload);
			} catch (error) {
				return [];
			}
		}

		if (Array.isArray(payload.Seguimiento)) {
			return payload.Seguimiento;
		}

		if (Array.isArray(payload.Comentarios)) {
			return payload.Comentarios;
		}

		if (typeof payload.Seguimiento === "string") {
			try {
				return JSON.parse(payload.Seguimiento);
			} catch (error) {
				return [];
			}
		}

		if (typeof payload.Comentarios === "string") {
			try {
				return JSON.parse(payload.Comentarios);
			} catch (error) {
				return [];
			}
		}

		return [];
	};

	const parseProspectoInfo = (payload) => {
		if (!payload) {
			return [];
		}

		if (Array.isArray(payload)) {
			return payload;
		}

		if (typeof payload === "string") {
			try {
				return JSON.parse(payload);
			} catch (error) {
				return [];
			}
		}

		return [];
	};

	const updateTabButtons = (activeButton) => {
		tabButtons.forEach((button) => {
			if (button === activeButton) {
				button.classList.add("btn-primary");
				button.classList.remove("btn-outline-primary");
			} else {
				button.classList.add("btn-outline-primary");
				button.classList.remove("btn-primary");
			}
		});
	};

	const params = new URLSearchParams(window.location.search);
	const idic = params.get("idic");

	if (seguimientoAvatar && topbarAvatar && topbarAvatar.src) {
		seguimientoAvatar.src = topbarAvatar.src;
		seguimientoAvatar.alt = topbarAvatar.alt || "Usuario";
	}

	tabButtons.forEach((button) => {
		button.addEventListener("shown.bs.tab", (event) => {
			updateTabButtons(event.target);
		});
	});

	const activeTab = document.querySelector("[data-bs-toggle='tab'].active");
	if (activeTab) {
		updateTabButtons(activeTab);
	}

	if (!idic) {
		showEmpty();
		return;
	}

	const setProspectoButton = (isProspecto) => {
		if (!prospectoToggle) {
			return;
		}

		if (isProspecto) {
			prospectoToggle.classList.remove("btn-success");
			prospectoToggle.classList.add("btn-danger");
			prospectoToggle.innerHTML = "<i data-feather=\"user-x\" class=\"me-1\"></i>Dejar de ser Prospecto";
		} else {
			prospectoToggle.classList.remove("btn-danger");
			prospectoToggle.classList.add("btn-success");
			prospectoToggle.innerHTML = "<i data-feather=\"user-check\" class=\"me-1\"></i>Marcar como Prospecto";
		}

		if (window.feather && typeof window.feather.replace === "function") {
			window.feather.replace();
		}
	};

	const setProspectoCard = (isProspecto, info) => {
		if (!prospectoCard) {
			return;
		}

		if (!isProspecto) {
			prospectoCard.classList.add("d-none");
			return;
		}

		prospectoCard.classList.remove("d-none");

		const item = Array.isArray(info) && info.length ? info[0] : null;
		const nivel = item && typeof item.nivel === "number" ? item.nivel : parseInt(item && item.nivel ? item.nivel : 0, 10) || 0;
		const porcentaje = Math.max(0, Math.min(100, nivel));
		const usuario = item && item.usuario ? item.usuario : "";
		const fecha = item && item.fecha ? item.fecha : "";
		const hora = item && item.hora ? item.hora : "";
		const updateFecha = item && item.updatefecha ? item.updatefecha : "";
		const updateHora = item && item.updatehora ? item.updatehora : "";
		const updateUser = item && item.updateuser ? item.updateuser : "";

		if (prospectoProgress) {
			prospectoProgress.style.width = porcentaje + "%";
			prospectoProgress.setAttribute("aria-valuenow", String(porcentaje));
		}

		if (prospectoNivel) {
			prospectoNivel.textContent = porcentaje + "%";
		}

		prospectoCard.dataset.porcentaje = String(porcentaje);

		if (prospectoMeta) {
			const detalles = [fecha, hora].filter(Boolean).join(" ");
			prospectoMeta.textContent = usuario ? "Marcada por: " + usuario + (detalles ? " el " + detalles : "") : detalles;
		}

		if (prospectoUpdate) {
			const updateDetalles = [updateFecha, updateHora].filter(Boolean).join(" ");
			const updateMeta = updateUser ? "Actualizado por: " + updateUser + (updateDetalles ? " el " + updateDetalles : "") : updateDetalles;
			prospectoUpdate.textContent = updateMeta;
		}
	};

	const updateProspectoRange = (value) => {
		if (!prospectoRangeValue) {
			return;
		}
		const parsed = parseInt(value, 10);
		const porcentaje = Number.isNaN(parsed) ? 0 : Math.max(0, Math.min(100, parsed));
		prospectoRangeValue.textContent = porcentaje + "%";
		if (prospectoRange) {
			prospectoRange.style.setProperty("--fill", porcentaje + "%");
		}
	};

	const openProspectoModal = () => {
		if (!prospectoModal || !prospectoRange || !prospectoRangeValue) {
			return;
		}
		const savedValue = prospectoCard && prospectoCard.dataset.porcentaje ? prospectoCard.dataset.porcentaje : "0";
		prospectoRange.value = savedValue;
		updateProspectoRange(savedValue);

		if (window.bootstrap && typeof window.bootstrap.Modal === "function") {
			const modal = window.bootstrap.Modal.getOrCreateInstance(prospectoModal);
			modal.show();
		}
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

	const setScoreCircleColor = (value) => {
		if (!icScoreCircle) {
			return;
		}
		const parsed = typeof value === "number" ? value : parseInt(String(value || ""), 10);
		const score = Number.isNaN(parsed) ? 0 : parsed;
		if (score <= 33) {
			icScoreCircle.style.backgroundColor = "#f44336";
			icScoreCircle.style.color = "#ffffff";
			if (icScoreValor) {
				icScoreValor.style.color = "#ffffff";
			}
			return;
		}
		if (score <= 66) {
			icScoreCircle.style.backgroundColor = "#ffca28";
			icScoreCircle.style.color = "#212529";
			if (icScoreValor) {
				icScoreValor.style.color = "#212529";
			}
			return;
		}
		icScoreCircle.style.backgroundColor = "#2e7d32";
		icScoreCircle.style.color = "#ffffff";
		if (icScoreValor) {
			icScoreValor.style.color = "#ffffff";
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

	const fetchLead = async () => {
		try {
			const response = await fetch("https://auto.myduomarkets.com/webhook/ic/lead/details", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					idic
				})
			});

			const data = await response.json();
			const leadPayload = Array.isArray(data) && data[0] && data[0].Lead ? data[0].Lead : null;
			const seguimientoPayload = Array.isArray(data) && data[1] ? data[1] : null;
			const leadRegistro = leadPayload && leadPayload.Registro ? leadPayload.Registro : {};
			const leadProspecto = leadPayload && leadPayload.Prospecto ? leadPayload.Prospecto : {};
			const leadInfo = leadPayload && leadPayload.Info ? leadPayload.Info : {};
			const leadTrader = leadPayload && leadPayload.Trader ? leadPayload.Trader : {};
			const icPayload = Array.isArray(data) && data[2] && data[2].IC ? data[2].IC : null;
			const icScore = icPayload && icPayload.ScoreComercial ? icPayload.ScoreComercial : {};

			if (!leadPayload) {
				showEmpty();
				return;
			}

			if (title) {
				title.textContent = leadInfo.Nombre || "Perfil";
			}

			if (leadName) {
				leadName.textContent = leadInfo.Nombre || "-";
			}

			if (leadObjetivo) {
				leadObjetivo.textContent = leadTrader.Objetivo || "-";
			}

			if (leadInfoName) {
				leadInfoName.textContent = leadInfo.Nombre || "-";
			}

			if (icGestorNombre) {
				icGestorNombre.textContent = leadInfo.Nombre || "-";
			}

			if (leadInfoEmail) {
				leadInfoEmail.textContent = leadInfo.Correo || "-";
			}

			if (leadInfoCountry) {
				leadInfoCountry.textContent = leadInfo.Pais || "-";
			}

			if (icGestorPais) {
				icGestorPais.textContent = leadInfo.Pais || "-";
			}

			if (leadInfoWhatsapp) {
				const whatsappValue = leadInfo.WhatsApp || "";
				if (whatsappValue) {
					const cleanNumber = whatsappValue.replace(/\D/g, "");
					leadInfoWhatsapp.textContent = whatsappValue;
					leadInfoWhatsapp.href = cleanNumber ? "https://wa.me/" + cleanNumber : "#";
				} else {
					leadInfoWhatsapp.textContent = "-";
					leadInfoWhatsapp.href = "#";
				}
			}

			if (leadInfoLinkedin && leadInfoLinkedinItem) {
				const linkedinValue = leadInfo.Linkedin || "";
				if (linkedinValue) {
					leadInfoLinkedinItem.classList.remove("d-none");
					leadInfoLinkedin.textContent = linkedinValue;
					if (linkedinValue === "No tengo perfil de LinkedIn actualmente") {
						leadInfoLinkedin.removeAttribute("href");
						leadInfoLinkedin.removeAttribute("target");
						leadInfoLinkedin.removeAttribute("rel");
					} else {
						leadInfoLinkedin.href = "https://www.linkedin.com/in/" + linkedinValue;
						leadInfoLinkedin.target = "_blank";
						leadInfoLinkedin.rel = "noopener";
					}
				} else {
					leadInfoLinkedinItem.classList.add("d-none");
				}
			}

			if (icGestorLinkedin && icGestorLinkedinItem) {
				const linkedinValue = leadInfo.Linkedin || "";
				if (linkedinValue) {
					icGestorLinkedinItem.classList.remove("d-none");
					icGestorLinkedin.textContent = linkedinValue;
					if (linkedinValue === "No tengo perfil de LinkedIn actualmente") {
						icGestorLinkedin.removeAttribute("href");
						icGestorLinkedin.removeAttribute("target");
						icGestorLinkedin.removeAttribute("rel");
					} else {
						icGestorLinkedin.href = "https://www.linkedin.com/in/" + linkedinValue;
						icGestorLinkedin.target = "_blank";
						icGestorLinkedin.rel = "noopener";
					}
				} else {
					icGestorLinkedinItem.classList.add("d-none");
				}
			}

			if (leadTraderBroker) {
				leadTraderBroker.textContent = leadTrader.Broker || "-";
			}

			if (icGestorBroker) {
				icGestorBroker.textContent = leadTrader.Broker || "-";
			}

			if (leadTraderTiempo) {
				leadTraderTiempo.textContent = leadTrader.TiempoTrader || "-";
			}

			if (leadTraderGestor) {
				leadTraderGestor.textContent = leadTrader.TiempoGestor || "-";
			}

			if (leadTraderActividad) {
				leadTraderActividad.textContent = leadTrader.Actividad || "-";
			}

			if (leadTraderPrograma) {
				leadTraderPrograma.textContent = leadTrader.Programa || "-";
			}

			if (leadTraderAlcance) {
				leadTraderAlcance.textContent = leadTrader.AlcanceClientes || "-";
			}

			if (leadTraderColaboracion) {
				const colaboracionValue = leadTrader.Colaboraciones || "-";
				leadTraderColaboracion.textContent = colaboracionValue;
				leadTraderColaboracion.className = "badge";
				if (colaboracionValue === "Si" || colaboracionValue === "Sí") {
					leadTraderColaboracion.classList.add("bg-primary");
				} else if (colaboracionValue === "Tal vez mas adelante" || colaboracionValue === "Tal vez más adelante") {
					leadTraderColaboracion.classList.add("bg-info");
				} else if (colaboracionValue === "No por ahora") {
					leadTraderColaboracion.classList.add("bg-danger");
				} else {
					leadTraderColaboracion.classList.add("bg-secondary");
				}
			}

			if (icScoreValor) {
				const valor = icScore.Valor !== undefined && icScore.Valor !== null ? icScore.Valor : "-";
				icScoreValor.textContent = String(valor);
				setScoreCircleColor(valor);
			}
			if (icScoreValorTotal) {
				const valor = icScore.Valor !== undefined && icScore.Valor !== null ? icScore.Valor : "-";
				icScoreValorTotal.textContent = String(valor);
			}
			if (icScoreTexto) {
				icScoreTexto.textContent = icScore.Texto || "-";
			}
			if (icScoreEtiqueta) {
				icScoreEtiqueta.textContent = icScore.Etiqueta || "-";
			}
			if (icScoreClasificacion) {
				icScoreClasificacion.textContent = icScore.Clasificacion || "-";
			}
			if (icScorePotencial) {
				icScorePotencial.textContent = icScore.Potencial || "-";
			}

			const applyIcBadgeStyle = (element, color, textColor) => {
				if (!element) {
					return;
				}
				element.classList.remove("bg-warning", "bg-success", "bg-danger", "bg-info", "bg-secondary", "text-dark", "text-white");
				element.style.backgroundColor = color;
				element.style.color = textColor;
			};
			const setIcBadgeStyles = (clasificacion) => {
				const normalized = String(clasificacion || "").trim();
				if (normalized === "Alta Promesa") {
					applyIcBadgeStyle(icScoreEtiqueta, "#2e7d32", "#ffffff");
					applyIcBadgeStyle(icScoreClasificacion, "#2e7d32", "#ffffff");
					applyIcBadgeStyle(icScorePotencial, "#2e7d32", "#ffffff");
					return;
				}
				if (normalized === "Buen Prospecto") {
					applyIcBadgeStyle(icScoreEtiqueta, "#ffca28", "#212529");
					applyIcBadgeStyle(icScoreClasificacion, "#ffca28", "#212529");
					applyIcBadgeStyle(icScorePotencial, "#ffca28", "#212529");
					return;
				}
				if (normalized === "En Desarrollo") {
					applyIcBadgeStyle(icScoreEtiqueta, "#f57c00", "#ffffff");
					applyIcBadgeStyle(icScoreClasificacion, "#f57c00", "#ffffff");
					applyIcBadgeStyle(icScorePotencial, "#f57c00", "#ffffff");
					return;
				}
				if (normalized === "Bajo Potencial") {
					applyIcBadgeStyle(icScoreEtiqueta, "#d32f2f", "#ffffff");
					applyIcBadgeStyle(icScoreClasificacion, "#d32f2f", "#ffffff");
					applyIcBadgeStyle(icScorePotencial, "#d32f2f", "#ffffff");
				}
			};
			setIcBadgeStyles(icScore.Clasificacion || "");

			if (icPerfilComercialList) {
				icPerfilComercialList.innerHTML = "";
				if (Array.isArray(icPayload && icPayload.PerfilComercial) && icPayload.PerfilComercial.length) {
					icPayload.PerfilComercial.forEach((item) => {
						const li = document.createElement("li");
						li.textContent = item;
						icPerfilComercialList.appendChild(li);
					});
				} else {
					const li = document.createElement("li");
					li.textContent = "No se encontró perfil comercial";
					icPerfilComercialList.appendChild(li);
				}
			}

			if (icTrayectoriaProfesionalList) {
				icTrayectoriaProfesionalList.innerHTML = "";
				if (icPayload && icPayload.Trayectoria && typeof icPayload.Trayectoria === "object") {
					const trayectoria = icPayload.Trayectoria;
					const items = [
						{ label: "Experiencia en trading", value: trayectoria.AniosTrader },
						{ label: "Experiencia como gestor / IB", value: trayectoria.AniosGestor },
						{ label: "Especialización", value: trayectoria.Especializacion },
						{ label: "Formato operativo", value: trayectoria.Formato }
					].filter((item) => item.value);
					if (items.length) {
						items.forEach((item) => {
							const li = document.createElement("li");
							li.innerHTML = "<strong>" + item.label + ":</strong> " + item.value;
							icTrayectoriaProfesionalList.appendChild(li);
						});
					} else {
						const li = document.createElement("li");
						li.textContent = "No se encontró trayectoria profesional";
						icTrayectoriaProfesionalList.appendChild(li);
					}
				} else {
					const li = document.createElement("li");
					li.textContent = "No se encontró trayectoria profesional";
					icTrayectoriaProfesionalList.appendChild(li);
				}
			}

			if (icDolorNecesidadList) {
				icDolorNecesidadList.innerHTML = "";
				if (Array.isArray(icPayload && icPayload.DolorNecesidad) && icPayload.DolorNecesidad.length) {
					icPayload.DolorNecesidad.forEach((item) => {
						const li = document.createElement("li");
						li.textContent = item;
						icDolorNecesidadList.appendChild(li);
					});
				} else {
					const li = document.createElement("li");
					li.textContent = "No se encontraron dolores ni necesidades";
					icDolorNecesidadList.appendChild(li);
				}
			}

			if (icArgumentoVentaTexto) {
				icArgumentoVentaTexto.textContent = icPayload && icPayload.ArgumentoVenta ? icPayload.ArgumentoVenta : "No se encontró argumento de venta";
			}

			if (icProductosSeguridosList) {
				icProductosSeguridosList.innerHTML = "";
				if (Array.isArray(icPayload && icPayload.ProductosServicios) && icPayload.ProductosServicios.length) {
					icPayload.ProductosServicios.forEach((item) => {
						const li = document.createElement("li");
						li.textContent = item;
						icProductosSeguridosList.appendChild(li);
					});
				} else {
					const li = document.createElement("li");
					li.textContent = "No se encontraron productos o servicios";
					icProductosSeguridosList.appendChild(li);
				}
			}

			if (icMetricasClientes) {
				icMetricasClientes.textContent = icPayload && icPayload.Metricas && icPayload.Metricas.Clientes ? icPayload.Metricas.Clientes : "-";
			}
			if (icMetricasVolumen) {
				icMetricasVolumen.textContent = icPayload && icPayload.Metricas && icPayload.Metricas.Volumen ? icPayload.Metricas.Volumen : "-";
			}
			if (icMetricasRentabilidad) {
				icMetricasRentabilidad.textContent = icPayload && icPayload.Metricas && icPayload.Metricas.Rentabilidad ? icPayload.Metricas.Rentabilidad : "-";
			}
			if (icMetricasCapital) {
				icMetricasCapital.textContent = icPayload && icPayload.Metricas && icPayload.Metricas.CapitalPromedio ? icPayload.Metricas.CapitalPromedio : "-";
			}

			if (icProximosPasosList) {
				icProximosPasosList.innerHTML = "";
				if (Array.isArray(icPayload && icPayload.ProximosPasos) && icPayload.ProximosPasos.length) {
					icPayload.ProximosPasos.forEach((item) => {
						const li = document.createElement("li");
						li.textContent = item;
						icProximosPasosList.appendChild(li);
					});
				} else {
					const li = document.createElement("li");
					li.textContent = "No se encontraron próximos pasos";
					icProximosPasosList.appendChild(li);
				}
			}

			if (leadRedesSection && leadRedesGrid) {
				const redes = leadPayload.Redes || {};
				const cards = [];
				const normalizeActive = (value) => String(value || "").toLowerCase() === "on";
				const normalizeUrl = (value) => {
					if (!value) {
						return "";
					}
					if (value.startsWith("http://") || value.startsWith("https://")) {
						return value;
					}
					return "https://" + value;
				};
				const addCard = (title, usuario, seguidores, url, color, icon, ctaLabel, subtitle) => {
					cards.push({
						title,
						usuario: usuario || "-",
						seguidores: seguidores || "-",
						url: url || "",
						color,
						icon,
						ctaLabel,
						subtitle
					});
				};

				if (redes.Ig && normalizeActive(redes.Ig.Active)) {
					const usuario = redes.Ig.Usuario || "";
					const url = usuario ? "https://instagram.com/" + usuario.replace(/^@/, "") : "";
					addCard("Instagram", usuario, redes.Ig.Seguidores, url, "#E1306C", "instagram", "Visitar Perfil");
				}

				if (redes.Youtube && normalizeActive(redes.Youtube.Active)) {
					const usuario = redes.Youtube.Usuario || "";
					const url = usuario ? "https://www.youtube.com/" + usuario.replace(/^@/, "") : "";
					addCard("YouTube", usuario, redes.Youtube.Seguidores, url, "#FF0000", "youtube", "Visitar Perfil");
				}

				if (redes.Telegram && normalizeActive(redes.Telegram.Active)) {
					const usuario = redes.Telegram.Usuario || "";
					const url = usuario ? "https://t.me/" + usuario.replace(/^@/, "") : "";
					addCard("Telegram", usuario, redes.Telegram.Seguidores, url, "#229ED9", "send", "Visitar Perfil");
				}

				if (redes.Tiktok && normalizeActive(redes.Tiktok.Active)) {
					const usuario = redes.Tiktok.Usuario || "";
					const url = usuario ? "https://www.tiktok.com/@" + usuario.replace(/^@/, "") : "";
					addCard("TikTok", usuario, redes.Tiktok.Seguidores, url, "#111111", "music", "Visitar Perfil");
				}

				if (redes.Discord && normalizeActive(redes.Discord.Active)) {
					const usuario = redes.Discord.Usuario || "";
					const url = usuario ? "https://discord.com/users/" + usuario.replace(/^@/, "") : "";
					addCard("Discord", usuario, redes.Discord.Seguidores, url, "#5865F2", "message-circle", "Visitar Perfil");
				}

				if (redes.Web) {
					const webUrl = normalizeUrl(redes.Web);
					if (webUrl) {
						addCard("Web", redes.Web, "-", webUrl, "#0d6efd", "globe", "Visitar Sitio", "Sitio Oficial");
					}
				}

				leadRedesGrid.innerHTML = "";
				if (!cards.length) {
					leadRedesSection.classList.add("d-none");
				} else {
					leadRedesSection.classList.remove("d-none");
					cards.forEach((item) => {
						const card = document.createElement("div");
						card.className = "border rounded-4 p-3 d-flex justify-content-between align-items-center gap-3";
						card.style.backgroundColor = "rgba(248, 249, 250, 0.6)";
						card.style.setProperty("border-left", "4px solid " + (item.color || "#adb5bd"), "important");

						const content = document.createElement("div");
						const header = document.createElement("div");
						header.className = "d-flex align-items-center gap-2 mb-1";
						if (item.icon) {
							const icon = document.createElement("i");
							icon.setAttribute("data-feather", item.icon);
							icon.style.width = "16px";
							icon.style.height = "16px";
							icon.style.color = item.color || "#6c757d";
							header.appendChild(icon);
						}
						const title = document.createElement("div");
						title.className = "fw-semibold";
						title.textContent = item.title;
						header.appendChild(title);
						content.appendChild(header);

						const seguidoresLine = document.createElement("div");
						seguidoresLine.className = "small";
						if (item.subtitle) {
							seguidoresLine.textContent = item.subtitle;
						} else {
							seguidoresLine.textContent = item.seguidores + " seguidores";
						}
						content.appendChild(seguidoresLine);

						const usuarioLine = document.createElement("div");
						usuarioLine.className = "small";
						const usuarioValue = document.createElement(item.url ? "a" : "span");
						usuarioValue.textContent = item.usuario;
						if (item.url) {
							usuarioValue.href = item.url;
							usuarioValue.target = "_blank";
							usuarioValue.rel = "noopener";
						}
						usuarioLine.appendChild(usuarioValue);
						content.appendChild(usuarioLine);

						const button = document.createElement("a");
						button.className = "btn btn-sm rounded-pill";
						button.style.backgroundColor = item.color || "#0d6efd";
						button.style.borderColor = item.color || "#0d6efd";
						button.style.color = "#fff";
						button.textContent = item.ctaLabel || "Visitar Perfil";
						if (item.url) {
							button.href = item.url;
							button.target = "_blank";
							button.rel = "noopener";
						} else {
							button.href = "#";
						}

						card.appendChild(content);
						card.appendChild(button);
						leadRedesGrid.appendChild(card);
					});

					if (window.feather && typeof window.feather.replace === "function") {
						window.feather.replace();
					}
				}
			}

			if (leadRegistroIdic) {
				const idicValue = leadRegistro.IDIC !== undefined && leadRegistro.IDIC !== null ? leadRegistro.IDIC : "-";
				leadRegistroIdic.textContent = "IDIC: " + idicValue;
			}

			if (leadRegistroId) {
				const registroValue = leadRegistro.RegistroID || "-";
				leadRegistroId.textContent = "Registro: " + registroValue;
			}

			if (leadRegistroFechaHora) {
				const fecha = leadRegistro.Fecha || "";
				const hora = leadRegistro.Hora || "";
				if (fecha || hora) {
					leadRegistroFechaHora.textContent = "Registrado el " + (fecha || "-") + (hora ? " a las " + hora : "");
				} else {
					leadRegistroFechaHora.textContent = "-";
				}
			}

			if (badge) {
				const clasificacion = leadRegistro.Clasificacion || "-";
				const clasificacionIcon = classificationIcons[clasificacion];
				setBadgeContent(badge, clasificacion, clasificacionIcon);
				badge.style.backgroundColor = classificationColors[clasificacion] || "#6C757D";
				badge.style.color = "#fff";
			}

			if (statusBadge) {
				const estado = (leadRegistro.Estado || "-").trim();
				const estadoIcon = stateIcons[estado];
				setBadgeContent(statusBadge, estado, estadoIcon);
				statusBadge.style.backgroundColor = stateColors[estado] || "#6C757D";
				statusBadge.style.color = "#fff";
				statusBadge.style.display = "inline-block";
				currentEstado = estado;
				updateEstadoSelect(estado);
			}

			const isProspecto = Boolean(leadProspecto.EsProspecto);
			const prospectoInfo = parseProspectoInfo(leadProspecto.InfoProspecto);
			setProspectoButton(isProspecto);
			setProspectoCard(isProspecto, prospectoInfo);

			renderSeguimiento(parseSeguimiento(seguimientoPayload));
			showContent();
		} catch (error) {
			showEmpty();
		}
	};

	const handleProspectoToggle = async () => {
		if (!prospectoToggle) {
			return;
		}

		const usuario = localStorage.getItem("user_name") || "";
		const usuariofoto = topbarAvatar && topbarAvatar.src ? topbarAvatar.src : "";
		if (!idic || !usuario) {
			return;
		}

		const isProspecto = prospectoToggle.classList.contains("btn-danger");
		const tipo = isProspecto ? "quitar" : "asignar";

		const originalButtonHtml = prospectoToggle.innerHTML;
		prospectoToggle.disabled = true;
		prospectoToggle.innerHTML = "<span class=\"d-inline-flex align-items-center justify-content-center me-2\" style=\"width:18px;height:18px;background:#0d6efd;border-radius:999px;\"><span class=\"prospecto-spinner\" role=\"status\" aria-hidden=\"true\"></span></span>Actualizando...";
		try {
			const response = await fetch("https://auto.myduomarkets.com/webhook/lead/prospect-estate", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					idic,
					usuario,
					usuariofoto,
					tipo
				})
			});

			const data = await response.json();
			const payload = Array.isArray(data) ? data[0] : data;
			if (payload && payload.success === true) {
				if (payload.Estado === "Es Prospecto") {
					setProspectoButton(true);
				} else if (payload.Estado === "No Prospecto") {
					setProspectoButton(false);
					setProspectoCard(false, []);
				}
				fetchLead();
			}
		} catch (error) {
			// Sin mensaje de error por ahora
		} finally {
			prospectoToggle.disabled = false;
			prospectoToggle.innerHTML = originalButtonHtml;
		}
	};

	const sendSeguimiento = async () => {
		if (!seguimientoInput || !seguimientoSend) {
			return;
		}

		const comentario = seguimientoInput.value.trim();
		const token = localStorage.getItem("auth_token");

		if (!comentario || !idic || !token) {
			return;
		}

		seguimientoSend.disabled = true;
		const originalText = seguimientoSend.textContent;
		seguimientoSend.textContent = "Enviando...";

		try {
			const response = await fetch("https://auto.myduomarkets.com/webhook/ic/lead/activity", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					idic,
					comentario,
					token
				})
			});

			const data = await response.json();
			const payload = Array.isArray(data) && data[0] ? data[0] : data;
			renderSeguimiento(parseSeguimiento(payload));
			seguimientoInput.value = "";
			showSeguimientoAlert();
		} catch (error) {
			// Sin mensaje de error por ahora
		} finally {
			seguimientoSend.disabled = false;
			seguimientoSend.textContent = originalText;
		}
	};

	const updateEstadoBadge = (estado) => {
		if (!statusBadge) {
			return;
		}
		const estadoText = (estado || "-").trim();
		const estadoIcon = stateIcons[estadoText];
		setBadgeContent(statusBadge, estadoText, estadoIcon);
		statusBadge.style.backgroundColor = stateColors[estadoText] || "#6C757D";
		statusBadge.style.color = "#fff";
		statusBadge.style.display = "inline-block";
	};

	const updateEstado = async () => {
		if (!estadoSelect || !estadoSave || !idic) {
			return;
		}
		const usuario = localStorage.getItem("user_name") || "";
		const usuariofoto = topbarAvatar && topbarAvatar.src ? topbarAvatar.src : "";
		const estado = estadoSelect.value;
		const estadoActual = String(currentEstado || "").trim();

		if (estado && estadoActual && estado === estadoActual) {
			showEstadoAlert();
			return;
		}
		hideEstadoAlert();

		if (!usuario || !estado) {
			return;
		}

		const originalText = estadoSave.innerHTML;
		estadoSave.disabled = true;
		estadoSave.innerHTML = "<span class=\"d-inline-flex align-items-center justify-content-center me-2\" style=\"width:18px;height:18px;background:#0d6efd;border-radius:999px;\"><span class=\"prospecto-spinner\" role=\"status\" aria-hidden=\"true\"></span></span>Actualizando";

		try {
			const response = await fetch("https://auto.myduomarkets.com/webhook/ic/lead/state/update", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					IDIC: idic,
					usuario,
					usuariofoto,
					estado
				})
			});

			const data = await response.json();
			const payload = Array.isArray(data) ? data[0] : data;
			if (payload && payload.success === true) {
				currentEstado = estado;
				updateEstadoBadge(estado);
				updateEstadoSelect(estado);
				fetchLead();
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

	if (seguimientoSend) {
		seguimientoSend.addEventListener("click", sendSeguimiento);
	}

	if (prospectoToggle) {
		prospectoToggle.addEventListener("click", (event) => {
			event.preventDefault();
			handleProspectoToggle();
		});
	}

	if (prospectoUpdateBtn) {
		prospectoUpdateBtn.addEventListener("click", (event) => {
			event.preventDefault();
			openProspectoModal();
		});
	}

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

	if (prospectoRange) {
		prospectoRange.addEventListener("input", (event) => {
			updateProspectoRange(event.target.value);
		});
	}

	if (prospectoSave) {
		prospectoSave.addEventListener("click", (event) => {
			event.preventDefault();
			if (!idic) {
				return;
			}

			const usuario = localStorage.getItem("user_name") || "";
			const usuariofoto = topbarAvatar && topbarAvatar.src ? topbarAvatar.src : "";
			if (!usuario) {
				return;
			}

			const rawNivel = prospectoRange ? prospectoRange.value : "0";
			const parsedNivel = parseInt(rawNivel, 10);
			const nivel = Number.isNaN(parsedNivel) ? 0 : Math.max(0, Math.min(100, parsedNivel));

			const originalText = prospectoSave.innerHTML;
			prospectoSave.disabled = true;
			prospectoSave.innerHTML = "<span class=\"prospecto-spinner me-2\" role=\"status\" aria-hidden=\"true\"></span>Actualizando...";

			fetch("https://auto.myduomarkets.com/webhook/lead/prospect-estate", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					idic,
					usuario,
					usuariofoto,
					tipo: "actualizar",
					nivel
				})
			})
				.then((response) => response.json())
				.then((data) => {
					const payload = Array.isArray(data) ? data[0] : data;
					if (payload && payload.success === true) {
						if (prospectoUpdate) {
							const updateUser = payload.updateUser || "";
							const updateDate = payload.updateDate || "";
							const updateTime = payload.updateTime || "";
							const updateDetalles = [updateDate, updateTime].filter(Boolean).join(" ");
							const updateMeta = updateUser ? "Actualizado por: " + updateUser + (updateDetalles ? " el " + updateDetalles : "") : updateDetalles;
							if (updateMeta) {
								prospectoUpdate.textContent = updateMeta;
							}
						}
						if (prospectoModal && window.bootstrap && typeof window.bootstrap.Modal === "function") {
							const modalInstance = window.bootstrap.Modal.getOrCreateInstance(prospectoModal);
							modalInstance.hide();
						}
						fetchLead();
					}
				})
				.catch(() => {
					// Sin mensaje de error por ahora
				})
				.finally(() => {
					prospectoSave.disabled = false;
					prospectoSave.innerHTML = originalText;
				});
		});
	}

	fetchLead();
});
