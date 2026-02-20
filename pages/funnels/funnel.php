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
					<h1 class="h3 mb-3">Funnels</h1>

					<div class="card border-0 shadow-sm mb-4" style="background: linear-gradient(135deg, #f8f9fb 0%, #ffffff 60%);">
						<div class="card-body">
							<div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
								<span class="badge bg-light text-primary ms-auto">Funnels de usuario</span>
							</div>
							<div class="row g-3 align-items-end">
								<div class="col-12 col-md-6 col-xl-4">
									<label class="form-label" for="filtro-periodo">Elegir Funnel</label>
									<select class="form-select" id="filtro-periodo">
									</select>
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
				</div>
			</main>

			<?php include '../../includes/footer.php'; ?>
		</div>
	</div>

	<?php include '../../includes/scripts.php'; ?>
	<script src="<?php echo $baseUrl; ?>/js/funnels.js"></script>
</body>

</html>
