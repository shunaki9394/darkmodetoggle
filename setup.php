
<?php
if (!defined('GLPI_ROOT')) { die('Direct access not allowed'); }

function plugin_init_thememode() {
   global $PLUGIN_HOOKS;
   $PLUGIN_HOOKS['add_css']['thememode'] = ['css/dark.css', 'css/toggle.css'];
   $PLUGIN_HOOKS['add_javascript']['thememode'] = ['js/thememode.js'];
   $PLUGIN_HOOKS['csrf_compliant']['thememode'] = true;
}

function plugin_version_thememode() {
   return [
      'name'           => 'Theme Mode (Dark/Light Toggle)',
      'version'        => '3.4.0',
      'author'         => 'Qbix / ChatGPT',
      'license'        => 'MIT',
      'homepage'       => 'https://qbix.tech',
      'minGlpiVersion' => '10.0.0'
   ];
}

function plugin_thememode_check_prerequisites() { return version_compare(GLPI_VERSION, '10.0.0', '>='); }
function plugin_thememode_check_config($verbose = false) { return true; }
