<?php include '../../includes/base.php'; ?>
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="description" content="Responsive Admin &amp; Dashboard Template based on Bootstrap 5">
	<?php include '../../includes/head-meta.php'; ?>

	<link rel="preconnect" href="https://fonts.gstatic.com">
	<link rel="shortcut icon" href="<?php echo $baseUrl; ?>/assets/img/icons/icon-48x48.png" />

	<link rel="canonical" href="https://demo-basic.adminkit.io/pages-profile.html" />

	<link href="<?php echo $baseUrl; ?>/assets/css/app.css" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
	<style>
		.prospecto-spinner {
			display: inline-block;
			width: 12px;
			height: 12px;
			border: 2px solid #fff;
			border-right-color: transparent;
			border-radius: 50%;
			animation: prospecto-spin 0.6s linear infinite;
		}

		@keyframes prospecto-spin {
			to {
				transform: rotate(360deg);
			}
		}

		.modal {
			display: none;
			position: fixed;
			inset: 0;
			z-index: 1055;
			overflow: auto;
		}

		.modal.show {
			display: block;
		}

		.modal-dialog {
			max-width: 520px;
			margin: 1.75rem auto;
		}

		.modal-dialog.modal-lg {
			max-width: 900px;
		}

		.modal-dialog.modal-xl {
			max-width: 880px;
		}

		.modal-content {
			background: #fff;
			border-radius: 0.5rem;
			box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
		}

		.modal-header {
			padding: 1rem 1.5rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid #e9ecef;
		}

		.modal-title {
			margin: 0;
			font-weight: 600;
		}

		.modal-body {
			padding: 1.5rem;
		}

		#prospecto-range {
			flex: 1 1 auto;
			min-width: 180px;
			appearance: none;
			height: 6px;
			border-radius: 999px;
			--fill: 0%;
			background: linear-gradient(90deg, #0d6efd var(--fill), #d0d7de var(--fill));
			outline: none;
		}

		#prospecto-range::-webkit-slider-runnable-track {
			height: 6px;
			border-radius: 999px;
			background: linear-gradient(90deg, #0d6efd var(--fill), #d0d7de var(--fill));
		}

		#prospecto-range::-moz-range-track {
			height: 6px;
			border-radius: 999px;
			background: #d0d7de;
		}

		#prospecto-range::-moz-range-progress {
			height: 6px;
			border-radius: 999px;
			background: #0d6efd;
		}

		#prospecto-range::-webkit-slider-thumb {
			appearance: none;
			width: 16px;
			height: 16px;
			border-radius: 50%;
			background: #0d6efd;
			border: 2px solid #fff;
			box-shadow: 0 0 0 1px rgba(13, 110, 253, 0.3);
		}

		#prospecto-range::-moz-range-thumb {
			width: 16px;
			height: 16px;
			border-radius: 50%;
			background: #0d6efd;
			border: 2px solid #fff;
			box-shadow: 0 0 0 1px rgba(13, 110, 253, 0.3);
		}

		.modal-backdrop {
			position: fixed;
			inset: 0;
			background: rgba(0, 0, 0, 0.5);
			z-index: 1050;
		}
	</style>
</head>

