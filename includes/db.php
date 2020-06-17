<?php
/**
 * Database Functions
 */

// config file for database credentials
require_once('config.php');

/**
 * Generate a random string of a specific length
 * @param  integer $length : How many characters the generated string should be
 * @return [String] $string : The generated string
 */
function generate_random_string($length = 4) {

    $allowed = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $string = '';

    while (strlen($string) < $length) {
        $string .= $allowed[rand(0, strlen($allowed) - 1)];
    }

    return $string;
}

/**
 * Given a game code, load the matching game data from the database
 * @param  [String] $code : The code used to identify the game
 * @return [Array] $data : The game data, or false if there was an error
 */
function load_game($code) {

    // code is always uppercase
    $code = strtoupper($code);

    // connect to db
    $mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    // error connecting to db
    if (mysqli_connect_errno()) {
        error_log('Error connecting to database.');
    } else {
        // prepare query and then bind variables to prevent sql injection
        $stmt = $mysqli->prepare('SELECT * FROM games WHERE code=?');
        $stmt->bind_param('s', $code);
        $stmt->execute();
        $result = $stmt->get_result();
        $data = $result->fetch_assoc();;
        $stmt->close();

        // close database connection
        $mysqli->close();
    }

    // return the game data
    if (!empty($data)) {
        $data['characters'] = json_decode($data['characters']);
        return $data;
    }

    return false;
}

/**
 * Give a list of characters, generate a random game code and save the game data to the database
 * @param  [Array] $characters : Array of characters (names and images) to use for the new game
 * @return [Array] $data : Associative array of the new game's code and characters, or false if there was an error
 */
function new_game($characters) {

    // todo: check if code already exists in db
    $code = generate_random_string();
    $characters_json = json_encode($characters);

    // connect to db
    $mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    // error connecting to db
    if (mysqli_connect_errno()) {
        error_log('Error connecting to database.');
    } else {
        // prepare query and then bind variables to prevent sql injection
        $stmt = $mysqli->prepare('INSERT INTO games (code,characters) VALUES (?,?)');
        $stmt->bind_param('ss', $code, $characters_json);
        // execute and check for errors
        if ($stmt->execute()) {
            $success = true;
        } else {
            // log error
            error_log('Error executing SQL query:' . $stmt->error);
        }
        $stmt->close();

        // close database connection
        $mysqli->close();
    }

    // return the game data
    if (!empty($success)) {
        $data = ['code' => $code, 'characters' => $characters];
        return $data;
    }

    return false;
}
