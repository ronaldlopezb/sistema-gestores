<?php include __DIR__ . "/base.php"; ?>
<?php
include __DIR__ . "/base.php";
$currentPath = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);
$relativePath = $currentPath;
if ($baseUrl !== "" && strpos($currentPath, $baseUrl . "/") === 0) {
	$relativePath = substr($currentPath, strlen($baseUrl) + 1);
}
$isActive = function ($path) use ($relativePath) {
	$length = strlen($path);
	if ($length === 0) {
		return "";
	}
	return substr($relativePath, -$length) === $path ? " active" : "";
};
?>
<nav id="sidebar" class="sidebar js-sidebar">
	<div class="sidebar-content js-simplebar">
		<a class="sidebar-brand" href="<?php echo $baseUrl; ?>/dashboard.php">
			<span class="align-middle">AdminKit</span>
		</a>

		<ul class="sidebar-nav">
			<li class="sidebar-item<?php echo $isActive("dashboard.php"); ?>">
				<a class="sidebar-link" href="<?php echo $baseUrl; ?>/dashboard.php">
					<i class="align-middle" data-feather="sliders"></i> <span class="align-middle">Dashboard</span>
				</a>
			</li>

			<li class="sidebar-item<?php echo $isActive("pages/prospectos.php"); ?>">
				<a class="sidebar-link" href="<?php echo $baseUrl; ?>/pages/prospectos.php">
					<i class="align-middle" data-feather="users"></i> <span class="align-middle">Prospectos</span>
				</a>
			</li>

			<li class="sidebar-header">
				Estado
			</li>

			<li class="sidebar-item<?php echo $isActive("pages/estado/recien-llegados.php"); ?>">
				<a class="sidebar-link" href="<?php echo $baseUrl; ?>/pages/estado/recien-llegados.php">
					<i class="align-middle" data-feather="user-plus"></i> <span class="align-middle">Recien llegados</span>
				</a>
			</li>

			<li class="sidebar-item<?php echo $isActive("pages/estado/trabajando.php"); ?>">
				<a class="sidebar-link" href="<?php echo $baseUrl; ?>/pages/estado/trabajando.php">
					<i class="align-middle" data-feather="briefcase"></i> <span class="align-middle">Trabajando</span>
				</a>
			</li>

			<li class="sidebar-item<?php echo $isActive("pages/estado/vendidos.php"); ?>">
				<a class="sidebar-link" href="<?php echo $baseUrl; ?>/pages/estado/vendidos.php">
					<i class="align-middle" data-feather="shopping-cart"></i> <span class="align-middle">Vendidos</span>
				</a>
			</li>

			<li class="sidebar-item<?php echo $isActive("pages/estado/anulados.php"); ?>">
				<a class="sidebar-link" href="<?php echo $baseUrl; ?>/pages/estado/anulados.php">
					<i class="align-middle" data-feather="x-circle"></i> <span class="align-middle">Anulados</span>
				</a>
			</li>

			<li class="sidebar-header">
				Clasificacion
			</li>

			<li class="sidebar-item<?php echo $isActive("pages/clasificacion/alta-promesa.php"); ?>">
				<a class="sidebar-link" href="<?php echo $baseUrl; ?>/pages/clasificacion/alta-promesa.php">
					<i class="align-middle" data-feather="star"></i> <span class="align-middle">Alta Promesa</span>
				</a>
			</li>

			<li class="sidebar-item<?php echo $isActive("pages/clasificacion/buen-prospecto.php"); ?>">
				<a class="sidebar-link" href="<?php echo $baseUrl; ?>/pages/clasificacion/buen-prospecto.php">
					<i class="align-middle" data-feather="thumbs-up"></i> <span class="align-middle">Buen Prospecto</span>
				</a>
			</li>

			<li class="sidebar-item<?php echo $isActive("pages/clasificacion/en-desarrollo.php"); ?>">
				<a class="sidebar-link" href="<?php echo $baseUrl; ?>/pages/clasificacion/en-desarrollo.php">
					<i class="align-middle" data-feather="trending-up"></i> <span class="align-middle">En Desarrollo</span>
				</a>
			</li>

			<li class="sidebar-item<?php echo $isActive("pages/clasificacion/bajo-potencial.php"); ?>">
				<a class="sidebar-link" href="<?php echo $baseUrl; ?>/pages/clasificacion/bajo-potencial.php">
					<i class="align-middle" data-feather="trending-down"></i> <span class="align-middle">Bajo Potencial</span>
				</a>
			</li>

			<li class="sidebar-header">
				Sistema
			</li>

			<li class="sidebar-item<?php echo $isActive("pages/sistema/evaluaciones-rapidas.php"); ?>">
				<a class="sidebar-link" href="<?php echo $baseUrl; ?>/pages/sistema/evaluaciones-rapidas.php">
					<i class="align-middle" data-feather="zap"></i> <span class="align-middle">Evaluaciones Rapidas</span>
				</a>
			</li>

			<li class="sidebar-item<?php echo $isActive("pages/sistema/evaluaciones-profundas.php"); ?>">
				<a class="sidebar-link" href="<?php echo $baseUrl; ?>/pages/sistema/evaluaciones-profundas.php">
					<i class="align-middle" data-feather="layers"></i> <span class="align-middle">Evaluaciones Profundas</span>
				</a>
			</li>
		</ul>

		<div class="px-3 mt-3">
			<div class="d-grid">
				<a href="#" class="btn btn-primary" data-logout="true">Cerrar sesion</a>
			</div>
			<div class="text-center small mt-3 p-2 text-white">
				MenteInversora
			</div>
		</div>
	</div>
</nav>
