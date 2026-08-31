# Graphic Design Portfolio

A minimal, Tumblr-inspired masonry portfolio built with plain HTML, CSS and JavaScript.

## Getting started

1. Open this folder in Visual Studio Code.
2. Install the **Live Server** extension by Ritwick Dey if you do not already have it.
3. Open `index.html`.
4. Right-click and choose **Open with Live Server**.

## Adding your work

Put your images inside:

    images/

Then open:

    js/main.js

Add an entry to the `projects` array:

    {
        image: "images/my-design.jpg",
        title: "My Design",
        category: "Poster Design",
        year: "2026"
    }

You can use JPG, PNG, WEBP, SVG and other browser-supported image formats.

## Changing your name

Open `index.html` and replace:

    YOUR NAME

with your name or studio name.

## Changing the About section

The About section is at the bottom of `index.html`. Replace the placeholder copy with your own information.

## Current features

- Tumblr/Pinterest-inspired masonry gallery
- Natural image aspect ratios
- Responsive desktop/tablet/mobile layout
- Smooth image reveal
- Subtle hover zoom
- Hover project information
- Fullscreen image viewer
- Previous/next navigation
- Keyboard controls
- Escape to close
- Click backdrop to close
- Mobile swipe navigation
- Reduced-motion accessibility support
- No external frameworks or dependencies
