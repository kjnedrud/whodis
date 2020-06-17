<?php
/**
 * Create New Game
 */

require_once('includes/db.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    if (!empty($_POST['characters'])) {

        $characters = json_decode($_POST['characters']);

        // clean data and make sure it is in expected format
        $characters = array_map(function($character) {
            return [
                'name' => htmlspecialchars(trim($character->name)),
                'image' => htmlspecialchars(trim($character->image))
            ];
        }, $characters);

        // save new game to database
        $game_data = new_game($characters);
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
