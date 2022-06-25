<link rel="stylesheet" type="text/css" href="assets/css/styles.css">

<body id="readme">
<div id="top"></div>
<div class="center">

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
</div>



<!-- site logo -->
<br />
<div align="center">
  <a href="https://beccauwu.github.io/snake/">
    <img src="assets/images/icon.png" alt="Logo" width="250" height="250">
  </a>

<h3 align="center">Portfolio Project 2 - Javascript</h3>

  <p align="center">
    The classic snake game as a web game.
    <br />
    <a href="https://beccauwu.github.io/snake/"><strong>Visit the site »</strong></a>
    <br />
    <br />
    ·
    <a href="https://github.com/beccauwu/snake/issues">Report Bug</a>
    ·
    <a href="https://github.com/beccauwu/snake/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details id="details">
  <summary>Table of Contents</summary>
  <ul id="table-of-contents">
    <li><a href="#introduction">1. Introduction</a></li>
    <li>
      <a href="#styling">2. Site Styling</a>
      <ul>
        <li>
          <a href="#colours-and-fonts">2.1. Colours and Fonts</a>
        </li>
        <li>
        <a href="#pages">2.2 Pages</a>
          <ul class="smallest">
            <li><a href="#footer">2.2.1. Footer</a></li>
            <li><a href="#index">2.2.2. Index</a></li>
            <li><a href="#snake">2.2.2. Snake</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li>
    <a href="#testing">3. Testing</a>
      <ul>
        <li><a href="#methods">3.1. Methodology and Results</a></li>
        <li><a href="#issues">3.2. Issues During Testing</a></li>
      </ul>
    </li>
    <li><a href="#bugs">4. Bugs</a></li>
    <li><a href="#deployment">5. Deployment</a></li>
    <li><a href="#future-enhancements">6. Future Enhancements</a></li>
    <li><a href="#contact">7. Contact</a></li>
    <li><a href="#credits">8. Credits</a></li>
  </ul>
</details>



<!-- Introduction -->
<h2 id="introduction">1. Introduction</h2>