<body>
	<div class="wrapper">
		<?php include '../../includes/sidebar.php'; ?>

		<div class="main">
			<?php include '../../includes/topbar.php'; ?>

			<main class="content">
				<div class="container-fluid p-0">
					<div id="lead-empty" class="card d-none">
						<div class="card-body text-center py-5">
							<div class="h5 mb-2">Lead no encontrada</div>
							<div class="text-muted">No se encontro informacion para este ID.</div>
						</div>
					</div>

					<!-- CONTENIDO PRINCIPAL -->
					<div id="lead-content">
						<!-- NOMBRE + CLASIFICACION + ESTADO -->
						<div class="mb-3">
							<h1 class="h3 d-inline align-middle" id="lead-title">Gestor</h1>
							<span class="badge ms-2" id="lead-badge">Calificacion</span>
							<span class="badge ms-2" id="lead-status">Estado</span>
						</div>

						<!-- BLOQUE PRINCIPAL DE COLUMNAS -->
						<div class="row">
							
							<!-- COLUMNA IZQUIERDA -->
							<div class="col-md-4 col-xl-3">
								
								<!-- CARD PROSPECTO -->
								<div class="card bg-success text-white mb-3 d-none" id="prospecto-card">
									<div class="card-body py-3">
										<div class="d-flex justify-content-between align-items-center">
											<div class="text-uppercase fw-semibold">Prospecto</div>
											<button type="button" class="btn btn-primary btn-sm rounded-pill py-0" id="prospecto-update-btn">Actualizar</button>
										</div>
										<div class="d-flex align-items-center gap-2 mt-2">
											<div class="flex-grow-1" style="height: 10px; background-color: rgba(255,255,255,0.5); border: 1px solid rgba(255,255,255,0.35); border-radius: 999px; overflow: hidden;">
												<div id="prospecto-progress" role="progressbar" style="width: 0%; height: 100%; background-color: #0d6efd;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
											</div>
											<div class="badge bg-primary" id="prospecto-nivel">0%</div>
										</div>
										<div class="small text-white" id="prospecto-meta"></div>
										<div class="small text-white" id="prospecto-update"></div>
									</div>
								</div>
								
								<!-- CARD PERFIL -->
								<div class="card mb-3">
									<div class="card-header">
										<h5 class="card-title mb-0">Perfil de Gestor</h5>
									</div>
									<div class="card-body text-center">
										<img src="<?php echo $baseUrl; ?>/assets/img/avatars/avatar-4.jpg" alt="Christina Mason" class="img-fluid rounded-circle mb-2" width="128" height="128" />
										<h5 class="card-title mb-0" id="lead-name">Christina Mason</h5>
										<span class="btn btn-primary rounded-pill btn-sm mt-1" id="lead-objetivo">Lead Developer</span>
									</div>
									<hr class="my-0" />
									<div class="card-body">
										<h5 class="h6 card-title">Informacion de la Lead</h5>
										<ul class="list-unstyled mb-0">
											<li class="mb-1"><span data-feather="user" class="feather-sm me-1"></span><span class="text-muted">Nombre:</span> <span id="lead-info-name">-</span></li>
											<li class="mb-1"><span data-feather="mail" class="feather-sm me-1"></span><span class="text-muted">Correo:</span> <span id="lead-info-email">-</span></li>
											<li class="mb-1"><span data-feather="globe" class="feather-sm me-1"></span><span class="text-muted">Pais:</span> <span id="lead-info-country">-</span></li>
											<li class="mb-1"><span data-feather="phone" class="feather-sm me-1"></span><span class="text-muted">WhatsApp:</span> <a id="lead-info-whatsapp" href="#" target="_blank" rel="noopener">-</a></li>
											<li class="mb-1" id="lead-info-linkedin-item"><span data-feather="linkedin" class="feather-sm me-1"></span><span class="text-muted">LinkedIn:</span> <a id="lead-info-linkedin" href="#" target="_blank" rel="noopener">-</a></li>
										</ul>
									</div>
									<hr class="my-0" />
									<div class="card-body">
										<h5 class="h6 card-title">Trader/Gestor</h5>
										<ul class="list-unstyled mb-0">
											<li class="mb-1"><span data-feather="briefcase" class="feather-sm me-1"></span><span class="text-muted">Broker:</span> <span id="lead-trader-broker">-</span></li>
											<li class="mb-1"><span data-feather="activity" class="feather-sm me-1"></span><span class="text-muted">Actividad:</span> <span id="lead-trader-actividad">-</span></li>
											<li class="mb-1"><span data-feather="layers" class="feather-sm me-1"></span><span class="text-muted">Programa:</span> <span id="lead-trader-programa">-</span></li>
											<li class="mb-1"><span data-feather="users" class="feather-sm me-1"></span><span class="text-muted">Alcance Clientes:</span> <span id="lead-trader-alcance">-</span></li>
										</ul>
									</div>
									<hr class="my-0" />
									<div class="card-body">
										<h5 class="h6 card-title">Experiencia</h5>
										<ul class="list-unstyled mb-0">
											<li class="mb-1"><span data-feather="clock" class="feather-sm me-1"></span><span class="text-muted">Tiempo Trader:</span> <span id="lead-trader-tiempo">-</span></li>
											<li class="mb-1"><span data-feather="clock" class="feather-sm me-1"></span><span class="text-muted">Tiempo Gestor:</span> <span id="lead-trader-gestor">-</span></li>
										</ul>
									</div>
									<hr class="my-0" />
									<div class="card-body">
										<h5 class="h6 card-title">Colaboraciones</h5>
										<ul class="list-unstyled mb-0">
											<li class="mb-1"><span data-feather="users" class="feather-sm me-1"></span><span class="text-muted">Predispuesto a colaborar en eventos:</span> <span class="badge bg-primary" id="lead-trader-colaboracion">-</span></li>
										</ul>
									</div>
									<div id="lead-redes-section">
										<hr class="my-0" />
										<div class="card-body" id="lead-redes">
											<h5 class="h6 card-title">Ecosistema Digital</h5>
											<div class="d-flex flex-column gap-2" id="lead-redes-grid"></div>
										</div>
									</div>
								</div>

								<!-- CARD REGISTRO -->
								<div class="card mb-3">
									<div class="card-body">
										<h5 class="h6 card-title">Informacion de Registro</h5>
										<span class="badge bg-primary me-1 my-1" id="lead-registro-idic">IDIC: -</span>
										<span class="badge bg-primary me-1 my-1" id="lead-registro-id">-</span>
										<span class="badge bg-primary me-1 my-1" id="lead-registro-fecha-hora">-</span>
									</div>
								</div>
							</div>
							<!-- COLUMNA DERECHA -->
							<div class="col-md-8 col-xl-9">

								<!-- BOTONES TABS -->
								<div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
										<div class="d-flex flex-wrap gap-2" role="tablist">
											<button class="btn btn-outline-primary rounded-pill active" data-bs-toggle="tab" data-bs-target="#tab-ic" type="button" role="tab">Inteligencia Comercial</button>
											<button class="btn btn-outline-primary rounded-pill" data-bs-toggle="tab" data-bs-target="#tab-seguimiento" type="button" role="tab">Seguimiento</button>
										</div>
									<div class="d-inline-flex gap-2" role="group">
										<button type="button" class="btn btn-primary btn-sm rounded-pill" id="lead-estado-update"><i data-feather="refresh-cw" class="me-1"></i>Actualizar Estado</button>
										<button type="button" class="btn btn-success btn-sm rounded-pill" id="prospecto-toggle"><i data-feather="user-check" class="me-1"></i>Marcar como Prospecto</button>
									</div>
								</div>

								<!-- CONTENIDO DE LOS TABS -->
								<div class="tab-content">

									<!-- TAB: INTELIGENCIA COMERCIAL -->
									<div class="tab-pane fade show active" id="tab-ic" role="tabpanel">
										
									<div id="ic-header">
										<div class="row g-3 mb-3">
											<div class="col-12 col-lg-9">
												<div class="card h-100">
													<div class="card-body d-flex align-items-center justify-content-between gap-3 flex-wrap">
														<div>
															<div class="d-flex align-items-center gap-2 mb-2">
																<span class="badge bg-primary">MenteInversora</span>
																<span class="badge bg-light text-dark">Dossier Comercial</span>
															</div>
															<h4 class="mb-2 fw-semibold text-dark"><i data-feather="file-text" class="me-2"></i>Dossier de Inteligencia Comercial</h4>
															<p class="text-muted mb-0">Documento interno para estrategia de ventas y priorización de leads.</p>
														</div>
														<span class="badge bg-primary">Uso interno · Confidencial</span>
													</div>
												</div>
											</div>
											<div class="col-12 col-lg-3">
												<div class="card h-100">
													<div class="card-body d-flex flex-column justify-content-center gap-2">
														<button type="button" class="btn btn-outline-primary w-100" data-bs-toggle="modal" data-bs-target="#evaluacion-profesional-modal">Evaluación Profesional</button>
														<button type="button" class="btn btn-outline-primary w-100" data-bs-toggle="modal" data-bs-target="#evaluacion-rapida-modal">Evaluación Rápida</button>
													</div>
												</div>
											</div>
										</div>
									</div>

										<div id="ic-score-comercial-interno" class="fs-6">
											<div class="card mb-3">
													<div class="card-body pb-3">
													<h6 class="text-uppercase fw-semibold text-dark mb-3"><i data-feather="clipboard" class="me-2"></i>Ficha Rápida del Lead · Score Comercial Interno</h6>
														<div class="d-flex align-items-center gap-3 mb-3 flex-wrap">
															<div class="d-flex align-items-center gap-3 flex-grow-1">
															<div class="d-flex align-items-center justify-content-center rounded-circle" id="ic-score-circle" style="width:96px;height:96px;background:#f5f7fb;">
																<span class="h2 fw-semibold mb-0" id="ic-score-valor">65</span>
																</div>
																<div>
																<div class="fw-semibold" id="ic-score-valor-total-label">Score: <span id="ic-score-valor-total">65</span> / 100</div>
																<p class="text-muted mb-0" id="ic-score-texto">Lead con buen nivel de madurez comercial, con indicadores sólidos en experiencia, volumen y rentabilidad.</p>
																</div>
															</div>
															<span class="badge ms-auto" id="ic-score-etiqueta">Seguimiento activo</span>
														</div>

													<div class="row g-3">
														<div class="col-md-6">
															<div class="card mb-0">
																<div class="card-body">
																<div class="text-muted">Clasificación</div>
																<div class="fw-semibold"><span class="me-1">⭐</span><span class="badge" id="ic-score-clasificacion">Buen Prospecto</span></div>
																</div>
															</div>
														</div>

														<div class="col-md-6">
															<div class="card mb-0">
																<div class="card-body">
																<div class="text-muted">Potencial de ingresos</div>
																<div class="fw-semibold"><span class="badge" id="ic-score-potencial">Medio - Alto</span></div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>

										<div class="row g-3">
											<div class="col-md-6">
												<div id="ic-perfil-comercial">
													<div class="card mb-3">
														<div class="card-body">
															<h6 class="card-title fw-semibold text-dark"><i data-feather="user" class="me-2"></i>Perfil Comercial</h6>
															<ul class="mb-0" id="ic-perfil-comercial-list"></ul>
														</div>
													</div>
												</div>
											</div>
											<div class="col-md-6">
												<div id="ic-trayectoria-profesional">
													<div class="card mb-3">
														<div class="card-body">
														<h6 class="card-title fw-semibold text-dark"><i data-feather="compass" class="me-2"></i>Trayectoria Profesional</h6>
															<ul class="mb-0" id="ic-trayectoria-profesional-list"></ul>
														</div>
													</div>
												</div>
											</div>
										</div>

										<div id="ic-dolor-necesidad">
											<div class="card mb-3 bg-danger text-white">
												<div class="card-body">
													<h6 class="card-title fw-semibold text-white"><i data-feather="alert-triangle" class="me-2"></i>Dolor / Necesidad Detectada</h6>
													<ul class="mb-0 text-white" id="ic-dolor-necesidad-list"></ul>
												</div>
											</div>
										</div>

										<div id="ic-argumento-venta">
											<div class="card mb-3 bg-white border border-success border-2">
												<div class="card-body">
													<h6 class="card-title fw-semibold text-dark"><i data-feather="message-circle" class="me-2"></i>Argumento de Venta Recomendado</h6>
													<div class="p-3 rounded-3 text-dark" id="ic-argumento-venta-texto" style="background:#eaf6ef;">
														Actualmente, su modelo de operación presenta un nivel de madurez buen prospecto, con una base sólida para evolucionar hacia un esquema más rentable y escalable. Se identifican oportunidades claras de mejora, principalmente en bajo volumen operativo mensual, limitando su capacidad de generación de ingresos. A través del ecosistema institucional de DuoMarkets, es posible optimizar sus condiciones operativas, fortalecer su posicionamiento comercial y ampliar su capacidad de captación de capital. Este enfoque integral le permitirá acelerar su crecimiento, consolidar su cartera de inversionistas y posicionarse como un gestor institucional de referencia.
													</div>
												</div>
											</div>
										</div>

										<div id="ic-productos-seguridos">
											<div class="card mb-3">
												<div class="card-body">
													<h6 class="card-title fw-semibold text-dark"><i data-feather="package" class="me-2"></i>Producto / Servicio Sugerido</h6>
													<ul class="mb-0" id="ic-productos-seguridos-list"></ul>
												</div>
											</div>
										</div>

										<div id="ic-alcance-metricas">
											<div class="card mb-3">
												<div class="card-body">
													<h6 class="card-title fw-semibold text-dark"><i data-feather="bar-chart-2" class="me-2"></i>Alcance y Métricas de Negocio</h6>
													<div class="row g-3">
														<div class="col-md-6">
															<div class="card mb-0">
																<div class="card-body">
																<div class="text-muted"><i data-feather="users" class="me-2"></i>Clientes activos</div>
																<div class="fw-semibold" id="ic-metricas-clientes">21–50 clientes</div>
																</div>
															</div>
														</div>
														<div class="col-md-6">
															<div class="card mb-0">
																<div class="card-body">
																<div class="text-muted"><i data-feather="bar-chart-2" class="me-2"></i>Volumen mensual</div>
																<div class="fw-semibold" id="ic-metricas-volumen">50–200 lotes</div>
																</div>
															</div>
														</div>
														<div class="col-md-6">
															<div class="card mb-0">
																<div class="card-body">
																<div class="text-muted"><i data-feather="percent" class="me-2"></i>Rentabilidad anual</div>
																<div class="fw-semibold" id="ic-metricas-rentabilidad">10% – 20%</div>
																</div>
															</div>
														</div>
														<div class="col-md-6">
															<div class="card mb-0">
																<div class="card-body">
																<div class="text-muted"><i data-feather="dollar-sign" class="me-2"></i>Capital promedio por inversor</div>
																<div class="fw-semibold" id="ic-metricas-capital">$2 000–$10 000 dólares</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>

										<div id="ic-proximos-pasos">
											<div class="card mb-3">
												<div class="card-body">
													<h6 class="card-title fw-semibold text-dark"><i data-feather="check-circle" class="me-2"></i>Próximos Pasos Sugeridos</h6>
													<ul class="mb-0" id="ic-proximos-pasos-list"></ul>
												</div>
											</div>
										</div>

										<div class="p-3 rounded-3 border bg-light mb-3 small">
											Certificado por MenteInversora AI Systems. Este informe y su información han sido generados por un sistema de inteligencia artificial entrenado con estudios de brókers, condiciones operativas y perfiles de gestores. La metodología integra datos históricos y criterios técnicos para estimar oportunidades de optimización y soporte comercial con enfoque profesional.
										</div>

									</div>

										<!-- TAB: SEGUIMIENTO -->
									<div class="tab-pane fade" id="tab-seguimiento" role="tabpanel">
										<div id="seg-header">
											<div class="card mb-3">
												<div class="card-body d-flex align-items-center justify-content-between gap-3 flex-wrap">
													<div>
														<div class="d-flex align-items-center gap-2 mb-2">
															<span class="badge bg-primary">MenteInversora</span>
															<span class="badge bg-light text-dark">Control de Seguimiendo</span>
														</div>
														<h4 class="mb-2 fw-semibold text-dark"><i data-feather="file-text" class="me-2"></i>Historial de Seguimiento de Lead</h4>
													</div>
												</div>
											</div>
										</div>
										
										<div class="card mb-3">
											<div class="card-body">
												<label class="form-label" for="seguimiento-comentario">Comentario</label>
												<textarea class="form-control" id="seguimiento-comentario" rows="4" placeholder="Escribe un comentario..."></textarea>
												<div class="d-grid mt-2">
													<button type="button" class="btn btn-primary" id="seguimiento-enviar">Enviar</button>
												</div>
												<div class="alert alert-success mt-2 d-none" id="seguimiento-alert" role="alert">Comentario enviado.</div>
											</div>
										</div>
										<h6 class="text-uppercase text-muted small mb-3">Historial de seguimiento</h6>

										<div id="seguimiento-list"></div>
										<div id="seguimiento-empty" class="text-muted small d-none">Aun no hay comentarios.</div>
									</div>
								</div>
							</div>

						</div>
					</div>
				</div>
			</main>

			<?php include '../../includes/footer.php'; ?>
		</div>
	</div>

	<?php include '../../includes/scripts.php'; ?>
	<script src="<?php echo $baseUrl; ?>/js/lead-detalle.js"></script>

	<!-- MODAL EVALUACION PROFESIONAL -->
	<div class="modal fade" id="evaluacion-profesional-modal" tabindex="-1" aria-labelledby="evaluacion-profesional-modal-label" aria-hidden="true">
		<div class="modal-dialog modal-xl">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="evaluacion-profesional-modal-label">Evaluación Profesional</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
				</div>
				<div class="modal-body">
					<div class="card mb-0">
						<div class="card-body d-flex align-items-center justify-content-between gap-3 flex-wrap">
							<div>
								<div class="d-flex align-items-center gap-2 mb-2">
									<span class="badge bg-primary">MenteInversora</span>
									<span class="badge bg-light text-dark">Auditoría Técnica</span>
								</div>
								<h4 class="mb-2 fw-semibold text-dark"><i data-feather="file-text" class="me-2"></i>Auditoría Técnica de Condiciones Operativas</h4>
								<p class="text-muted mb-0">Diagnóstico técnico y estimación de fugas de capital por estructura operativa:<br> rebates, spreads y condiciones negociables según perfil del gestor..</p>
							</div>
							<span class="badge bg-primary">Informe Confidencial - Uso Profesional</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- MODAL EVALUACION RAPIDA -->
	<div class="modal fade" id="evaluacion-rapida-modal" tabindex="-1" aria-labelledby="evaluacion-rapida-modal-label" aria-hidden="true">
		<div class="modal-dialog modal-xl">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="evaluacion-rapida-modal-label">Evaluación Rápida</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
				</div>
				<div class="modal-body">
					<div class="card mb-0">
						<div class="card-body d-flex align-items-center justify-content-between gap-3 flex-wrap">
							<div>
								<div class="d-flex align-items-center gap-2 mb-2">
									<span class="badge bg-primary">MenteInversora</span>
									<span class="badge bg-light text-dark">Dossier de Marca</span>
								</div>
								<h4 class="mb-2 fw-semibold text-dark"><i data-feather="file-text" class="me-2"></i>Dossier de Marca Personal</h4>
								<p class="text-muted mb-0">Documento profesional para presentación ante inversores, brókers y aliados estratégicos..</p>
							</div>
							<span class="badge bg-primary">Documento certificado - Uso profesional</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- MODAL PROGRESO PROSPECTO -->
	<div class="modal fade" id="prospecto-modal" tabindex="-1" aria-labelledby="prospecto-modal-label" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="prospecto-modal-label">Prospección</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
				</div>
				<div class="modal-body">
					<div class="mb-3">
						<label class="form-label" for="prospecto-range">Progreso</label>
						<div class="d-flex align-items-center gap-3">
							<input type="range" class="form-range" id="prospecto-range" min="0" max="100" step="1">
							<span class="badge bg-primary" id="prospecto-range-value">0%</span>
						</div>
					</div>
					<div class="d-grid">
						<button type="button" class="btn btn-primary" id="prospecto-save">Actualizar Progreso</button>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- MODAL ACTUALIZAR ESTADO -->
	<div class="modal fade" id="estado-modal" tabindex="-1" aria-labelledby="estado-modal-label" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="estado-modal-label">Actualizar Estado</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
				</div>
				<div class="modal-body">
					<div class="mb-3">
						<label class="form-label" for="estado-select">Estado</label>
						<select class="form-select" id="estado-select">
							<option value="Recien llegado">Recien llegado</option>
							<option value="Trabajando">Trabajando</option>
							<option value="Vendido">Vendido</option>
							<option value="Anulado">Anulado</option>
						</select>
						<div class="text-danger small mt-2 d-none" id="estado-alert">Cambie el estado para actualizar</div>
					</div>
					<div class="d-grid">
						<button type="button" class="btn btn-primary" id="estado-save">Actualizar Estado</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>

</html>
