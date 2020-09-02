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

if (empty($game_data['game']) && !empty($_GET['game'])) {
    $game_data['game'] = htmlspecialchars(trim($_GET['game']));
}

?><!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no" />
    <title>Who Dis?</title>

    <?php if (defined('GOOGLE_ANALYTICS_ID') && defined('ENV') && ENV == 'production') : ?>
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-177103830-1"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '<?php echo GOOGLE_ANALYTICS_ID; ?>');
        </script>
    <?php endif; ?>

    <link rel="stylesheet" type="text/css" href="./assets/css/whodis.css">
    <script>const baseURL = '<?php echo BASE_URL; ?>';</script>
</head>

<body>

    <div id="game" class="wrap"></div>

    <!-- Load React. -->
    <?php if (defined('ENV') && ENV == 'production') : ?>
        <script src="https://unpkg.com/react@16/umd/react.production.min.js" crossorigin></script>
        <script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js" crossorigin></script>
    <?php else : ?>
        <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
        <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
    <?php endif; ?>

    <?php if (!empty($game_data)) : ?>
        <!-- game data -->
        <script id="game-data" type="application/json"><?php echo json_encode($game_data); ?></script>

        <?php if (!empty($game_data['game'])) : ?>
            <!-- custom game settings -->
            <script id="custom-game-settings" type="application/json"><?php echo file_get_contents(__DIR__ . '/includes/json/' . $game_data['game'] . '.json'); ?></script>
        <?php endif; ?>
    <?php endif; ?>

    <!-- main js -->
    <script type="text/javascript" src="./assets/js/whodis.js"></script>

</body>

</html>