[![Product Name Screen Shot][product-screenshot]](https://beccauwu.github.io/snake)

This site is a web game for the classic Snake-game popular from Nokia phones. The site is divided into 2 pages - the index page and the actual game page.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- Styling -->
<h2 id="styling">2. Site Styling</h2>

Here I will go through all the different design choices and talk about what implications they are designed to have on user experience. As a general note here in the beginning, it would be important to stress that usability has been the top priority in creating the site and thorough testing has been done to see potential flaws and fix them.


<h3 id="colours-and-fonts"> 2.1. Colours and Fonts</h3>

**Colours**

As the site is based on an old game, I chose to go with colours that also reflect this. The main colours of the game are red, green and yellow. The index page also has purple text for its h2 elements.

The colour of the snake is red, and the canvas background colour is grey to make the canvas stand out from the body's very dark almost black colour. The food is green to make it stand out in relation to the snake. All elements with text on the page have the same grey background as the canvas to be consistent, with varying colours of text to add diversity and an 'old game feel' to it.

The border colours of text elements are always different from the text colour on the game page - if the text is yellow or red, the border is green, if the text inside an element is both yellow and green, the border is red.

**Fonts**

The main font used is a monospace called Source Code Pro. It being a monospace follows the old theme of the site. A Sans Serif font, Ubuntu is used on the index page where there is more text content to make it easier read.

<h3 id="pages">2.2. Pages</h3>

<h4 id="footer"> 2.2.1 Footer</h4>

![Footer Image][footer] 

The footer is a simple copyright notice.

<h4 id="index"> 2.2.2. Index</h4>

Upon landing to the index page, the user is presented with the introduction to the game. Here the user can click through the text either using the arrows or the numbered buttons. They also have the opportunity to skip the introduction and continue straight to the game.

<h4 id="snake">2.2.3. Snake</h4>

**Gameplay**

The objective of the game is to get as high of a score as possible by eating "fruits", the green blocks appearing on the canvas. Every time the snake eats a fruit it grows one block, the score increases by 10, and the speed of the snake increases. The game ends when the snake collides with itself, which becomes increasingly difficult to avoid the longer you play. When the game ends, the leaderboard is shown and the user has the possibility of adding themselves to it.

**Layout**

When the game page is first opened, the user is presented with the current “leaderboard” for the game, and a 5-second countdown starts after which the game begins. The game canvas itself is fully responsive in size. If played in vertical mode (i.e., usually on mobile), there are button controls underneath the canvas. In horizontal mode the controls are on the side of the canvas and the user has the option to switch sides as preferred. 
Underneath the controls in vertical mode or underneath the canvas in horizontal mode, there is a button to open the leaderboard that was first presented when opening the page. When the user has started playing, they have the option to add themselves to the table – if their score is high enough, they will be displayed on the page. In this view the score is positioned underneath the table and the button for closing the leaderboard is appended to the same container as the other elements.

**Controls**

The controls on a PC are the keys WASD – W to move up, A to move left, S to move down, and D to move right. The key P is used to pause the game. 
Another option for controlling the game is through a D-pad, where the arrow keys change the movement direction, and the middle control button toggles pausing.  
When the game is resumed from pause, there is a 3-second countdown for it to start again, to give time for the user to get prepared, which can be especially important at higher scores due to the increasing speed every time the snake eats.

<h2 id="testing">3. Testing</h2>

<h3 id="methods">3.1. Methodology and Results</h3>

All of the pages have been thoroughly tested by individuals as well as using software such as ARC and Lighthouse. The user feedback has been positive, without any major suggestions for improvement. Both softwares showed some issues, which have been solved as well as they possibly could have been using the already existing site framework. Both the CSS and HTML have been passed through the W3C validation service without errors.

![HTML validation without errors][html-validation]
![CSS validation without errors][css-validation]
![Lighthouse results][lighthouse]

<h3 id="issues">3.2. Issues During Testing</h3>

![Contrast ratio flag][contrast-ratio]

* Both ARC and Lighthouse flagged the contrast ratio of the logo text compared to the background as being too low, which I believe to be a false positive. After multiple-user testing, the conclusion has consistently been that it is fully readable. The pages have been put through multiple different colour blindness filters where the text has also been fully readable on each of them. Further evidence of a false positive is that neither of these extensions flag the text on the index page hero photo, where logically the contrast ratio should be registered as lower due to the opaque background. I believe the testing fully disregards the header background colour and instead tests the logo text against the background photo on the index page, which is behind the header and therefore doesn't affect the readability of the text whatsoever.

* The contrast ratios of some of the smaller sized texts, particularly the ones using the red variable colour, were flagged which was quite understandable as the text was quite thin and in some cases probably would be difficult to read. This was solved by either increasing the font size or the font weight, stopping them from being flagged.

* In the early stages of development, the pages containing images were flagged for using uncompressed image files, this was solved by compressing the files and converting them to webp which substantially imroved the performance scores of the site - going from around 80 to 100. Most of the jpeg and png-files were converted excluding the png files which had a transparent background as webp as a format does not support it and instead creates files which don't look great. A perfect example of this would be the WhatsApp QR-code, for which if converted to webp it would become a much momre difficult and time consuming task to add a border radius to the white background, which now is done by instead of the image file having the backgrund, placing it behind the image through the stylesheet.

<h2 id="bugs">4. Bugs</h2>

**Fixed**

Bug: Snake marked as dead when game was paused
Fix: Declare a variable, which is false when game is paused, and the function for game end won’t check for death.

Bug: Responsive canvas size ended up creating odd-numbered sizes
Fix: Round the output of adaptive style into the nearest 10-number

**Persistent**

Bug: When pressing two buttons too quickly after each other, it may cause the snake to turn on itself and thus ending the game. This bug really only affects PC players, it isn’t possible to click the D-pad buttons fast enough to make this happen.


<h2 id="deployment">5. Deployment</h2>

I deployed the page on GitHub pages via the following procedure:

1. From the project's repository, go to the Settings tab.
2. From the left-hand menu, select the Pages tab.
3. Under the Source section, select the Main branch from the drop-down menu and click Save.
4. A message will be displayed to indicate a successful deployment to GitHub pages and provide the live link.

You can find the live site via the following URL - [Snake live webpage](https://beccauwu.github.io/snake)

<h2 id="future-enhancements">6. Future Enhancements</h2>

There are a few details I would like to improve with the site in the future:

1. **Add a database for the leaderboard**

I was in the beginning working with Google Firebase’s Realtime Database to add a working leaderboard. I got nearly there but realised I should spend the time instead making the game work so I instead made an array with preset players with different scores as a ‘proof of concept’. The Firebase capabilities are nearly ready to deploy as I did make a local copy of the files when I switched and plan on adding this as soon as possible.

2. **Add settings**

In the future I am planning to implement different user configurable settings for the colour scheme as well as game difficulty levels.


<!-- CONTACT -->
<h2 id="contact">7. Contact</h2>

Rebecca Perttula - [@uwuphoto](https://twitter.com/uwuphoto) - rebecca@perttula.co

Project Link: [https://beccauwu.github.io/snake](https://beccauwu.github.io/snake)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- Credits -->
<h2 id="credits">8. Credits</h2>

* **Richard Wells**
  
  My Code Institute mentor who has helped me tremendously throughout the project, giving tonnes of great advice and helped me figure out many things.

<p align="right">(<a href="#top">back to top</a>)</p>
</body>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/beccauwu/snake.svg?style=for-the-badge
[contributors-url]: https://github.com/beccauwu/my-site/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/beccauwu/snake.svg?style=for-the-badge
[forks-url]: https://github.com/beccauwu/my-site/network/members
[stars-shield]: https://img.shields.io/github/stars/beccauwu/snake.svg?style=for-the-badge
[stars-url]: https://github.com/beccauwu/my-site/stargazers
[issues-shield]: https://img.shields.io/github/issues/beccauwu/snake.svg?style=for-the-badge
[issues-url]: https://github.com/beccauwu/my-site/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/rebeccaperttula
[product-screenshot]: assets/images/amiresponsive.png
<!-- Site Captures -->
[footer]: assets/images/site-captures/footer.png
[index]: assets/images/site-captures/index.png
[index-425]: assets/images/site-captures/vw-425/index.png
[pricing]: assets/images/site-captures/pricing.png
[pricing-425]: assets/images/site-captures/vw-425/pricing.png
[gallery]: assets/images/site-captures/gallery.png
[gallery-425]: assets/images/site-captures/vw-425/gallery.png
[gallery-800]: assets/images/site-captures/vw-800/gallery.png
[about]: assets/images/site-captures/about.png
[about-425]: assets/images/site-captures/vw-425/about.png
[topbtn]: assets/images/site-captures/vw-425/topbtn.png
[colours]: assets/images/site-captures/colours.png
[lighthouse]: assets/images/lighthouse.png
[contrast-ratio]: assets/images/cr.png
[css-validation]: assets/images/w3ccss.png
[html-validation]: assets/images/w3chtml.png