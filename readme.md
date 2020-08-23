# Who Dis?

This is a web version of a certain popular face guessing board game. It's built with PHP and MySQL on the backend and React on the frontend.

http://www.whodis.fun/

## Setup & Config

**Who Dis?** requires MySQL and PHP 7+.

1. Create a MySQL database with `/includes/schema.sql`

2. In the `/includes/` directory, copy `config-sample.php` to `config.php` and edit to add the correct options:

    * BASE_URL - the URL to access the app
    * ENV - (optional) uncomment to enable production environment
    * Database Credentials

## Random Character Generation

The character images are random Bitmoji faces generated using [Matthew Nau's Libmoji library](https://github.com/matthewnau/libmoji).

The names are generated based on [FiveThirtyEight's Most Common Unisex Names in America](https://github.com/fivethirtyeight/data/tree/master/unisex-names), which uses data from the [Social Security Adminstration](http://www.ssa.gov/oact/babynames/limits.html). I took the top 180 names and edited the list to remove similar names such as Kerry, Carey, and Kary. You can read more about how the original list of names was generated on [FiveThiryEight](https://fivethirtyeight.com/features/there-are-922-unisex-names-in-america-is-yours-one-of-them/).

## Custom Games

You can also create a custom game that provides a predefined list of characters instead of generating them randomly. For best results you'll want to include at least 24 custom charcters.

1. Create a directory for your custom game images (this example uses `customgame` but you can call it anything you like):
`/assets/img/customgame/`

2. Create a data file for your game:
`/includes/json/customgame.json`

3. Save the data for your custom game in this JSON format:
```
{
    "game": "customgame",
    "title": "My Custom Game Title",
    "characters": [
        {
            "name": "Custom Character 1",
            "image": "1.jpg"
        },
        {
            "name": "Custom Character 2",
            "image": "2.jpg"
        },
        ...
    ]
}
```

4. The custom game can be accessed by appending the following query string to your base URL:
`BASE_URL/?game=customgame`

## Disclaimer

This project is in no way affiliated with, authorized, maintained, sponsored or endorsed by Hasbro, Bitmoji, or any affiliates or subsidiaries.
