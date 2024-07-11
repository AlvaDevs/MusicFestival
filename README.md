# Music Festival

## Description

Music Festival is a website that provides information about a musical festival that will take place. The webpage is divided into four main sections:

1. **About the Festival**: General information about the event.
2. **Line-up**: List of artists and performance schedules.
3. **Gallery**: Images of the festival, created and managed dynamically with JavaScript.
4. **Tickets**: Information and options for ticket purchasing.

## Technologies Used

- **HTML5**: For the basic structure of the website.
- **CSS3 / SCSS**: For styling and designing the website, using SCSS for better organization and maintainability of the code.
- **JavaScript**: For dynamic functionality of the site, including creating and managing the image gallery.
- **Gulp**: For task automation, such as SCSS compilation, JavaScript minification, and image optimization.
- **Sharp**: For image manipulation and optimization in different formats (JPG, WebP, AVIF).

## Installation

To set up and run the project locally, follow these steps:

1. Clone the repository:

    ```sh
    git clone https://github.com/AlvaDevs/MusicFestival.git
    cd MusicFestival
    ```

2. Install the dependencies:

    ```sh
    npm i
    ```

3. Run the development server:

    ```sh
    npm run dev
    ```

## Project Structure

```plaintext
MusicFestival/
│
├── src/
│   ├── img/
│   │   ├── gallery/
│   │   │   ├── full/
│   │   │   └── thumb/
│   │   └── ...
│   ├── js/
│   │   └── app.js
│   ├── scss/
│   │   └── app.scss
│   │   └── base/
│   │   └── layout/
│   └── video/
├── build/
│   ├── img/
│   │   ├── gallery/
│   │   │   ├── full/
│   │   │   └── thumb/
│   │   └── ...
│   ├── js/
│   │   └── app.js
│   └── css/
│       └── app.css
│       └── app.css.map
├── gulpfile.js
├── index.html
├── package.json
├── package-lock.json
└── README.md
