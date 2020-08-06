<?php
/**
 * Create New Game
 */

require_once('includes/db.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (!empty($_POST['characters'])) {
        // save new game to database
        $game_data = new_game($_POST['characters'], empty($_POST['game']) ? null : $_POST['game']);
    }
} // if POST

if (empty($game_data)) {
    // error response - set header
    http_response_code(500);
    // error message
    echo json_encode(['error' => 'Sorry, something went wrong.']);
} else {
    echo json_encode($game_data);
}
exit();
