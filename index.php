<?php
/**
 * Who Dis?
 * Main page for the game
 */

require_once('includes/config.php');
require_once('includes/db.php');

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

    <!-- todo: move styles to external sass file and compile -->
    <style type="text/css">
        .board {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            grid-gap: 1em;
        }
        .tile {
            background: #ffe200;
            display: block;
            padding: 1em;
            text-align: center;
            transform-style: preserve-3d;
            transition: all 800ms;
        }
        .tile.hidden {
            background: #f1b200;
            transform: rotateX(180deg);
        }
        .tile img {
            height: auto;
            max-width: 100%;
        }
        .tile .name {
            display:  block;
        }
    </style>

    <script>const baseURL = '<?php echo BASE_URL; ?>';</script>

</head>

<body>

    <h1>Who Dis?</h1>

    <div id="game"></div>

    <hr>

    <h2>Join or Continue</h2>
    <form action="<?php echo BASE_URL; ?>/" method="get">
        <p>
            <label for="input-code">Game Code</label>
            <input id="input-code" name="code" value="<?php echo $code; ?>" type="text">
        </p>
        <button type="submit">Join Game</button>
    </form>

    <h2>New Game</h2>
    <button id="new-game">Start New Game</button>

    <!-- Load React. -->
    <!-- Note: when deploying, replace "development.js" with "production.min.js". -->
    <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>

    <!-- game data -->
    <script id="game-data" type="application/json"><?php echo json_encode($game_data); ?></script>

    <!-- main js -->
    <script type="text/javascript" src="./dist/main.js"></script>

</body>

</html>
