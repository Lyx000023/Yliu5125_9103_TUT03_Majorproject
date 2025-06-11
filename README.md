# Yliu5125_9103_TUT03_Majorproject
Provides detailed explanations and links to prototypes for major projects.



# Boogie Code: A Digital Reimagining of Broadway

## Introduction

This project takes inspiration from Piet Mondrian’s painting "Broadway Boogie Woogie" (1942–43), which transforms the structure of New York City’s street grid into a vibrant composition of yellow, red, blue, and white blocks. The intersecting lines and rhythmic placements echo both urban mapping and the syncopated pulse of boogie-woogie jazz music.


As a part of a group generative art exploration built with **p5.js**, my task focusing on responsive visual systems inspired by urban rhythm and abstract geometry. My individual contribution uses **Perlin noise**, **weighted randomness**, and **asynchronous timing** to create a non-repetitive, animated, Mondrian-like grid composition.

---

## How to Interact

- Load the webpage — no further interaction is needed.
- The animation evolves on its own:
  - **Color blocks** pulse and transition at set intervals.
  - **Red and white squares** subtly jitter using Perlin noise.
  - **Upper and lower rectangles** pop in and out asynchronously in a “breathing” rhythm.

> 🎬 The entire animation is non-interactive but continuously changing — ideal for visual contemplation.

---

## ⚙️ Animation Approach

### 🔧 Driver: **Time** + **Perlin Noise**

- I chose a **time-based system** driven by `frameCount` and `millis()` to handle timing logic.
- **Perlin noise** introduces organic motion and subtle variation.
- A **weighted random color engine** controls region fills to simulate intentional design decisions.

### 🎨 Animated Elements

| Layer           | Technique                 | Behavior                                  |
|----------------|---------------------------|-------------------------------------------|
| Background      | Weighted random zones     | Each region subdivides into 4 and recolors over time |
| Middle (Grid)   | Perlin-based offsets      | Red and white squares jitter subtly       |
| Upper & Lower   | Delayed pop-outs + easing | Cubes and rectangles appear rhythmically  |

### ⏱️ Timing and Reset

- `initLayout()` assigns random delays to each grid cell.
- After each animation loop completes, a new cycle with fresh randomness begins.

---

## 🔍 My Contribution vs. Group Members

| Member    | Driver Used       | Feature Focus               |
|-----------|-------------------|-----------------------------|
| Me        | Time + Perlin     | Weighted color grids, noise jitter, responsive layout |
| Member A  | Mouse interaction | Real-time drawing or reveals |
| Member B  | Audio beat        | Size pulsing or sync animation |
| Member C  | Time only         | Fade in/out with sinusoidal oscillation |

My work emphasizes **modular structure**, **visual hierarchy**, and **continuously varying behavior** without direct input.

---

## 💡 Inspiration

- The geometric, asymmetric design is inspired by **Mondrian's Composition** works.
- Color logic influenced by **data visualizations and cartographic grids**.
- Procedural randomness concepts from:
  - [Daniel Shiffman's Perlin Noise tutorial](https://www.youtube.com/watch?v=IKB1hWWedMk)
  - Generative art examples using `noise()` and `random()` in p5.js

---

## 🔧 Technical Summary

- **Responsive design** using `windowWidth/Height` to scale layout.
- **Grid-based animation** with two layers:
  - Upper layer: squares with bounce-in effect
  - Lower layer: rectangles jitter using Perlin offset
- **Color Zones**:
  - Defined by gridline intersections (`yellowCols`, `yellowRows`)
  - Updated every 2500ms using `regionQuarterColors`
- **Elastic easing** (`easeOutElastic`) to give animation springiness
- **Efficient control flow** using `draw()` loop + `t` as frame timer


## 🔄 Changes to Base Group Code

- Refactored timing logic for modularity:
  - Split layout initialization into `initLayout()`
  - Created `drawColorZones()` to manage dynamic backgrounds
- Added weighted random selection of color quadrants using `weightedRandomIndex()`
- Implemented multi-zone grid division based on responsive cuts from `yellowCols` and `yellowRows`
- Integrated Perlin noise into red and white square animation for jitter effect

---

## 🧰 External Tools and References

- **Libraries Used:**
  - [`p5.js`](https://p5js.org/)
  - `p5.sound.js` *(included but not used in my implementation)*

- **References and Techniques:**
  - [Daniel Shiffman – Perlin Noise Tutorial](https://www.youtube.com/watch?v=IKB1hWWedMk)
  - p5.js official documentation
  - ChatGPT suggestions (e.g., grid quadrant switching using weights)

---

## 🌐 Live Link

[🔗 GitHub Pages Demo (Replace with actual URL)](#)

