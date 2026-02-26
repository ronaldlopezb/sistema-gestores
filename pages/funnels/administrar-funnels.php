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

	<link href="<?php echo $baseUrl; ?>/assets/css/app.css" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
	<style>
		.modal {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 1055;
			display: none;
			width: 100%;
			height: 100%;
			overflow-x: hidden;
			overflow-y: auto;
			outline: 0;
		}
		.modal.show {
			display: block;
		}
		.modal-dialog {
			position: relative;
			width: auto;
			margin: 1.75rem auto;
			pointer-events: none;
			max-width: 520px;
		}
		.modal-dialog-centered {
			display: flex;
			align-items: center;
			min-height: calc(100% - 3.5rem);
		}
		.modal-content {
			position: relative;
			display: flex;
			flex-direction: column;
			width: 100%;
			pointer-events: auto;
			background-color: #fff;
			background-clip: padding-box;
			border: 1px solid rgba(0, 0, 0, 0.2);
			border-radius: 0.5rem;
			outline: 0;
		}
		.modal-header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 1rem;
			border-bottom: 1px solid #dee2e6;
			border-top-left-radius: 0.5rem;
			border-top-right-radius: 0.5rem;
		}
		.modal-body {
			position: relative;
			flex: 1 1 auto;
			padding: 1rem;
		}
		.modal-footer {
			display: flex;
			flex-wrap: wrap;
			gap: 0.5rem;
			justify-content: flex-end;
			padding: 1rem;
			border-top: 1px solid #dee2e6;
			border-bottom-right-radius: 0.5rem;
			border-bottom-left-radius: 0.5rem;
		}
		.modal-backdrop {
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			background-color: #000;
		}
		.modal-backdrop.show {
			opacity: 0.5;
		}
		.modal.fade .modal-dialog {
			transition: transform 0.3s ease-out;
			transform: translate(0, -50px);
		}
		.modal.show .modal-dialog {
			transform: none;
		}
		.modal-open {
			overflow: hidden;
		}
		.alert {
			position: relative;
			padding: 0.75rem 1rem;
			border: 1px solid transparent;
			border-radius: 0.5rem;
			margin-bottom: 1rem;
		}
		.alert-primary {
			color: #084298;
			background-color: #cfe2ff;
			border-color: #b6d4fe;
		}
		.alert-success {
			color: #0f5132;
			background-color: #d1e7dd;
			border-color: #badbcc;
		}
		.alert-danger {
			color: #842029;
			background-color: #f8d7da;
			border-color: #f5c2c7;
		}
		.delete-spinner {
			width: 14px;
			height: 14px;
			border: 2px solid #fff;
			border-right-color: transparent;
			border-radius: 50%;
			display: inline-block;
			animation: delete-spin 0.6s linear infinite;
		}
		@keyframes delete-spin {
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
					<h1 class="h3 mb-3">Administrar Funnels</h1>
					<div class="alert alert-success d-none d-flex align-items-center gap-2" id="create-success-message">
						<i data-feather="check-circle"></i>
						<span>Funnel creado</span>
					</div>
					<div class="alert alert-primary d-none d-flex align-items-center gap-2" id="update-success-message">
						<i data-feather="check-circle"></i>
						<span>Funnel editado</span>
					</div>
					<div class="alert alert-danger d-none d-flex align-items-center gap-2" id="delete-success-message">
						<i data-feather="trash-2"></i>
						<span>Funnel eliminado</span>
					</div>
					<div class="d-flex justify-content-end gap-2 mb-3">
						<a class="btn btn-outline-primary" href="<?php echo $baseUrl; ?>/pages/funnels/funnel.php">
							<i class="align-middle me-1" data-feather="arrow-left"></i>Volver a Funnels
						</a>
						<a class="btn btn-primary" href="<?php echo $baseUrl; ?>/pages/funnels/crear-funnel.php">
							<i class="align-middle me-1" data-feather="plus-circle"></i>Crear Nuevo Funnel
						</a>
					</div>
					<div class="row">
						<div class="col-12">
					<div id="funnels-card">
						<h5 class="card-title mb-3">Funnels creados</h5>
						<div class="row g-3" id="funnels-grid"></div>
					</div>
							<div class="d-flex justify-content-between align-items-center mt-3" id="funnels-pagination">
								<div class="text-muted small" id="funnels-total">Total de funnels: 0</div>
								<div class="d-flex align-items-center gap-2">
									<span class="text-muted small" id="funnels-range">0-0 de 0</span>
									<div class="btn-group" role="group" aria-label="Paginacion">
										<button type="button" class="btn btn-sm btn-outline-primary" id="funnels-prev" disabled>Anterior</button>
										<button type="button" class="btn btn-sm btn-outline-primary" id="funnels-next" disabled>Siguiente</button>
									</div>
								</div>
							</div>
							<div id="funnels-empty" class="card d-none">
								<div class="card-body text-center py-5">
									<div class="h5 mb-2">No hay funnels</div>
									<div class="text-muted">Aún no hay funnels creados para mostrar.</div>
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
	<script src="<?php echo $baseUrl; ?>/js/administrar-funnels.js"></script>
	<div class="modal fade" id="delete-funnel-modal" tabindex="-1" aria-hidden="true" style="display:none;">
		<div class="modal-dialog modal-md modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Eliminar Funnel</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
				</div>
				<div class="modal-body">
					<div class="d-flex align-items-start justify-content-between gap-3 mb-2">
						<div class="fw-semibold fs-5" id="delete-funnel-title">-</div>
						<div class="text-muted small" id="delete-funnel-id">ID: -</div>
					</div>
					<div class="text-muted fst-italic px-3 py-2 rounded-3 mb-3" id="delete-funnel-description" style="background:#fffaf2;">-</div>
					<div class="row g-2 mb-2">
						<div class="col-12 col-md-4">
							<div class="p-2 rounded-3 bg-light small">
								<div class="text-muted">Etapas</div>
								<div class="fw-semibold" id="delete-funnel-etapas">0</div>
							</div>
						</div>
						<div class="col-12 col-md-4">
							<div class="p-2 rounded-3 bg-light small">
								<div class="text-muted">Leads</div>
								<div class="fw-semibold" id="delete-funnel-leads">0</div>
							</div>
						</div>
						<div class="col-12 col-md-4">
							<div class="p-2 rounded-3 bg-light small">
								<div class="text-muted">Estado</div>
								<div class="fw-semibold" id="delete-funnel-status">-</div>
							</div>
						</div>
					</div>
					<div class="text-muted small mb-3" id="delete-funnel-date">Creado: -</div>
					<div class="p-3 rounded-3" style="background:#fdeaea;border:1px solid #f7c9c9;">
						<div class="fw-semibold text-danger mb-1">Confirmar eliminacion</div>
						<div class="small text-muted mb-2">Escribe <strong>ELIMINAR</strong> para habilitar el boton.</div>
						<input type="text" class="form-control" id="delete-funnel-confirm" placeholder="ELIMINAR">
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancelar</button>
					<button type="button" class="btn btn-danger" id="delete-funnel-action" disabled>Eliminar</button>
				</div>
			</div>
		</div>
	</div>
</body>

</html>
