<?php
/**
 * Who Dis?
 * Main page for the game
 */

require_once(__DIR__ . '/includes/config.php');
require_once(__DIR__ . '/includes/db.php');

$code = null;
$game_data = null;

if (!empty($_GET['code'])) {
    $code = strtoupper(htmlspecialchars(trim($_GET['code'])));
    $game_data = load_game($code);
    if (!$game_data) {
        $game_data = ['code' => $code];
    }
}

?><!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no" />
    <title>Who Dis?</title>
    <link rel="stylesheet" type="text/css" href="./assets/css/whodis.css">
    <script>const baseURL = '<?php echo BASE_URL; ?>';</script>
</head>

<body>

    <div id="game"></div>

    <!-- Load React. -->
    <!-- Note: when deploying, replace "development.js" with "production.min.js". -->
    <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>

    <?php if (!empty($_GET['game'])) : ?>
        <script id="custom-game-characters" type="application/json"><?php echo file_get_contents(__DIR__ . '/includes/json/' . htmlspecialchars(trim($_GET['game'])) . '.json'); ?></script>
    <?php endif; ?>

    <!-- game data -->
    <script id="game-data" type="application/json"><?php echo json_encode($game_data); ?></script>

    <!-- main js -->
    <script type="text/javascript" src="./assets/js/whodis.js"></script>

</body>

</html>
