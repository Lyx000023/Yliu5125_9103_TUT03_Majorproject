# Yliu5125_9103_TUT03_Majorproject
Provides detailed explanations and links to prototypes for major projects.



# Boogie Code: A Digital Reimagining of Broadway

## Introduction

This project takes inspiration from Piet Mondrian’s painting "Broadway Boogie Woogie" (1942–43), which transforms the structure of New York City’s street grid into a vibrant composition of yellow, red, blue, and white blocks. The intersecting lines and rhythmic placements echo both urban mapping and the syncopated pulse of boogie-woogie jazz music.


As a part of a group generative art exploration built with **p5.js**, my task focusing on responsive visual systems inspired by urban rhythm and abstract geometry. My individual contribution uses **Perlin noise**, **weighted randomness**, and **asynchronous timing** to create a non-repetitive, animated, Mondrian-like grid composition.

<br><br>
<p align="center">
  <img src=" assets/Piet_Mondrian Broadway_Boogie_Woogie.jpeg" alt="Animation Preview" width="500">
</p>
<br><br>

---

## How to Interact

**To begin experiencing the work, simply load the webpage—no further interaction is required.**
The animation evolves autonomously over time:
  - Color blocks pulse and transition at predetermined intervals.
  - Red and white squares exhibit subtle jittering behavior driven by Perlin noise.
  - Rectangular elements in the upper and lower regions asynchronously pop in and out, following a fixed temporal rhythm.

The entire animation is non-interactive yet continuously dynamic, creating an ever-changing visual composition.
<br><br>
<p align="center">
  <img src="https://github.com/Lyx000023/Yliu5125_9103_TUT03_Majorproject/blob/main/%20assets/GIF_20250612013532477.GIF?raw=true" alt="Animation Preview" width="500">
</p>
<br><br>

---

## Animation Approach

### Driver: **Time** + **Perlin Noise**

- I chose a **time-based system** driven by `frameCount` and `millis()` to handle timing logic.
- **Perlin noise** introduces organic motion and subtle variation.
- A **weighted random color engine** controls region fills to simulate intentional design decisions.

### Animated Elements

The animation is composed of three primary elements, each contributing to the visual rhythm and conceptual layering of the work:

**Weighted Color Region Background**
Color zones are generated using a weighted random algorithm, resulting in non-uniform, dynamically shifting areas that form the foundation of the composition.

**Yellow Grid Lines with Perlin-Based Offsets**
Fixed yellow lines represent the structure of urban streets. These are combined with Perlin noise–driven offsets to introduce subtle movement, simulating the rhythm and vibrancy of a living city.

**Elastic Animated Blocks**
Rectangular blocks randomly appear across the grid using an elastic easing function. Their staggered timing and bounce effect create a sense of temporal variation and visual contrast.

### Timing and Reset

`initLayout()` assigns random delays to each grid cell.

After each animation loop completes, a new cycle with fresh randomness begins.

---

## Individual Differences in Approach

While I contributed to the group project by implementing user interaction and shared background rendering (as shown in the demo below — blocks respond to user-triggered instruments), my individual work shifts focus toward a individual theme: **Perlin noise and randomness**.

<br><br>
<p align="center">
  <img src=" assets/GIF_20250613164716657.GIF" alt="Animation Preview" width="500">
<br><br>


In my solo contribution, I use noise to control the floating behavior of squares, adding subtle motion and liveliness to the visual composition.

My work emphasizes **modular structure**, **visual hierarchy**, and **continuously evolving behavior** without direct user input.

By combining squares of different forms and behaviors, I aim to abstractly represent the **diverse elements of music** — rhythm, variation, and texture — in a dynamic, generative visual form.


<br><br>
<p align="center">
  <img src="https://github.com/Lyx000023/Yliu5125_9103_TUT03_Majorproject/blob/main/%20assets/GIF_20250612013532477.GIF?raw=true" alt="Animation Preview" width="500">
</p>
<br><br>

---

## Inspiration

A key inspiration for this project comes from an interpretation of Piet Mondrian’s Broadway Boogie Woogie, where the composition is compared to a musical score.

In the explanation, the original design  is to convert maps and music.Therefore, in both the group and individual parts, we try to transform the relationship between music and graphics, adding a new dynamic to the originally static artwork.


 Some of the detailed features are inspired by:

- Procedural randomness concepts from:
  - [Daniel Shiffman's Perlin Noise tutorial](https://www.youtube.com/watch?v=IKB1hWWedMk)
  - Generative art examples using `noise()` and `random()` in p5.js

<br><br>
<p align="center">
  <img src="https://github.com/Lyx000023/Yliu5125_9103_tut03_02/blob/main/p5-project1/assets/Original%20work%20concept.png?raw=true" alt="Animation Preview" width="500">

---

## Technical Summary

- **Responsive design** 

The canvas resizes with the window. I calculate spacing and cell sizes (gap, cellSize1, cellSize2) dynamically using initLayout(), so the composition always fits the screen.


- **Grid-based animation** 

with two layers:

  Upper Layer: Squares pop in with a bounce, using random delays and easeOutElastic() for movement.

  Lower Layer: Rectangles shake gently, controlled by Perlin noise — giving a subtle, natural motion.

- **Color Zones**:

The background is divided into zones based on yellow gridlines. Each region gets four colors using weighted randomness from bgPalette, and these update every 2500ms to keep things shifting slowly in the background.

- **Efficient control flow** 

using `draw()` loop + `t` as frame timer. Each animation cycle is managed with a frame counter t. Once all blocks finish animating, the layout resets with new randomness, keeping the motion non-repetitive.


---

## External Tools and References

- **Libraries Used:**

   [`p5.js`](https://p5js.org/)

   `p5.sound.js` *(included but not used in my implementation)*

- **References and Techniques:**

   [Daniel Shiffman – Perlin Noise Tutorial](https://www.youtube.com/watch?v=IKB1hWWedMk)

   p5.js official documentation

   ChatGPT suggestions (e.g., grid quadrant switching using weights)

  In order to obtain information and information sources more quickly during the data search stage, this work uses chatgpt search. In addition, AI is used to check and modify grammatical expressions. However, all content is created by the author.
   <br><br>
<p align="center">
  <img src=" assets/Creative coding major project .jpg" width="500">
  
  The addNote() function is designed to dynamically create and configure visual elements ("notes") that represent either static or animated components in the interactive canvas. Depending on the instrument type, the function supports static positioning, randomized motion, or customizable speed. These note objects are stored in a global array to be iteratively drawn and updated during the animation loop. I had asked about the logic of the gpt loop to achieve the design extension.

  <br><br>
<p align="center">
  <img src=" assets/731749694373_.pic.jpg" width="500">


  To achieve the concept of “controlled randomness” inspired by Generative Art, I consulted ChatGPT on how to apply weighted randomness for color selection and how to divide regions into separate quadrants. With the help of GPT, I implemented a nested loop structure to generate a color combination for each section. The use of weighting allows for different probabilities to be assigned to preferred colors.
  





---


