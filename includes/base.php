<?php
$scriptDir = str_replace("\\", "/", dirname($_SERVER["SCRIPT_NAME"]));
$baseUrl = preg_replace("#/(?:pages|page)(?:/.*)?$#", "", $scriptDir);
$baseUrl = rtrim($baseUrl, "/");
