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

	<link rel="canonical" href="https://demo-basic.adminkit.io/" />

	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
	<link href="<?php echo $baseUrl; ?>/assets/css/app.css" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
	<style>
		.funnel-stage-list {
			min-height: 120px;
			max-height: 60vh;
			overflow-y: auto;
			scrollbar-width: thin;
			scrollbar-color: var(--stage-scroll, #b6c2d1) #f1f3f6;
		}
		.funnel-stage-list::-webkit-scrollbar {
			width: 8px;
		}
		.funnel-stage-list::-webkit-scrollbar-track {
			background: #f1f3f6;
			border-radius: 10px;
		}
		.funnel-stage-list::-webkit-scrollbar-thumb {
			background-color: var(--stage-scroll, #b6c2d1);
			border-radius: 10px;
			border: 2px solid #f1f3f6;
		}
		.funnel-lead-card {
			cursor: grab;
			border: 2px solid #c9d6e5;
			border-left: 6px solid var(--stage-scroll, #0d6efd);
			background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
			box-shadow: 0 10px 20px rgba(15, 23, 42, 0.16);
			transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease, background 0.15s ease;
		}
		.funnel-lead-card:active {
			cursor: grabbing;
		}
		.funnel-lead-card:hover {
			transform: translateY(-2px);
			box-shadow: 0 16px 28px rgba(15, 23, 42, 0.22);
			border-color: #9fb5d0;
			background: #ffffff;
		}
		.lead-icon {
			width: 14px;
			height: 14px;
			color: var(--stage-scroll, #0d6efd);
		}
		.funnel-ghost {
			background: #f8f9fa;
			border: 2px dashed #b6d4fe;
			border-radius: 0.5rem;
			box-shadow: none;
			min-height: 64px;
			opacity: 0.7;
		}
		.funnel-chosen {
			opacity: 0.6;
		}
		.kanban-spinner {
			width: 16px;
			height: 16px;
			border: 2px solid #fff;
			border-right-color: transparent;
			border-radius: 50%;
			display: inline-block;
			animation: kanban-spin 0.6s linear infinite;
		}
		.kanban-board {
			display: flex;
			flex-wrap: nowrap;
			gap: 1rem;
			overflow-x: auto;
			padding-bottom: 0.5rem;
			scrollbar-width: thin;
			scrollbar-color: #0d6efd #e7f1ff;
		}
		.kanban-wrapper {
			position: relative;
		}
		.kanban-overlay {
			position: absolute;
			inset: 0;
			background: rgba(248, 250, 255, 0.85);
			display: flex;
			align-items: center;
			justify-content: center;
			z-index: 5;
			border-radius: 12px;
			pointer-events: all;
		}
		.kanban-overlay.is-hidden {
			display: none;
		}
		.kanban-overlay-card {
			background: #ffffff;
			border: 1px solid #e3e8ef;
			box-shadow: 0 12px 30px rgba(15, 23, 42, 0.18);
			border-radius: 16px;
			padding: 1rem 1.5rem;
			display: inline-flex;
			align-items: center;
			gap: 0.75rem;
			color: #111111;
			font-weight: 600;
		}
		.kanban-overlay-spinner {
			width: 18px;
			height: 18px;
			border: 2px solid #0d6efd;
			border-right-color: transparent;
			border-radius: 50%;
			display: inline-block;
			animation: kanban-spin 0.6s linear infinite;
		}
		.kanban-board::-webkit-scrollbar {
			height: 10px;
		}
		.kanban-board::-webkit-scrollbar-track {
			background: #e7f1ff;
			border-radius: 10px;
		}
		.kanban-board::-webkit-scrollbar-thumb {
			background-color: #0d6efd;
			border-radius: 10px;
			border: 2px solid #e7f1ff;
		}
		.kanban-column {
			flex: 0 0 320px;
			min-width: 320px;
		}
		.kanban-header.is-empty {
			justify-content: center;
			text-align: center;
		}
		.kanban-header.is-empty .kanban-heading {
			align-items: center;
		}
		.kanban-header.is-empty .kanban-title {
			font-size: 1.35rem;
		}
		.kanban-header.is-empty .kanban-subtitle {
			font-size: 1rem;
		}
		.kanban-title {
			color: #111111;
			font-size: 1.4rem;
		}
		.kanban-title-icon {
			width: 26px;
			height: 26px;
		}
		.kanban-badge {
			font-size: 0.8rem;
			padding: 0.5rem 0.75rem;
		}
		.kanban-header-row {
			display: flex;
			gap: 1rem;
			flex-wrap: wrap;
			align-items: center;
		}
		.kanban-header-row > .kanban-header-col {
			display: block;
		}
		.kanban-header-row > .kanban-header-col.is-wide {
			flex: 1 1 auto;
			min-width: 0;
		}
		.kanban-header-row > .kanban-header-col.is-wide > .card {
			flex: 1 1 auto;
			width: 100%;
		}
		.kanban-header-row > .kanban-header-col.is-compact {
			flex: 0 0 320px;
			min-width: 320px;
		}
		.kanban-header-row > .kanban-header-col.is-compact > .card {
			width: 100%;
		}
		@media (min-width: 992px) {
			.kanban-header-row {
				flex-wrap: nowrap;
			}
		}
		@media (max-width: 991px) {
			.kanban-header-row > .kanban-header-col {
				flex: 1 1 100%;
				min-width: 0;
			}
		}
		.kanban-summary-card {
			border: 0;
			border-radius: 16px;
			box-shadow: 0 12px 24px rgba(15, 23, 42, 0.15);
			color: #fff;
			position: relative;
		}
		.kanban-summary-card .card-body {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			gap: 0.4rem;
			padding: 0.6rem 0.9rem;
			position: relative;
		}
		.kanban-summary-content {
			position: relative;
			z-index: 2;
		}
		.kanban-drop-zone {
			position: absolute;
			inset: 0;
			z-index: 1;
		}
		.kanban-header-row > .kanban-header-col.is-wide > .card > .card-body {
			padding: 0.75rem 1rem;
		}
		.kanban-summary-card.is-win {
			background: #00c853;
		}
		.kanban-summary-card.is-loss {
			background: #e04b4b;
		}
		.kanban-summary-title {
			font-size: 0.95rem;
			font-weight: 600;
			text-transform: uppercase;
			letter-spacing: 0.6px;
			margin: 0;
		}
		.kanban-summary-count {
			font-size: 1.75rem;
			font-weight: 700;
			margin: 0;
		}
		#lead-modal .modal-dialog {
			width: 75vw;
			max-width: 75vw;
		}
		.ecosistema-card {
			border: 1px solid #e4e7ec;
			border-radius: 12px;
			padding: 0.75rem 0.9rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 0.75rem;
			background: #ffffff;
			box-shadow: 0 4px 10px rgba(15, 23, 42, 0.06);
			border-left: 3px solid var(--eco-color, #0d6efd);
		}
		.ecosistema-info {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			gap: 0.2rem;
		}
		.ecosistema-title {
			display: inline-flex;
			align-items: center;
			gap: 0.4rem;
			font-weight: 600;
		}
		.ecosistema-icon {
			width: 18px;
			height: 18px;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			color: var(--eco-color, #0d6efd);
		}
		.ecosistema-meta {
			color: #6c757d;
			font-size: 0.85rem;
		}
		.ecosistema-link {
			color: #0d6efd;
			font-size: 0.85rem;
			text-decoration: none;
		}
		.ecosistema-button {
			border-radius: 999px;
			padding: 0.3rem 0.9rem;
			font-size: 0.8rem;
			border: none;
			color: #fff;
			background: var(--eco-color, #0d6efd);
		}
		@keyframes kanban-spin {
			to {
				transform: rotate(360deg);
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
					<h1 class="h3 mb-3">Funnels</h1>

					<div class="card border-0 shadow-sm mb-4" style="background: #ffffff;">
						<div class="card-body">
							<div class="row g-3 align-items-end">
								<div class="col-12 col-md-6 col-xl-4">
									<span class="badge bg-light text-primary mb-2">Funnels de usuario</span>
									<select class="form-select" id="filtro-periodo"></select>
								</div>
								<div class="col-12 col-md-4 col-xl-3 d-grid d-md-flex">
									<button type="button" class="btn btn-primary w-100 px-4" id="filtro-aplicar">
										<i class="align-middle me-1" data-feather="filter"></i>Cargar Funnel
									</button>
								</div>
								<div class="col-12 col-xl-3 d-grid d-md-flex ms-auto justify-content-end">
									<a class="btn w-100 px-4" style="background:#00c853;color:#ffffff;" href="<?php echo $baseUrl; ?>/pages/funnels/administrar-funnels.php">
										Administrar Funnels
									</a>
								</div>
							</div>
					</div>
				</div>

				<div class="alert alert-danger d-none" id="kanban-alert"></div>

				<div class="kanban-header-row mb-3 d-none" id="kanban-header-card">
					<div class="kanban-header-col is-wide">
						<div class="card border-0 shadow-sm h-100" id="kanban-header-main-card">
							<div class="card-body">
								<div class="d-flex align-items-center justify-content-between flex-wrap gap-2 kanban-header is-empty" id="kanban-header">
									<div class="d-flex flex-column kanban-heading" id="kanban-heading">
									<h5 class="card-title mb-0 kanban-title" id="kanban-title"><i class="me-2 text-primary kanban-title-icon" data-feather="filter"></i><span id="kanban-title-text"></span></h5>
									<div class="text-muted kanban-subtitle" id="kanban-subtitle"></div>
									<div class="d-flex align-items-center flex-wrap gap-2 mt-1">
										<span class="badge bg-primary d-none kanban-badge" id="kanban-count">0 etapas</span>
										<span class="badge bg-success d-none kanban-badge" id="kanban-leads-count">Leads en el Funnel: 0</span>
									</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="kanban-header-col is-compact">
						<div class="card kanban-summary-card is-win h-100" id="kanban-wins-card">
							<div class="card-body">
								<div class="kanban-summary-content">
									<div class="kanban-summary-title">Ganados</div>
									<div class="kanban-summary-count" id="kanban-wins-count">0</div>
								</div>
								<div class="kanban-drop-zone" id="kanban-wins-drop" aria-hidden="true"></div>
							</div>
						</div>
					</div>
					<div class="kanban-header-col is-compact">
						<div class="card kanban-summary-card is-loss h-100" id="kanban-losses-card">
							<div class="card-body">
								<div class="kanban-summary-content">
									<div class="kanban-summary-title">Perdidos</div>
									<div class="kanban-summary-count" id="kanban-losses-count">0</div>
								</div>
								<div class="kanban-drop-zone" id="kanban-losses-drop" aria-hidden="true"></div>
							</div>
						</div>
					</div>
				</div>
				<div class="kanban-wrapper mt-3">
					<div class="kanban-overlay is-hidden" id="kanban-overlay" aria-hidden="true">
						<div class="kanban-overlay-card">
							<span class="kanban-overlay-spinner" role="status" aria-hidden="true"></span>
							<span>Cargando funnel...</span>
						</div>
					</div>
					<div class="kanban-board" id="kanban-board"></div>
				</div>
				</div>
			</main>

			<div class="modal fade" id="lead-modal" tabindex="-1" aria-labelledby="lead-modal-label" aria-hidden="true">
				<div class="modal-dialog modal-dialog-scrollable modal-xl">
					<div class="modal-content">
					<div class="modal-header">
						<div class="d-flex align-items-center gap-2">
							<h4 class="modal-title mb-0" id="lead-modal-label">Jose Ronald Lopez Bahamonde</h4>
							<span class="badge bg-secondary">Bajo Potencial</span>
						</div>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
					</div>
						<div class="modal-body">
							<div class="row">
									<div class="col-md-4 col-xl-3">
										<div class="card mb-3">
											<div class="card-header">
												<h5 class="card-title mb-0">Perfil de Gestor</h5>
											</div>
											<div class="card-body text-center">
												<img src="<?php echo $baseUrl; ?>/assets/img/avatars/avatar-4.jpg" alt="Avatar" class="img-fluid rounded-circle mb-2" width="128" height="128" />
												<h5 class="card-title mb-0">Jose Ronald Lopez Bahamonde</h5>
												<span class="btn btn-primary rounded-pill btn-sm mt-1">Mejorar mis comisiones</span>
											</div>
											<hr class="my-0" />
											<div class="card-body">
												<h5 class="h6 card-title">Informacion de la Lead</h5>
												<ul class="list-unstyled mb-0">
													<li class="mb-1"><span data-feather="user" class="feather-sm me-1"></span><span class="text-muted">Nombre:</span> Jose Ronald Lopez Bahamonde</li>
													<li class="mb-1"><span data-feather="mail" class="feather-sm me-1"></span><span class="text-muted">Correo:</span> ronaldlopez@ronaldlopezb.com</li>
													<li class="mb-1"><span data-feather="globe" class="feather-sm me-1"></span><span class="text-muted">Pais:</span> Peru</li>
													<li class="mb-1"><span data-feather="phone" class="feather-sm me-1"></span><span class="text-muted">WhatsApp:</span> <a href="https://wa.me/51991435745?text=Hola%20Jose%20Ronald" target="_blank" rel="noopener noreferrer">+51991435745</a></li>
													<li class="mb-1"><span data-feather="linkedin" class="feather-sm me-1"></span><span class="text-muted">LinkedIn:</span> <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">ronaldlopezb</a></li>
												</ul>
											</div>
											<hr class="my-0" />
											<div class="card-body">
												<h5 class="h6 card-title">Trader/Gestor</h5>
												<ul class="list-unstyled mb-0">
													<li class="mb-1"><span data-feather="briefcase" class="feather-sm me-1"></span><span class="text-muted">Broker:</span> eToro</li>
													<li class="mb-1"><span data-feather="activity" class="feather-sm me-1"></span><span class="text-muted">Actividad:</span> Copy Trading o Senales</li>
													<li class="mb-1"><span data-feather="layers" class="feather-sm me-1"></span><span class="text-muted">Programa:</span> CopyTrade - Replicacion</li>
													<li class="mb-1"><span data-feather="users" class="feather-sm me-1"></span><span class="text-muted">Alcance Clientes:</span> 1-5 clientes</li>
												</ul>
											</div>
											<hr class="my-0" />
											<div class="card-body">
												<h5 class="h6 card-title">Experiencia</h5>
												<ul class="list-unstyled mb-0">
													<li class="mb-1"><span data-feather="clock" class="feather-sm me-1"></span><span class="text-muted">Tiempo Trader:</span> 1 - 3 anos</li>
													<li class="mb-1"><span data-feather="clock" class="feather-sm me-1"></span><span class="text-muted">Tiempo Gestor:</span> Menos de 1 ano</li>
												</ul>
											</div>
											<hr class="my-0" />
											<div class="card-body">
												<h5 class="h6 card-title">Colaboraciones</h5>
												<ul class="list-unstyled mb-0">
														<li class="mb-1"><span data-feather="users" class="feather-sm me-1"></span><span class="text-muted">Predispuesto a colaborar en eventos:</span> <span class="badge bg-primary">Si</span></li>
												</ul>
											</div>
											<hr class="my-0" />
													<div class="card-body">
														<h5 class="h6 card-title">Ecosistema Digital</h5>
														<div class="d-flex flex-column gap-2">
															<div class="ecosistema-card" style="--eco-color:#e91e63;">
																<div class="ecosistema-info">
																<div class="ecosistema-title">
																	<span class="ecosistema-icon" aria-hidden="true">
																		<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm0 2a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7Zm10 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2ZM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 2.2a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6Z"/></svg>
																	</span>
																	Instagram
																</div>
																<div class="ecosistema-meta">1,000 seguidores</div>
																<a class="ecosistema-link" href="#">ronaldlopezb1</a>
															</div>
															<button class="ecosistema-button">Visitar Perfil</button>
														</div>
															<div class="ecosistema-card" style="--eco-color:#e53935;">
																<div class="ecosistema-info">
																<div class="ecosistema-title">
																	<span class="ecosistema-icon" aria-hidden="true">
																		<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.5 12 4.5 12 4.5s-7 0-8.9.6A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.6 8.9.6 8.9.6s7 0 8.9-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 23.5 12 31 31 0 0 0 23 7.2ZM9.7 15.3V8.7l6 3.3-6 3.3Z"/></svg>
																	</span>
																	YouTube
																</div>
																<div class="ecosistema-meta">2,000 seguidores</div>
																<a class="ecosistema-link" href="#">ronaldlopezb2</a>
															</div>
															<button class="ecosistema-button">Visitar Perfil</button>
														</div>
															<div class="ecosistema-card" style="--eco-color:#1e88e5;">
																<div class="ecosistema-info">
																<div class="ecosistema-title">
																	<span class="ecosistema-icon" aria-hidden="true">
																		<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="m22 4-8.7 8.7 3.4 7.1-3.2-2.3-3.5 2.6 1.3-6.6L2 9.7l20-5.7Z"/></svg>
																	</span>
																	Telegram
																</div>
																<div class="ecosistema-meta">3,000 seguidores</div>
																<a class="ecosistema-link" href="#">ronaldlopezb3</a>
															</div>
															<button class="ecosistema-button">Visitar Perfil</button>
														</div>
															<div class="ecosistema-card" style="--eco-color:#111111;">
																<div class="ecosistema-info">
																<div class="ecosistema-title">
																	<span class="ecosistema-icon" aria-hidden="true">
																		<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M14 9.5A2.5 2.5 0 1 1 11.5 7 2.5 2.5 0 0 1 14 9.5Zm6.2 4.1a6.7 6.7 0 0 1-6.2 6.9 6.8 6.8 0 0 1-6.8-6.8A6.8 6.8 0 0 1 14 6.9a6.7 6.7 0 0 1 6.2 6.7Zm-4.7 0a1.5 1.5 0 1 0-1.5 1.5 1.5 1.5 0 0 0 1.5-1.5ZM6.5 6.3A1.3 1.3 0 1 0 7.8 7.6 1.3 1.3 0 0 0 6.5 6.3Z"/></svg>
																	</span>
																	TikTok
																</div>
																<div class="ecosistema-meta">4,000 seguidores</div>
																<a class="ecosistema-link" href="#">ronaldlopezb4</a>
															</div>
															<button class="ecosistema-button">Visitar Perfil</button>
														</div>
															<div class="ecosistema-card" style="--eco-color:#5e35b1;">
																<div class="ecosistema-info">
																<div class="ecosistema-title">
																	<span class="ecosistema-icon" aria-hidden="true">
																		<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20 4.5A3.5 3.5 0 0 0 16.5 1H7.5A3.5 3.5 0 0 0 4 4.5v15.4c0 .9 1 1.4 1.7.9l2.6-1.9 2.1 1.5c.4.3.9.3 1.3 0l2.1-1.5 2.6 1.9c.7.5 1.7 0 1.7-.9V4.5ZM7.7 9.3h8.6c.4 0 .7.3.7.7s-.3.7-.7.7H7.7a.7.7 0 1 1 0-1.4Zm0 3.4h6.3c.4 0 .7.3.7.7s-.3.7-.7.7H7.7a.7.7 0 1 1 0-1.4Z"/></svg>
																	</span>
																	Discord
																</div>
																<div class="ecosistema-meta">5,000 seguidores</div>
																<a class="ecosistema-link" href="#">ronaldlopezb5</a>
															</div>
															<button class="ecosistema-button">Visitar Perfil</button>
														</div>
															<div class="ecosistema-card" style="--eco-color:#0d6efd;">
																<div class="ecosistema-info">
																<div class="ecosistema-title">
																	<span class="ecosistema-icon" aria-hidden="true">
																		<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm6.9 9h-3.1a15.7 15.7 0 0 0-1.2-6 8 8 0 0 1 4.3 6ZM12 4.1a13.7 13.7 0 0 1 1.6 6.9H10.4A13.7 13.7 0 0 1 12 4.1ZM4.8 13h3.1a15.7 15.7 0 0 0 1.2 6 8 8 0 0 1-4.3-6Zm3.1-2H4.8a8 8 0 0 1 4.3-6 15.7 15.7 0 0 0-1.2 6Zm2.5 2h3.2a13.7 13.7 0 0 1-1.6 6.9A13.7 13.7 0 0 1 10.4 13Zm5.3 0h3.1a8 8 0 0 1-4.3 6 15.7 15.7 0 0 0 1.2-6Z"/></svg>
																	</span>
																	Web
																</div>
																<div class="ecosistema-meta">Sitio Oficial</div>
																<a class="ecosistema-link" href="https://ronaldlopezb.com" target="_blank" rel="noopener noreferrer">https://ronaldlopezb.com</a>
															</div>
															<button class="ecosistema-button">Visitar Sitio</button>
														</div>
														</div>
													</div>
										</div>

										<div class="card mb-3">
													<div class="card-body">
														<h5 class="h6 card-title">Informacion de Registro</h5>
														<span class="badge bg-primary me-1 my-1">IDIC: 21</span>
														<span class="badge bg-primary me-1 my-1">Registro: MN-2026-3086</span>
														<span class="badge bg-primary me-1 my-1">Registrado el 17/02/2026 a las 8:25 AM</span>
													</div>
										</div>
									</div>

									<div class="col-md-8 col-xl-9">
									<div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
										<div class="d-flex flex-wrap gap-2" role="tablist">
											<button class="btn btn-outline-primary rounded-pill active" data-bs-toggle="tab" data-bs-target="#lead-modal-tab-ic" type="button" role="tab">Inteligencia Comercial</button>
											<button class="btn btn-outline-primary rounded-pill" data-bs-toggle="tab" data-bs-target="#lead-modal-tab-seguimiento" type="button" role="tab">Seguimiento</button>
										</div>
											<div class="d-inline-flex gap-2" role="group"></div>
									</div>

										<div class="tab-content">
											<div class="tab-pane fade show active" id="lead-modal-tab-ic" role="tabpanel">
												<div id="ic-header">
													<div class="row g-3 mb-3">
														<div class="col-12">
															<div class="card h-100">
																<div class="card-body d-flex align-items-center justify-content-between gap-3 flex-wrap">
																	<div>
																		<h4 class="mb-2 fw-semibold text-dark"><i data-feather="file-text" class="me-2"></i>Dossier de Inteligencia Comercial</h4>
																		<p class="text-muted mb-0">Documento interno para estrategia de ventas y priorizacion de leads.</p>
																	</div>
																	<span class="badge bg-primary">MenteInversora</span>
															</div>
														</div>
													</div>
													</div>
											</div>

											<div id="ic-score-comercial-interno" class="fs-6">
												<div class="card mb-3">
													<div class="card-body pb-3">
														<h6 class="text-uppercase fw-semibold text-dark mb-3"><i data-feather="clipboard" class="me-2"></i>Ficha Rapida del Lead · Score Comercial Interno</h6>
														<div class="d-flex align-items-center gap-3 mb-3 flex-wrap">
															<div class="d-flex align-items-center gap-3 flex-grow-1">
																<div class="d-flex align-items-center justify-content-center rounded-circle" style="width:96px;height:96px;background:#f5f7fb;">
																	<span class="h2 fw-semibold mb-0">65</span>
																</div>
																<div>
																	<div class="fw-semibold">Score: 65 / 100</div>
																	<p class="text-muted mb-0">Lead con buen nivel de madurez comercial, con indicadores solidos en experiencia, volumen y rentabilidad.</p>
																</div>
															</div>
															<span class="badge bg-primary">Seguimiento activo</span>
														</div>

													<div class="row g-3">
														<div class="col-md-6">
															<div class="card mb-0">
																<div class="card-body">
																<div class="text-muted">Clasificacion</div>
																<div class="fw-semibold"><span class="me-1">⭐</span><span class="badge bg-success">Buen Prospecto</span></div>
																</div>
															</div>
														</div>

														<div class="col-md-6">
															<div class="card mb-0">
																<div class="card-body">
																<div class="text-muted">Potencial de ingresos</div>
																<div class="fw-semibold"><span class="badge bg-primary">Medio - Alto</span></div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>

											<div class="row g-3">
												<div class="col-md-6">
													<div class="card mb-3">
														<div class="card-body">
															<h6 class="card-title fw-semibold text-dark"><i data-feather="user" class="me-2"></i>Perfil Comercial</h6>
															<ul class="mb-0">
																<li>Perfil conservador con foco en rentabilidad estable.</li>
																<li>Interes alto en alianzas institucionales.</li>
																<li>Busca mejorar conversion con soporte de marca.</li>
															</ul>
														</div>
													</div>
												</div>
												<div class="col-md-6">
													<div class="card mb-3">
														<div class="card-body">
															<h6 class="card-title fw-semibold text-dark"><i data-feather="compass" class="me-2"></i>Trayectoria Profesional</h6>
															<ul class="mb-0">
																<li>5+ anos de experiencia como trader.</li>
																<li>Gestiona portafolios de inversion de mediano riesgo.</li>
																<li>Historial consistente en resultados trimestrales.</li>
															</ul>
														</div>
													</div>
												</div>
											</div>

											<div class="card mb-3 bg-danger text-white">
												<div class="card-body">
													<h6 class="card-title fw-semibold text-white"><i data-feather="alert-triangle" class="me-2"></i>Dolor / Necesidad Detectada</h6>
													<ul class="mb-0 text-white">
														<li>Limitado acceso a condiciones institucionales.</li>
														<li>Dependencia de spreads altos y rebates bajos.</li>
														<li>Baja escala en captacion de capital nuevo.</li>
													</ul>
												</div>
											</div>

														<div class="card mb-3 bg-white border border-success border-2">
															<div class="card-body">
																<h6 class="card-title fw-semibold text-dark"><i data-feather="message-circle" class="me-2"></i>Argumento de Venta Recomendado</h6>
																<div class="p-3 rounded-3 text-dark" style="background:#eaf6ef;">
																	Actualmente, su modelo de operacion presenta un nivel de madurez bajo potencial, con una base solida para evolucionar hacia un esquema mas rentable y escalable. Se identifican oportunidades claras de mejora, principalmente en bajo volumen operativo mensual, limitando su capacidad de generacion de ingresos. A traves del ecosistema institucional de DuoMarkets, es posible optimizar sus condiciones operativas, fortalecer su posicionamiento comercial y ampliar su capacidad de captacion de capital. Este enfoque integral le permitira acelerar su crecimiento, consolidar su cartera de inversionistas y posicionarse como un gestor institucional de referencia.
																</div>
															</div>
														</div>

											<div class="card mb-3">
												<div class="card-body">
													<h6 class="card-title fw-semibold text-dark"><i data-feather="package" class="me-2"></i>Producto / Servicio Sugerido</h6>
													<ul class="mb-0">
														<li>Cuenta institucional multi-broker.</li>
														<li>Programa de rebates premium.</li>
														<li>Herramientas de reporte para clientes.</li>
													</ul>
												</div>
											</div>

											<div class="card mb-3">
												<div class="card-body">
													<h6 class="card-title fw-semibold text-dark"><i data-feather="bar-chart-2" class="me-2"></i>Alcance y Metricas de Negocio</h6>
													<div class="row g-3">
														<div class="col-md-6">
															<div class="card mb-0">
																<div class="card-body">
																	<div class="text-muted"><i data-feather="users" class="me-2"></i>Clientes activos</div>
																	<div class="fw-semibold">21-50 clientes</div>
																</div>
															</div>
														</div>

														<div class="col-md-6">
															<div class="card mb-0">
																<div class="card-body">
																	<div class="text-muted"><i data-feather="bar-chart-2" class="me-2"></i>Volumen mensual</div>
																	<div class="fw-semibold">50-200 lotes</div>
																</div>
															</div>
														</div>

														<div class="col-md-6">
															<div class="card mb-0">
																<div class="card-body">
																	<div class="text-muted"><i data-feather="percent" class="me-2"></i>Rentabilidad anual</div>
																	<div class="fw-semibold">10% - 20%</div>
																</div>
															</div>
														</div>

														<div class="col-md-6">
															<div class="card mb-0">
																<div class="card-body">
																	<div class="text-muted"><i data-feather="dollar-sign" class="me-2"></i>Capital promedio por inversor</div>
																	<div class="fw-semibold">$2 000-$10 000 dolares</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>

											<div class="card mb-3">
												<div class="card-body">
													<h6 class="card-title fw-semibold text-dark"><i data-feather="check-circle" class="me-2"></i>Proximos Pasos Sugeridos</h6>
													<ul class="mb-0">
														<li>Coordinar llamada con gestor para propuesta.</li>
														<li>Enviar dossier institucional actualizado.</li>
														<li>Definir condiciones de rebates preferenciales.</li>
													</ul>
												</div>
											</div>

											<div class="p-3 rounded-3 border bg-light mb-3 small">
												Certificado por MenteInversora AI Systems. Este informe y su informacion han sido generados por un sistema de inteligencia artificial entrenado con estudios de brokers, condiciones operativas y perfiles de gestores.
											</div>
										</div>
										</div>
										<div class="tab-pane fade" id="lead-modal-tab-seguimiento" role="tabpanel">
											<div class="card mb-3">
												<div class="card-body">
													<label class="form-label" for="lead-modal-comentario">Comentario</label>
													<textarea class="form-control" id="lead-modal-comentario" rows="4" placeholder="Escribe un comentario..."></textarea>
													<div class="d-grid mt-2">
														<button type="button" class="btn btn-primary">Enviar</button>
													</div>
												</div>
											</div>
											<h6 class="text-uppercase text-muted small mb-3">Historial de seguimiento</h6>
											<div class="card mb-2">
												<div class="card-body">
													<div class="fw-semibold">Llamada inicial completada</div>
													<div class="text-muted small">21 Feb 2026 · Juan Perez</div>
													<div class="mt-2">Se reviso perfil y se coordino nueva reunion.</div>
												</div>
											</div>
											<div class="card">
												<div class="card-body">
													<div class="fw-semibold">Interes en programa institucional</div>
													<div class="text-muted small">18 Feb 2026 · Ana Torres</div>
													<div class="mt-2">Solicito informacion de costos y soporte.</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<?php include '../../includes/footer.php'; ?>
		</div>
	</div>

	<?php include '../../includes/scripts.php'; ?>
	<script src="https://cdn.jsdelivr.net/npm/sortablejs@1.15.6/Sortable.min.js"></script>
	<script src="<?php echo $baseUrl; ?>/js/funnels.js"></script>
</body>

</html>
