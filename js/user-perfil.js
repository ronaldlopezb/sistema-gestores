document.addEventListener("DOMContentLoaded", () => {
	const nombreInput = document.getElementById("perfil-nombre");
	const correoInput = document.getElementById("perfil-correo");
	const cantidadInput = document.getElementById("perfil-cantidad-listados");
	const filtroSelect = document.getElementById("perfil-filtro-predeterminado");
	const filtroAutomaticoSelect = document.getElementById("perfil-filtro-automatico");
	const fotoPreview = document.getElementById("perfil-foto-preview");
	const fotoInput = document.getElementById("perfil-foto");
	const changePasswordButton = document.getElementById("perfil-clave-cambiar");
	const saveDatosButton = document.getElementById("perfil-guardar-datos");
	const savePreferenciasButton = document.getElementById("perfil-guardar-preferencias");
	const saveFotoButton = document.getElementById("perfil-guardar-foto");
	const claveActualInput = document.getElementById("perfil-clave-actual");
	const claveNuevaInput = document.getElementById("perfil-clave-nueva");
	const claveConfirmInput = document.getElementById("perfil-clave-confirmar");
	const alertDatos = document.getElementById("perfil-alert-datos");
	const alertPreferencias = document.getElementById("perfil-alert-preferencias");
	const alertSeguridad = document.getElementById("perfil-alert-seguridad");
	const alertFoto = document.getElementById("perfil-alert-foto");
	const topbarUserName = document.getElementById("user-name");
	const topbarUserAvatar = document.getElementById("user-avatar");

	const token = localStorage.getItem("auth_token") || "";
	const updateWebhookUrl = "https://auto.myduomarkets.com/webhook/ic/user/perfil/update";

	const updateDatosButtonState = () => {
		if (!saveDatosButton) {
			return;
		}
		const nombreValue = nombreInput ? nombreInput.value.trim() : "";
		const correoValue = correoInput ? correoInput.value.trim() : "";
		const isValid = Boolean(nombreValue && correoValue);
		saveDatosButton.disabled = !isValid;
	};

	const normalizeFiltro = (value) => {
		return String(value || "")
			.trim()
			.toLowerCase()
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
			.replace(/\s+/g, " ");
	};

	const filtroMap = {
		"hoy": "hoy",
		"esta semana": "semana",
		"ultimos 15 dias": "15-dias",
		"este mes": "mes",
		"ultimos 3 meses": "3-meses",
		"ultimos 6 meses": "6-meses",
		"ano actual": "1-ano",
		"ultimo ano": "1-ano",
		"1 ano": "1-ano",
		"todo": "todo"
	};

	const applyFiltroValue = (rawValue) => {
		if (!filtroSelect) {
			return;
		}
		const normalized = normalizeFiltro(rawValue);
		if (!normalized) {
			return;
		}
		const mapped = filtroMap[normalized] || "";
		const optionList = Array.from(filtroSelect.options);
		const resolvedValue = mapped
			? mapped
			: (optionList.find((option) => normalizeFiltro(option.textContent) === normalized) || {}).value;
		if (resolvedValue) {
			filtroSelect.value = resolvedValue;
		}
	};

	const applyProfileData = (data) => {
		if (!data || typeof data !== "object") {
			return;
		}
		if (nombreInput) {
			nombreInput.value = data.Nombre || "";
		}
		if (correoInput) {
			correoInput.value = data.Correo || "";
		}
		if (cantidadInput) {
			cantidadInput.value = data.CantidadListados || "";
		}
		if (filtroAutomaticoSelect) {
			const filtroAutomaticoValue = data.FiltroAutomatico === true ? "true" : "false";
			filtroAutomaticoSelect.value = filtroAutomaticoValue;
		}
		if (fotoPreview && data.Foto) {
			fotoPreview.src = data.Foto;
		}
		applyFiltroValue(data.FiltroPredeterminado);
	};

	const fetchPerfil = async () => {
		if (!token) {
			return;
		}
		try {
			const response = await fetch("https://auto.myduomarkets.com/webhook/ic/user/perfil", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					token
				})
			});
			const payload = await response.json();
			const profile = Array.isArray(payload) ? payload[0] : payload;
			applyProfileData(profile);
		} catch (error) {
			// Sin manejo de error por ahora
		}
	};

	const setAlert = (element, isSuccess, message) => {
		if (!element) {
			return;
		}
		element.classList.remove("d-none", "alert-success", "alert-danger");
		element.classList.add("alert");
		element.classList.add(isSuccess ? "alert-success" : "alert-danger");
		element.textContent = message;
		setTimeout(() => {
			element.classList.add("d-none");
		}, 5000);
	};

	const setButtonLoading = (button, isLoading, loadingText) => {
		if (!button) {
			return;
		}
		if (isLoading) {
			button.dataset.originalText = button.innerHTML;
			button.disabled = true;
			button.innerHTML = "<span class=\"spinner-border spinner-border-sm me-2\" role=\"status\" aria-hidden=\"true\"></span>" + (loadingText || "Guardando...");
			return;
		}
		button.disabled = false;
		if (button.dataset.originalText) {
			button.innerHTML = button.dataset.originalText;
		}
	};

	const sendUpdate = async (payload, alertElement, button, messages) => {
		if (!token) {
			setAlert(alertElement, false, "No hay sesion activa.");
			return;
		}
		try {
			setButtonLoading(button, true);
			const response = await fetch(updateWebhookUrl, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					token,
					...payload
				})
			});
			const data = await response.json();
			if (payload && payload.tipo === "Seguridad") {
				const message = data && data.message ? data.message : "";
				setAlert(alertElement, data && data.success === true, message || "");
				return;
			}
			if (data && data.success === true) {
				if (payload && payload.tipo === "Datos Generales" && topbarUserName) {
					topbarUserName.textContent = payload.Nombre || "";
					if (payload.Nombre) {
						localStorage.setItem("user_name", payload.Nombre);
					}
				}
				setAlert(alertElement, true, (messages && messages.success) || "Actualizacion exitosa.");
				return;
			}
			setAlert(alertElement, false, (messages && messages.error) || "No se pudo actualizar.");
		} catch (error) {
			setAlert(alertElement, false, "Error al conectar con el servidor.");
		} finally {
			setButtonLoading(button, false);
		}
	};

	const sendFotoUpdate = async () => {
		if (!token) {
			setAlert(alertFoto, false, "No hay sesion activa.");
			return;
		}
		if (!fotoInput || !fotoInput.files || !fotoInput.files[0]) {
			setAlert(alertFoto, false, "Selecciona una foto primero.");
			return;
		}
		const formData = new FormData();
		formData.append("token", token);
		formData.append("tipo", "Foto");
		formData.append("Foto", fotoInput.files[0]);
		try {
			setButtonLoading(saveFotoButton, true, "Subiendo...");
			const response = await fetch(updateWebhookUrl, {
				method: "POST",
				body: formData
			});
			const data = await response.json();
			if (data && data.success === true) {
				if (topbarUserAvatar && fotoPreview) {
					topbarUserAvatar.src = fotoPreview.src;
					topbarUserAvatar.alt = "Usuario";
				}
				setAlert(alertFoto, true, "Foto actualizar correctamente");
				return;
			}
			setAlert(alertFoto, false, "No se actualizo la foto");
		} catch (error) {
			setAlert(alertFoto, false, "Error al conectar con el servidor.");
		} finally {
			setButtonLoading(saveFotoButton, false);
		}
	};

	if (fotoInput && fotoPreview) {
		fotoInput.addEventListener("change", (event) => {
			const file = event.target.files && event.target.files[0];
			if (!file) {
				return;
			}
			const reader = new FileReader();
			reader.onload = () => {
				if (reader.result) {
					fotoPreview.src = reader.result;
				}
			};
			reader.readAsDataURL(file);
		});
	}

	if (changePasswordButton) {
		changePasswordButton.addEventListener("click", (event) => {
			event.preventDefault();
			const claveActual = claveActualInput ? claveActualInput.value.trim() : "";
			const claveNueva = claveNuevaInput ? claveNuevaInput.value.trim() : "";
			const claveConfirm = claveConfirmInput ? claveConfirmInput.value.trim() : "";
			if (!claveActual || !claveNueva || !claveConfirm) {
				setAlert(alertSeguridad, false, "Completa todos los campos de contraseña.");
				return;
			}
			if (claveNueva !== claveConfirm) {
				setAlert(alertSeguridad, false, "Las nuevas contraseñas no coinciden.");
				return;
			}
			sendUpdate({
				tipo: "Seguridad",
				ClaveActual: claveActual,
				ClaveNueva: claveNueva,
				ClaveNuevaConfirm: claveConfirm
			}, alertSeguridad, changePasswordButton, {
				success: "",
				error: ""
			});
		});
	}

	if (saveDatosButton) {
		saveDatosButton.addEventListener("click", (event) => {
			event.preventDefault();
			const nombreValue = nombreInput ? nombreInput.value.trim() : "";
			const correoValue = correoInput ? correoInput.value.trim() : "";
			if (!nombreValue || !correoValue) {
				setAlert(alertDatos, false, "No se pudo guardar los datos");
				return;
			}
			sendUpdate({
				tipo: "Datos Generales",
				Nombre: nombreValue,
				Correo: correoValue
			}, alertDatos, saveDatosButton, {
				success: "Datos generales guardados correctamente",
				error: "No se pudo guardar los datos"
			});
		});
	}

	if (nombreInput) {
		nombreInput.addEventListener("input", updateDatosButtonState);
	}
	if (correoInput) {
		correoInput.addEventListener("input", updateDatosButtonState);
	}

	if (savePreferenciasButton) {
		savePreferenciasButton.addEventListener("click", (event) => {
			event.preventDefault();
			const cantidadValue = cantidadInput ? parseInt(cantidadInput.value, 10) : 0;
			if (!cantidadValue) {
				setAlert(alertPreferencias, false, "No se pudo guardar los datos");
				return;
			}
			sendUpdate({
				tipo: "Preferencias",
				CantidadListados: cantidadValue,
				FiltroPredeterminado: filtroSelect ? filtroSelect.options[filtroSelect.selectedIndex].text : "",
				FiltroAutomatico: filtroAutomaticoSelect ? filtroAutomaticoSelect.value === "true" : false
			}, alertPreferencias, savePreferenciasButton, {
				success: "Se guardaron sus preferencias",
				error: "No se pudo guardar los datos"
			});
		});
	}

	if (saveFotoButton) {
		saveFotoButton.addEventListener("click", (event) => {
			event.preventDefault();
			sendFotoUpdate();
		});
	}

	fetchPerfil();
	updateDatosButtonState();
});
