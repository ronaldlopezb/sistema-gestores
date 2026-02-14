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
		.perfil-alert {
			padding: 0.75rem 1rem;
			border-radius: 0.5rem;
			border: 1px solid transparent;
		}

		.perfil-alert.alert-success {
			background: #d2f1e8;
			border-color: #a4e4d1;
			color: #0b4b38;
		}

		.perfil-alert.alert-danger {
			background: #f8d7da;
			border-color: #f1aeb5;
			color: #58151c;
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
					<div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
						<h1 class="h3 mb-0">Perfil</h1>
						<span class="badge bg-light text-primary">Configuracion de usuario</span>
					</div>

					<div class="row g-4">
						<div class="col-12 col-xl-8">
							<div class="card shadow-sm">
								<div class="card-header">
									<h5 class="card-title mb-0">Datos generales</h5>
								</div>
								<div class="card-body">
									<div class="row g-3">
										<div class="col-12 col-md-6">
											<label class="form-label" for="perfil-nombre">Nombre</label>
											<input type="text" class="form-control" id="perfil-nombre" placeholder="Nombre completo" />
										</div>
										<div class="col-12 col-md-6">
											<label class="form-label" for="perfil-correo">Correo</label>
											<input type="email" class="form-control" id="perfil-correo" placeholder="correo@dominio.com" />
										</div>
									</div>
									<div class="d-flex justify-content-end mt-3">
										<button type="button" class="btn btn-primary" id="perfil-guardar-datos">
											<i class="align-middle me-1" data-feather="save"></i>Guardar datos
										</button>
									</div>
									<div class="alert perfil-alert d-none mt-3" id="perfil-alert-datos" role="alert"></div>
								</div>
							</div>

							<div class="card shadow-sm mt-4">
								<div class="card-header">
									<h5 class="card-title mb-0">Preferencias</h5>
								</div>
								<div class="card-body">
									<div class="row g-3">
										<div class="col-12 col-md-6">
											<label class="form-label" for="perfil-cantidad-listados">CantidadListados</label>
											<input type="number" class="form-control" id="perfil-cantidad-listados" min="0" step="1" placeholder="0" />
										</div>
										<div class="col-12 col-md-6">
											<label class="form-label" for="perfil-filtro-predeterminado">Periodo predeterminado en dashboard</label>
											<select class="form-select" id="perfil-filtro-predeterminado">
												<option value="hoy">Hoy</option>
												<option value="semana">Esta Semana</option>
												<option value="15-dias">Ultimos 15 días</option>
												<option value="mes">Este Mes</option>
												<option value="3-meses">Ultimos 3 meses</option>
												<option value="6-meses">Ultimos 6 meses</option>
												<option value="1-ano">Ultimo año</option>
												<option value="todo">Todo</option>
											</select>
										</div>
									</div>
									<div class="d-flex justify-content-end mt-3">
										<button type="button" class="btn btn-primary" id="perfil-guardar-preferencias">
											<i class="align-middle me-1" data-feather="sliders"></i>Guardar preferencias
										</button>
									</div>
									<div class="alert perfil-alert d-none mt-3" id="perfil-alert-preferencias" role="alert"></div>
								</div>
							</div>

							<div class="card shadow-sm mt-4">
								<div class="card-header">
									<h5 class="card-title mb-0">Seguridad</h5>
								</div>
								<div class="card-body">
									<div class="row g-3">
										<div class="col-12 col-md-4">
											<label class="form-label" for="perfil-clave-actual">Contraseña actual</label>
											<input type="password" class="form-control" id="perfil-clave-actual" placeholder="********" />
										</div>
										<div class="col-12 col-md-4">
											<label class="form-label" for="perfil-clave-nueva">Nueva contraseña</label>
											<input type="password" class="form-control" id="perfil-clave-nueva" placeholder="********" />
										</div>
										<div class="col-12 col-md-4">
											<label class="form-label" for="perfil-clave-confirmar">Confirmar nueva contraseña</label>
											<input type="password" class="form-control" id="perfil-clave-confirmar" placeholder="********" />
										</div>
									</div>
									<div class="d-flex justify-content-end mt-3">
										<button type="button" class="btn btn-outline-primary" id="perfil-clave-cambiar">
											<i class="align-middle me-1" data-feather="lock"></i>Cambiar contraseña
										</button>
									</div>
									<div class="alert perfil-alert d-none mt-3" id="perfil-alert-seguridad" role="alert"></div>
								</div>
							</div>
						</div>

						<div class="col-12 col-xl-4">
							<div class="card shadow-sm">
								<div class="card-header">
									<h5 class="card-title mb-0">Foto</h5>
								</div>
								<div class="card-body">
									<div class="d-flex align-items-center gap-3">
										<img id="perfil-foto-preview" src="<?php echo $baseUrl; ?>/assets/img/avatars/avatar.jpg" class="rounded-circle border" alt="Foto de perfil" width="96" height="96" />
										<div class="flex-grow-1">
											<label class="form-label" for="perfil-foto">Subir foto</label>
											<input class="form-control" type="file" id="perfil-foto" accept="image/*" />
											<div class="form-text">Formatos sugeridos: JPG o PNG.</div>
										</div>
									</div>
									<div class="d-flex justify-content-end mt-3">
										<button type="button" class="btn btn-primary" id="perfil-guardar-foto">
											<i class="align-middle me-1" data-feather="image"></i>Guardar foto
										</button>
									</div>
									<div class="alert perfil-alert d-none mt-3" id="perfil-alert-foto" role="alert"></div>
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
	<script src="<?php echo $baseUrl; ?>/js/user-perfil.js"></script>
</body>

</html>
