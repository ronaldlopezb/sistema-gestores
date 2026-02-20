<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="description" content="Responsive Admin &amp; Dashboard Template based on Bootstrap 5">
	<?php include 'includes/head-meta.php'; ?>

	<link rel="preconnect" href="https://fonts.gstatic.com">
	<link rel="shortcut icon" href="assets/img/icons/icon-48x48.png" />

	<link rel="canonical" href="https://demo-basic.adminkit.io/" />

	<link href="assets/css/app.css" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
	<style>
		.dashboard-spinner {
			display: inline-block;
			width: 12px;
			height: 12px;
			border: 2px solid #fff;
			border-right-color: transparent;
			border-radius: 50%;
			animation: dashboard-spin 0.6s linear infinite;
		}

		@keyframes dashboard-spin {
			to {
				transform: rotate(360deg);
			}
		}
	</style>
</head>

<body>
	<div class="wrapper">
		<?php include 'includes/sidebar.php'; ?>

		<div class="main">
			<?php include 'includes/topbar.php'; ?>

			<main class="content">
				<div class="container-fluid p-0">

					<h1 class="h3 mb-2">Dashboard de Leads</h1>

					<div class="card border-0 shadow-sm mb-4" style="background: linear-gradient(135deg, #f8f9fb 0%, #ffffff 60%);">
						<div class="card-body">
							<div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
								<div class="h5 mb-0">Filtros · Periodo de analisis</div>
								<span class="badge bg-light text-primary">Personaliza el rango</span>
							</div>
							<div class="row g-3 align-items-end">
								<div class="col-12 col-md-4 col-xl-3">
									<label class="form-label" for="filtro-periodo">Periodo rapido</label>
									<select class="form-select" id="filtro-periodo">
										<option value="hoy">Hoy</option>
									<option value="semana">Esta semana</option>
									<option value="15-dias">Últimos 15 días</option>
									<option value="mes">Este mes</option>
									<option value="3-meses">Últimos 3 meses</option>
									<option value="6-meses">Últimos 6 meses</option>
									<option value="1-ano">Año actual</option>
										<option value="todo">Todo</option>
									<option value="personalizado-1-dia">Personalizado: 1 día</option>
									<option value="personalizado-rango">Personalizado: Rango de fechas</option>
									</select>
								</div>
								<div class="col-12 col-md-4 col-xl-3">
									<label class="form-label" for="filtro-desde">Desde</label>
									<input type="date" class="form-control" id="filtro-desde">
								</div>
								<div class="col-12 col-md-4 col-xl-3">
									<label class="form-label" for="filtro-hasta">Hasta</label>
									<input type="date" class="form-control" id="filtro-hasta">
								</div>
									<div class="col-12 col-xl-3 d-grid d-md-flex">
										<button type="button" class="btn btn-primary w-100 px-4" id="filtro-aplicar">
											<i class="align-middle me-1" data-feather="filter"></i>Filtrar
										</button>
									</div>
								</div>
								<div class="mt-3">
									<span class="badge bg-light text-primary" id="dashboard-periodo-titulo">Filtro sin aplicar</span>
								</div>
							</div>
						</div>

					<div class="row">
						<div class="col-xl-6 col-xxl-5 d-flex">
							<div class="w-100">
								<div class="row">
									<div class="col-sm-6">
										<div class="card">
											<div class="card-body">
												<div class="row">
													<div class="col mt-0">
											<h5 class="card-title">Leads nuevos</h5>
													</div>

													<div class="col-auto">
												<div class="stat text-primary">
													<i class="align-middle" data-feather="user-plus"></i>
												</div>
													</div>
												</div>
							<h1 class="mt-1 mb-3" id="kpi-leads-nuevos">0</h1>
							<div class="mb-0">
							<span class="text-success" id="kpi-leads-nuevos-var">0%</span>
							<span class="text-muted">Vs periodo anterior</span>
							</div>
											</div>
										</div>
										<div class="card">
											<div class="card-body">
												<div class="row">
													<div class="col mt-0">
											<h5 class="card-title">Leads en trabajo</h5>
													</div>

													<div class="col-auto">
												<div class="stat text-primary">
													<i class="align-middle" data-feather="briefcase"></i>
												</div>
													</div>
												</div>
							<h1 class="mt-1 mb-3" id="kpi-leads-trabajo">0</h1>
							<div class="mb-0">
							<span class="text-success" id="kpi-leads-trabajo-var">0%</span>
							<span class="text-muted">Vs periodo anterior</span>
							</div>
											</div>
										</div>
									</div>
									<div class="col-sm-6">
										<div class="card">
											<div class="card-body">
												<div class="row">
													<div class="col mt-0">
											<h5 class="card-title">Prospectos activos</h5>
													</div>

													<div class="col-auto">
												<div class="stat text-primary">
													<i class="align-middle" data-feather="user-check"></i>
												</div>
													</div>
												</div>
							<h1 class="mt-1 mb-3" id="kpi-prospectos-activos">0</h1>
							<div class="mb-0">
							<span class="text-success" id="kpi-prospectos-activos-var">0%</span>
							<span class="text-muted">Vs periodo anterior</span>
							</div>
											</div>
										</div>
										<div class="card">
											<div class="card-body">
												<div class="row">
													<div class="col mt-0">
											<h5 class="card-title">Vendidos</h5>
													</div>

													<div class="col-auto">
														<div class="stat text-primary">
															<i class="align-middle" data-feather="shopping-cart"></i>
														</div>
													</div>
												</div>
							<h1 class="mt-1 mb-3" id="kpi-vendidos">0</h1>
							<div class="mb-0">
							<span class="text-success" id="kpi-vendidos-var">0%</span>
							<span class="text-muted">Tasa de conversión</span>
							</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="col-xl-6 col-xxl-7">
							<div class="card flex-fill w-100">
								<div class="card-header">

										<h5 class="card-title mb-0">Tendencia de leads</h5>
								</div>
								<div class="card-body py-3">
									<div class="chart chart-sm">
										<canvas id="chartjs-dashboard-line"></canvas>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="row">
						<div class="col-12 col-md-6 col-xxl-4 d-flex">
							<div class="card flex-fill">
								<div class="card-header">
									<h5 class="card-title mb-0">Ranking por pais</h5>
									<span class="text-muted small">Leads en el periodo</span>
								</div>
								<div class="card-body">
									<table class="table table-sm align-middle mb-0">
										<thead>
											<tr>
												<th>Pais</th>
												<th class="text-end">Leads</th>
												<th class="text-end">% total</th>
											</tr>
										</thead>
									<tbody id="ranking-pais-body">
										<tr>
											<td colspan="3" class="text-center text-muted">Sin datos</td>
										</tr>
									</tbody>
									</table>
								</div>
							</div>
						</div>
						<div class="col-12 col-md-6 col-xxl-4 d-flex">
							<div class="card flex-fill">
								<div class="card-header">
									<h5 class="card-title mb-0">Paises con mayor conversion</h5>
									<span class="text-muted small">Vendidos / Leads</span>
								</div>
								<div class="card-body">
									<table class="table table-sm align-middle mb-0">
										<thead>
											<tr>
												<th>Pais</th>
												<th class="text-end">Conversion</th>
												<th class="text-end">Leads</th>
											</tr>
										</thead>
									<tbody id="conversion-pais-body">
										<tr>
											<td colspan="3" class="text-center text-muted">Sin datos</td>
										</tr>
									</tbody>
									</table>
								</div>
							</div>
						</div>
						<div class="col-12 col-md-12 col-xxl-4 d-flex">
							<div class="card flex-fill">
								<div class="card-header">
									<h5 class="card-title mb-0">Ranking de brokers por leads</h5>
									<span class="text-muted small">Participacion del total</span>
								</div>
								<div class="card-body">
									<table class="table table-sm align-middle mb-0">
										<thead>
											<tr>
												<th>Broker</th>
												<th class="text-end">Leads</th>
												<th class="text-end">% total</th>
											</tr>
										</thead>
									<tbody id="ranking-broker-body">
										<tr>
											<td colspan="3" class="text-center text-muted">Sin datos</td>
										</tr>
									</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>

					<div class="row mt-4">
						<div class="col-12 col-lg-6 col-xxl-6 d-flex">
							<div class="card flex-fill">
								<div class="card-header">
									<h5 class="card-title mb-0">Top prospectos</h5>
								</div>
								<table class="table table-hover my-0">
									<thead>
										<tr>
											<th>Fecha</th>
											<th>Prospecto</th>
											<th style="width: 200px;">% avance</th>
											<th>Broker</th>
											<th>Clasificacion</th>
											<th class="text-end" style="width: 90px;">Accion</th>
										</tr>
									</thead>
								<tbody id="top-prospectos-body">
									<tr>
										<td colspan="6" class="text-center text-muted">Sin datos</td>
									</tr>
								</tbody>
								</table>
							</div>
						</div>
						<div class="col-12 col-lg-3 col-xxl-3 d-flex">
							<div class="card flex-fill">
								<div class="card-header">
									<h5 class="card-title mb-0">Prospectos por clasificacion</h5>
								</div>
								<div class="card-body">
									<div class="chart chart-sm">
										<canvas id="chartjs-prospectos-clasificacion-alt"></canvas>
									</div>
									<table class="table table-sm align-middle mb-0 mt-3">
										<thead>
											<tr>
												<th>Clasificacion</th>
												<th class="text-end">Total</th>
												<th class="text-end">% total</th>
										</tr>
										</thead>
								<tbody id="prospectos-clasificacion-body">
									<tr>
										<td colspan="3" class="text-center text-muted">Sin datos</td>
									</tr>
								</tbody>
									</table>
								</div>
							</div>
						</div>
						<div class="col-12 col-lg-3 col-xxl-3 d-flex">
							<div class="card flex-fill">
								<div class="card-header">
									<h5 class="card-title mb-0">Prospectos por avance</h5>
								</div>
								<div class="card-body">
									<div class="chart chart-sm">
										<canvas id="chartjs-prospectos-avance-alt"></canvas>
									</div>
									<table class="table table-sm align-middle mb-0 mt-3">
										<thead>
											<tr>
												<th>Rango %</th>
												<th class="text-end">Total</th>
												<th class="text-end">% total</th>
										</tr>
										</thead>
								<tbody id="prospectos-avance-body">
									<tr>
										<td colspan="3" class="text-center text-muted">Sin datos</td>
									</tr>
								</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>

				</div>
			</main>

			<?php include 'includes/footer.php'; ?>
		</div>
	</div>

	<?php include 'includes/scripts.php'; ?>
	<script src="js/dashboard.js"></script>

</body>

</html>
