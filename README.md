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
    <img src="assets/images/logo.png" alt="Logo" width="308" height="80">
  </a>

<h3 align="center">Portfolio Project 1 - HTML & CSS</h3>

  <p align="center">
    A site for my business made from scratch using HTML and CSS.
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
<details>
  <summary>Table of Contents</summary>
  <ul class="table-of-contents">
    <li><a href="#introduction">1. Introduction</a></li>
    <li>
      <a href="#styling">2. Site Styling</a>
      <ul>
        <li>
          <a href="#common-elements">2.1. Common Elements</a>
          <ul class="smallest">
            <li><a href="#header">2.1.1. Header</a></li>
            <li><a href="#footer">2.1.2. Footer</a></li>
            <li><a href="#colours">2.1.3. Colours</a></li>
            <li><a href="#other">2.1.4. Other</a></li>
          </ul>
        </li>
        <li>
        <a href="#pages">2.2 Pages</a>
          <ul class="smallest">
            <li><a href="#index">2.2.1. Index</a></li>
            <li><a href="#pricing">2.2.2. Snake</a></li>
          </ul>
        </li>
        <li><a href="#worth-mentioning">2.3. Worth Mentioning</a></li>
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

<h4 id="footer"> 2.1. Footer</h4>

![Footer Image][footer] 

The footer is a simple copyright notice.

<h4 id="colours"> 2.2. Colours</h4>

As the site is based on an old game, I chose to go with colours that also reflect this. The main colours of the game are red, green and yellow. The index page also has purple text for its h2 elements.

The colour of the snake is red, and the canvas background colour is grey to make the canvas stand out from the body's very dark almost black colour. The food is green to make it stand out in relation to the snake. All elements with text on the page have the same grey background as the canvas to be consistent, with varying colours of text to add diversity and an 'old game feel' to it.

The border colours of text elements are always different from the text colour on the game page - if the text is yellow or red, the border is green, if the text inside an element is both yellow and green, the border is red.

<h4 id="other"> 2.3. Fonts</h4>

The main font used is a monospace called Source Code Pro. It being a monospace follows the old theme of the site. A Sans Serif font, Ubuntu is used on the index page where there is more text content to make it easier read.

<h4>Navigation</h4>

<h3 id="pages">2.2. Pages</h3>

<h4 id="index"> 2.2.1. Index</h4>

Upon landing to the index page, the user is presented with the introduction to the game. Here the user can click through the text either using the arrows or the numbered buttons. They also have the opportunity to skip the introduction and continue straight to the game.

<h4 id="pricing">2.2.2. Snake</h4>

The game will start 5 seconds after opening the page


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

**Fixed:**

* On the gallery page, the columns didn't fill the entire width as planned when setting the flex and max-width properties to 25% or 50%. This was due to those numbers not taking the padding into account, which I don't know why, all the examples I read online with similar arrangements worked fine. My solution to this was to instead calculate the values for flex and max-width by subtracting the padding from the relevant percentage.

* The header ended up having the wrong breakpoints in translated pages due to the translated navigation links having a larger character count. This was fixed by adding a class for these breakpoints in the translated html's and fixing the styling.

**Persistent:**

* There is a minor issue of one column in the gallery page having an amount of top padding I cannot explain at this point. It isn't an issue in terms of usability, but aesthetically it creates an inconsistent amount of gap between two of the pictures, which for me is a moderate nuisance. I will continue researching what the fault could be and aim to correct this as soon as I am able to.

<h2 id="deployment">5. Deployment</h2>

I deployed the page on GitHub pages via the following procedure:

1. From the project's repository, go to the Settings tab.
2. From the left-hand menu, select the Pages tab.
3. Under the Source section, select the Main branch from the drop-down menu and click Save.
4. A message will be displayed to indicate a successful deployment to GitHub pages and provide the live link.

You can find the live site via the following URL - [Rebecca Perttula live webpage](https://beccauwu.github.io/my-site)

<h2 id="future-enhancements">6. Future Enhancements</h2>

There are a few details I would definitely like to improve with the site in the future:

1. **Create a "sandwitch" navigation panel for mobile users**

    I tried to accomplish this with CSS and HTML alone but the search for a solution turned out to be too time consuming for it to be a viable option at this time. Once I am able to use JavaScript to a higher degree it is my plan to make this happen as from my understanding the process is much easier with JavaScript. At this point however my skills aren't good enough in JS to accomplish this but it would eliminate the need for the button to top which could have negative implications on user experience through their scroll position not being saved.

2. **Fix the gap between two of the columns in gallery**

    As mentioned before this issue does not impact usability to a significant degree but in the future I would like to fix this as it is somewhat visible and deviates from the consistent padding between the photos generally.

3. **Improve and add translations**

    At this point I am fully aware that the translations of all the pages aren't perfect - they are in a few points transliterated instead of finding a phrasing in the target language that would be equivalent to the English one. They are fully readable in each language however so the only difference would be a slightly improved user experience. I would also like to translate the site into other languages once I am proficient enough to be able to confidently do this, at this point however, the languages offered will be more than enough for the vast majority of the business' target demographies.

<!-- CONTACT -->
<h2 id="contact">7. Contact</h2>

Rebecca Perttula - [@uwuphoto](https://twitter.com/uwuphoto) - rebecca@perttula.co

Project Link: [https://beccauwu.github.io/my-site](https://beccauwu.github.io/my-site)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- Credits -->
<h2 id="credits">8. Credits</h2>

* **Richard Wells**
  
  My Code Institute mentor who has helped me tremendously throughout the project, giving tonnes of great advice and helped me figure out many things.

<p align="right">(<a href="#top">back to top</a>)</p>
</body>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/beccauwu/my-site.svg?style=for-the-badge
[contributors-url]: https://github.com/beccauwu/my-site/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/beccauwu/my-site.svg?style=for-the-badge
[forks-url]: https://github.com/beccauwu/my-site/network/members
[stars-shield]: https://img.shields.io/github/stars/beccauwu/my-site.svg?style=for-the-badge
[stars-url]: https://github.com/beccauwu/my-site/stargazers
[issues-shield]: https://img.shields.io/github/issues/beccauwu/my-site.svg?style=for-the-badge
[issues-url]: https://github.com/beccauwu/my-site/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/rebeccaperttula
[product-screenshot]: assets/images/amiresponsive.png
<!-- Site Captures -->
[header]: assets/images/site-captures/header.png
[header-425]: assets/images/site-captures/vw-425/header.png
[footer]: assets/images/site-captures/footer.png
[footer-425]: assets/images/site-captures/vw-425/footer.png
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