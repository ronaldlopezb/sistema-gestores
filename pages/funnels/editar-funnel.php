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
		.stage-card {
			border-radius: 16px;
		}
		.stage-card .card-header {
			border-top-left-radius: 16px;
			border-top-right-radius: 16px;
		}
		.stage-card .card-body {
			padding-top: 0.75rem;
			padding-bottom: 0.9rem;
		}
		.funnel-tip {
			background: #e8f2ff;
			border: 1px solid #d7e6ff;
			border-radius: 16px;
		}
		.funnel-tip-icon {
			width: 42px;
			height: 42px;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			border-radius: 12px;
			background: #0d6efd;
			color: #ffffff;
			flex: none;
		}
		.funnel-tip-icon svg {
			width: 22px;
			height: 22px;
		}
		.funnel-spinner {
			width: 16px;
			height: 16px;
			border: 2px solid #fff;
			border-right-color: transparent;
			border-radius: 50%;
			display: inline-block;
			animation: funnel-spin 0.6s linear infinite;
		}
		@keyframes funnel-spin {
			to {
				transform: rotate(360deg);
			}
		}
		.stage-title {
			font-size: 1.05rem;
		}
		.stage-handle {
			width: 36px;
			height: 36px;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			border-radius: 10px;
		}
	</style>
</head>

<body>
	<div class="wrapper">
		<?php include '../../includes/sidebar.php'; ?>

		<div class="main">
			<?php include '../../includes/topbar.php'; ?>

			<main class="content">
				<div class="container-fluid p-0" id="funnel-edit-content">
					<div class="d-flex align-items-center justify-content-between mb-3">
						<h1 class="h3 mb-0">Editar Funnel</h1>
						<a class="btn btn-outline-primary" href="<?php echo $baseUrl; ?>/pages/funnels/administrar-funnels.php">
							<i class="align-middle me-1" data-feather="arrow-left"></i>Volver a Administrar
						</a>
					</div>
					<div class="row">
						<div class="col-12 col-lg-5">
							<div class="card">
								<div class="card-header">
									<h5 class="card-title mb-0">Datos del Funnel</h5>
								</div>
								<div class="card-body">
									<form>
										<div class="mb-3">
											<label class="form-label" for="funnel-nombre">Nombre</label>
											<input type="text" class="form-control" id="funnel-nombre" placeholder="Nombre del funnel">
										</div>
										<div class="mb-3">
											<label class="form-label" for="funnel-descripcion">Descripción</label>
											<textarea class="form-control" id="funnel-descripcion" rows="4" placeholder="Describe el objetivo del funnel"></textarea>
										</div>
										<div class="mb-4">
											<label class="form-label" for="funnel-activo">Activo</label>
											<select class="form-select" id="funnel-activo">
												<option value="true">Activo</option>
												<option value="false">Inactivo</option>
											</select>
										</div>
									</form>
								</div>
							</div>
							<div class="card border-0 shadow-sm mt-3 funnel-tip">
								<div class="card-body">
									<div class="d-flex align-items-start gap-2">
										<span class="funnel-tip-icon"><i data-feather="zap"></i></span>
										<div>
											<div class="fw-semibold mb-1">Tip importante</div>
											<div class="text-muted">Para organizar tu funnel necesitas crear etapas claras. Todos los funnels ya incluyen dos etapas preasignadas: <strong>Ganados</strong> y <strong>Perdidos</strong>. Solo define las etapas intermedias que usarás en tu proceso.</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-12 col-lg-7">
							<div class="card">
								<div class="card-header d-flex justify-content-between align-items-center">
									<h5 class="card-title mb-0">Etapas</h5>
									<button type="button" class="btn btn-sm" style="background:#00c853;color:#ffffff;" id="stage-add">
										<i class="align-middle me-1" data-feather="plus-circle"></i>Nueva Etapa
									</button>
								</div>
								<div class="card-body">
									<div class="text-muted mb-3" id="stages-empty">Agrega etapas para estructurar tu funnel.</div>
									<div id="stages-container" class="d-flex flex-column gap-2"></div>
								</div>
							</div>
						</div>
						<div class="col-12">
							<div class="d-flex justify-content-end">
								<button type="button" class="btn btn-primary btn-lg" id="funnel-submit" disabled>Crear Nuevo Funnel</button>
							</div>
							<div class="text-muted small mt-2 text-end" id="funnel-submit-helper">Completa el nombre del funnel y agrega al menos 2 etapas con nombre.</div>
							<div class="text-danger small mt-1 text-end d-none" id="funnel-submit-error"></div>
						</div>
					</div>
				</div>
				<div class="card d-none" id="funnel-edit-empty">
					<div class="card-body text-center py-5">
						<div class="h5 mb-2">Funnel no encontrado</div>
						<div class="text-muted">No se pudo cargar la información del funnel.</div>
					</div>
				</div>
			</main>

			<?php include '../../includes/footer.php'; ?>
		</div>
	</div>

	<?php include '../../includes/scripts.php'; ?>
	<script src="https://cdn.jsdelivr.net/npm/sortablejs@1.15.6/Sortable.min.js"></script>
	<script src="<?php echo $baseUrl; ?>/js/editar-funnel.js"></script>
</body>

</html>
