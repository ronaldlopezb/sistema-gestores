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
	<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
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

		.modal-backdrop {
			position: fixed;
			inset: 0;
			background: rgba(0, 0, 0, 0.5);
			z-index: 1050;
		}

		.eva-rap-report {
			--duo-blue: #0b2b4c;
			--duo-orange: #ff3e1e;
			--text-main: #1c1e21;
			--card-bg: #ffffff;
			--success: #00c853;
			--warning: #ffab00;
			--danger: #d50000;
			--premium-gradient: linear-gradient(135deg, #00c853 0%, #009624 100%);
			color: var(--text-main);
			font-family: "Poppins", sans-serif;
		}

		.eva-rap-report .main-container {
			max-width: 820px;
			margin: 0 auto;
			padding: 0 1rem 1rem;
		}

		.eva-rap-report .score-card {
			background: var(--card-bg);
			border-radius: 16px;
			padding: 2.5rem 2rem;
			text-align: center;
			box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
			margin-bottom: 2rem;
		}

		.eva-rap-report .score-card h2 {
			font-size: 1.1rem;
			text-transform: uppercase;
			letter-spacing: 1px;
			color: #666;
			margin-bottom: 1.5rem;
			font-weight: 600;
		}

		.eva-rap-report .gauge-wrapper {
			position: relative;
			width: 220px;
			height: 110px;
			margin: 0 auto 1.5rem;
			overflow: hidden;
		}

		.eva-rap-report .gauge-bg {
			position: absolute;
			top: 0;
			left: 0;
			width: 220px;
			height: 220px;
			background: #e0e0e0;
			border-radius: 50%;
		}

		.eva-rap-report .gauge-fill {
			position: absolute;
			top: 0;
			left: 0;
			width: 220px;
			height: 220px;
			background: conic-gradient(
				var(--danger) 0% 20%,
				var(--warning) 20% 35%,
				var(--success) 35% 50%,
				transparent 50% 100%
			);
			border-radius: 50%;
			transform: rotate(-90deg);
			mask: radial-gradient(transparent 60%, black 61%);
			-webkit-mask: radial-gradient(transparent 60%, black 61%);
		}

		.eva-rap-report .gauge-needle {
			position: absolute;
			bottom: 0px;
			left: 50%;
			width: 4px;
			height: 90px;
			background: var(--duo-blue);
			transform-origin: bottom center;
			transform: rotate(-90deg);
			border-radius: 4px;
			transition: transform 1s ease-out;
		}

		.eva-rap-report .gauge-center {
			position: absolute;
			bottom: -10px;
			left: 50%;
			transform: translateX(-50%);
			width: 20px;
			height: 20px;
			background: var(--duo-blue);
			border-radius: 50%;
		}

		.eva-rap-report .score-value {
			font-size: 3.5rem;
			font-weight: 700;
			color: var(--duo-blue);
			line-height: 1;
		}

		.eva-rap-report .score-label {
			font-size: 1.2rem;
			color: var(--duo-orange);
			font-weight: 600;
			margin-top: 0.5rem;
		}

		.eva-rap-report .score-message {
			margin-top: 1rem;
			font-size: 1rem;
			color: #555;
			max-width: 600px;
			margin-left: auto;
			margin-right: auto;
		}

		.eva-rap-report .analysis-section {
			background: var(--card-bg);
			border-radius: 12px;
			padding: 2rem;
			margin-bottom: 1.5rem;
			box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
			border-left: 6px solid;
		}

		.eva-rap-report .border-financial {
			border-left-color: var(--duo-orange);
		}

		.eva-rap-report .border-growth {
			border-left-color: #6200ea;
		}

		.eva-rap-report .border-tech {
			border-left-color: #0b2b4c;
		}

		.eva-rap-report .analysis-section h3 {
			color: var(--duo-blue);
			font-size: 1.3rem;
			margin-bottom: 1rem;
			display: flex;
			align-items: center;
			gap: 0.5rem;
			font-weight: 600;
		}

		.eva-rap-report .comparison-grid {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 1.5rem;
			margin-top: 1.5rem;
		}

		.eva-rap-report .comparison-box {
			padding: 1.5rem;
			border-radius: 12px;
			position: relative;
		}

		.eva-rap-report .box-current {
			background: #f8f9fa;
			border: 1px solid #e9ecef;
			color: #6c757d;
		}

		.eva-rap-report .box-current .box-value {
			color: #495057;
			font-size: 1.6rem;
		}

		.eva-rap-report .box-potential {
			background: var(--premium-gradient);
			color: #fff;
			box-shadow: 0 10px 20px rgba(0, 200, 83, 0.2);
			transform: scale(1.02);
			border: none;
		}

		.eva-rap-report .box-potential .box-title {
			color: rgba(255, 255, 255, 0.9);
			letter-spacing: 0.5px;
		}

		.eva-rap-report .box-potential .box-value {
			color: #fff;
			font-size: 2rem;
			text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		}

		.eva-rap-report .box-potential p {
			color: rgba(255, 255, 255, 0.9);
			font-weight: 500;
			font-size: 0.9rem;
		}

		.eva-rap-report .box-title {
			font-size: 0.85rem;
			text-transform: uppercase;
			font-weight: 700;
			margin-bottom: 0.5rem;
		}

		.eva-rap-report .box-value {
			font-weight: 800;
			margin-bottom: 0.5rem;
			line-height: 1.2;
		}

		.eva-rap-report .loss-alert {
			margin-top: 2rem;
			background: #fff3e0;
			border: 2px solid #ffab00;
			color: #bf360c;
			padding: 1.2rem;
			border-radius: 8px;
			display: flex;
			align-items: center;
			gap: 1rem;
			font-size: 1rem;
			box-shadow: 0 4px 12px rgba(255, 111, 0, 0.08);
			animation: pulseAlert 2s infinite;
		}

		.eva-rap-report .loss-alert strong {
			font-size: 1.2rem;
			color: #d84315;
		}

		@keyframes pulseAlert {
			0% {
				box-shadow: 0 0 0 0 rgba(255, 171, 0, 0.4);
			}
			70% {
				box-shadow: 0 0 0 10px rgba(255, 171, 0, 0);
			}
			100% {
				box-shadow: 0 0 0 0 rgba(255, 171, 0, 0);
			}
		}

		.eva-rap-report .growth-grid {
			display: grid;
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		.eva-rap-report .growth-item {
			display: flex;
			align-items: center;
			padding: 1rem;
			background: #f8f9fa;
			border-radius: 8px;
			border-left: 4px solid #ddd;
		}

		.eva-rap-report .growth-item.premium {
			background: #f3e5f5;
			border-left-color: #9c27b0;
		}

		.eva-rap-report .growth-icon {
			font-size: 1.5rem;
			margin-right: 1rem;
			min-width: 40px;
			text-align: center;
		}

		.eva-rap-report .growth-content h4 {
			font-size: 1rem;
			color: var(--duo-blue);
			margin-bottom: 0.3rem;
			font-weight: 600;
		}

		.eva-rap-report .growth-content p {
			font-size: 0.9rem;
			color: #555;
		}

		.eva-rap-report .vs-badge {
			display: inline-block;
			background: #eee;
			padding: 2px 6px;
			border-radius: 4px;
			font-size: 0.7rem;
			font-weight: bold;
			color: #777;
			margin-right: 0.5rem;
			vertical-align: middle;
		}

		.eva-rap-report .comparison-table {
			width: 100%;
			border-collapse: collapse;
			margin-top: 1rem;
		}

		.eva-rap-report .comparison-table th {
			text-align: left;
			padding: 1rem;
			color: #666;
			font-weight: 600;
			border-bottom: 2px solid #eee;
			font-size: 0.9rem;
		}

		.eva-rap-report .comparison-table td {
			padding: 1rem;
			border-bottom: 1px solid #eee;
			font-size: 0.95rem;
		}

		.eva-rap-report .comparison-table tr:hover {
			background-color: #fafafa;
		}

		.eva-rap-report .status-icon {
			display: inline-block;
			width: 20px;
			text-align: center;
			margin-right: 0.5rem;
		}

		@media (max-width: 600px) {
			.eva-rap-report .comparison-grid {
				grid-template-columns: 1fr;
			}
			.eva-rap-report .score-value {
				font-size: 2.8rem;
			}
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
					<div id="eva-empty" class="card d-none">
						<div class="card-body text-center py-5">
							<div class="h5 mb-2">Evaluacion rapida no encontrada</div>
							<div class="text-muted">No se encontro informacion para este ID.</div>
						</div>
					</div>

					<div id="eva-content">
						<div class="mb-3">
							<h1 class="h3 d-inline align-middle" id="eva-title">Evaluacion rapida</h1>
							<span class="badge ms-2" id="eva-status">Estado</span>
						</div>

						<div class="row">
							<div class="col-md-4 col-xl-3">
								<div class="card mb-3">
									<div class="card-header">
										<h5 class="card-title mb-0">Perfil de Gestor</h5>
									</div>
									<div class="card-body text-center">
										<img src="<?php echo $baseUrl; ?>/assets/img/avatars/avatar-4.jpg" alt="Avatar" class="img-fluid rounded-circle mb-2" width="128" height="128" />
										<h5 class="card-title mb-0" id="eva-name">-</h5>
										<span class="btn btn-primary rounded-pill btn-sm mt-1" id="eva-objetivo">-</span>
									</div>
									<hr class="my-0" />
									<div class="card-body">
										<h5 class="h6 card-title">Informacion de la Lead</h5>
										<ul class="list-unstyled mb-0">
											<li class="mb-1" id="eva-info-name-item"><span data-feather="user" class="feather-sm me-1"></span><span class="text-muted">Nombre:</span> <span id="eva-info-name">-</span></li>
											<li class="mb-1" id="eva-info-email-item"><span data-feather="mail" class="feather-sm me-1"></span><span class="text-muted">Correo:</span> <span id="eva-info-email">-</span></li>
											<li class="mb-1" id="eva-info-country-item"><span data-feather="globe" class="feather-sm me-1"></span><span class="text-muted">Pais:</span> <span id="eva-info-country">-</span></li>
										</ul>
									</div>
									<hr class="my-0" />
									<div class="card-body">
										<h5 class="h6 card-title">Trader/Gestor</h5>
										<ul class="list-unstyled mb-0">
											<li class="mb-1" id="eva-trader-broker-item"><span data-feather="briefcase" class="feather-sm me-1"></span><span class="text-muted">Broker:</span> <span id="eva-trader-broker">-</span></li>
											<li class="mb-1" id="eva-trader-programa-item"><span data-feather="layers" class="feather-sm me-1"></span><span class="text-muted">Programa:</span> <span id="eva-trader-programa">-</span></li>
											<li class="mb-1" id="eva-trader-experiencia-item"><span data-feather="clock" class="feather-sm me-1"></span><span class="text-muted">Años de experiencia:</span> <span id="eva-trader-experiencia">-</span></li>
											<li class="mb-1" id="eva-trader-depositos-item"><span data-feather="dollar-sign" class="feather-sm me-1"></span><span class="text-muted">Depósitos mensuales promedio:</span> <span id="eva-trader-depositos">-</span></li>
											<li class="mb-1" id="eva-trader-rentabilidad-item"><span data-feather="percent" class="feather-sm me-1"></span><span class="text-muted">Rentabilidad promedio anual:</span> <span id="eva-trader-rentabilidad">-</span></li>
										</ul>
									</div>
								</div>

								<div class="card mb-3">
									<div class="card-body">
										<h5 class="h6 card-title">Informacion de Registro</h5>
										<span class="badge bg-primary me-1 my-1" id="eva-registro-ider">IDER: -</span>
										<span class="badge bg-primary me-1 my-1" id="eva-registro-fecha-hora">-</span>
									</div>
								</div>
							</div>

							<div class="col-md-8 col-xl-9">
								<div class="d-flex justify-content-end align-items-center flex-wrap gap-2 mb-3">
									<button type="button" class="btn btn-primary btn-sm rounded-pill" id="lead-estado-update"><i data-feather="refresh-cw" class="me-1"></i>Actualizar Estado</button>
								</div>
								<div class="eva-rap-report">
									<div class="main-container">
										<div class="score-card">
											<h2>
												Diagnóstico Preliminar para
												<span id="clientName" style="color: var(--duo-blue)">Sin datos</span>
											</h2>

											<div class="gauge-wrapper">
												<div class="gauge-bg"></div>
												<div class="gauge-fill"></div>
												<div class="gauge-needle" id="gaugeNeedle" style="transform: rotate(-90deg)"></div>
												<div class="gauge-center"></div>
											</div>

											<div class="score-value" id="scoreValue">0/100</div>
											<div class="score-label" id="scoreLevel">Sin datos</div>

											<p class="score-message" id="scoreMessage">
												Sin datos
											</p>
										</div>

										<div class="analysis-section border-financial">
											<h3>💸 Rentabilidad Directa</h3>
											<p style="font-size: 0.9rem; color: #666; margin-bottom: 1rem">
												Comparativa basada en tu volumen actual.
											</p>

											<div class="comparison-grid">
												<div class="comparison-box box-current">
													<div class="box-title">Tu Esquema Actual</div>
													<div class="box-value" id="currentSchemeName">Sin datos</div>
													<p id="currentSchemeDesc">
														Sin datos
													</p>
												</div>

												<div class="comparison-box box-potential">
													<div class="box-title">Tu Potencial Real</div>
													<div class="box-value" id="potentialSchemeName">Sin datos</div>
													<p id="potentialSchemeDesc">
														Sin datos
													</p>
												</div>
											</div>

											<div class="loss-alert" id="leakAlertBox">
												<span style="font-size: 2rem" id="leakAlertIcon">💸</span>
												<div>
													<strong style="display: block; margin-bottom: 0.2rem; text-transform: uppercase;" id="leakAlertTitle">FUGA DE CAPITAL DETECTADA</strong>
													<span id="leakAlertMessage">Sin datos</span>
												</div>
											</div>
										</div>

										<div class="analysis-section border-growth">
											<h3>🚀 Activos Intangibles &amp; Marca</h3>
											<p style="font-size: 0.9rem; color: #666; margin-bottom: 1rem">
												¿Estás construyendo tu negocio o el de ellos?
											</p>

											<div class="growth-grid">
												<div class="growth-item">
													<div class="growth-icon" id="intangibleCurrentIcon">🏢</div>
													<div class="growth-content">
														<h4>
															<span class="vs-badge">TU SITUACIÓN</span>
														<span id="intangibleCurrentTitle">Sin datos</span>
														</h4>
														<p id="intangibleCurrentDesc">
														Sin datos
														</p>
													</div>
												</div>

												<div class="growth-item premium">
													<div class="growth-icon" id="intangiblePotentialIcon">🚀</div>
													<div class="growth-content">
														<h4>
															<span class="vs-badge" style="background: white; color: #9c27b0">POTENCIAL</span>
														<span id="intangiblePotentialTitle">Sin datos</span>
														</h4>
														<p id="intangiblePotentialDesc">
														Sin datos
														</p>
													</div>
												</div>
											</div>
										</div>

										<div class="analysis-section border-tech">
											<h3>🛠️ Auditoría Tecnológica</h3>
											<table class="comparison-table">
												<thead>
													<tr>
														<th width="40%">Variable Crítica</th>
														<th width="30%">Tu Bróker Actual</th>
														<th width="30%">Estándar Institucional</th>
													</tr>
												</thead>
												<tbody id="auditTableBody">
													<tr>
														<td><strong>Jurisdicción y Seguridad</strong></td>
														<td>Sin datos</td>
														<td><span class="status-icon">🏛️</span> Entorno Institucional Tier 1</td>
													</tr>
													<tr>
														<td><strong>Liquidez y Ejecución</strong></td>
														<td>Sin datos</td>
														<td><span class="status-icon">⚡</span> 100% DMA / Sin Conflicto</td>
													</tr>
													<tr>
														<td><strong>Tecnología de Gestión</strong></td>
														<td>Sin datos</td>
														<td><span class="status-icon">✅</span> Tecnología Multi-Broker Pro</td>
													</tr>
													<tr>
														<td><strong>Control de Audiencia</strong></td>
														<td>Sin datos</td>
														<td><span class="status-icon">🚀</span> Propiedad Legal del Gestor</td>
													</tr>
													<tr>
														<td><strong>Protección Adicional</strong></td>
														<td>Sin datos</td>
														<td><span class="status-icon">🛡️</span> Seguro Privado de Capital - Lloyd's</td>
													</tr>
												</tbody>
											</table>
										</div>
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
	<script src="<?php echo $baseUrl; ?>/js/eva-rapida.js"></script>

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
							<option value="Con Evaluación Profesional">Con Evaluación Profesional</option>
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
