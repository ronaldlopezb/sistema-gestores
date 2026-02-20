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
</head>

<body>
	<div class="wrapper">
		<?php include '../../includes/sidebar.php'; ?>

		<div class="main">
			<?php include '../../includes/topbar.php'; ?>

			<main class="content">
				<div class="container-fluid p-0">
					<h1 class="h3 mb-3">Administrar Funnels</h1>
					<div class="d-flex justify-content-end mb-3">
						<a class="btn btn-primary" href="<?php echo $baseUrl; ?>/pages/funnels/crear-funnel.php">
							<i class="align-middle me-1" data-feather="plus-circle"></i>Crear Nuevo Funnel
						</a>
					</div>
					<div class="row">
						<div class="col-12">
							<div class="card flex-fill" id="funnels-table">
								<div class="card-header">
									<h5 class="card-title mb-0">Funnels creados</h5>
								</div>
								<table class="table table-hover my-0">
									<thead>
										<tr>
											<th>Fecha de creación</th>
											<th>Nombre</th>
											<th>Descripción</th>
											<th>Estado</th>
											<th class="text-end">Acción</th>
										</tr>
									</thead>
									<tbody id="funnels-body"></tbody>
								</table>
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
</body>

</html>
