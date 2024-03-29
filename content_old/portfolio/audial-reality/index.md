---
title: 'Audial Reality'
date: 2018-01-21T21:27:38-05:00
draft: false
weight: 3
image: 'images/audialreality_image.gif'
animatedImage: '/images/audialreality_sunset.gif'
showonlyimage: true
summary: Visualizes sound in real-time in the browser using audio, react, shaders, and procedural noise.
---

{{< original_image src="images/audialreality.gif" >}}

- [The Application (audialreality.com)](https://audialreality.com/)
- [The Code](https://github.com/oveddan/audial_reality)

---

This was my final project for the Computer Graphics class at NYU. After [my work](pursuit-by-equinox/) on the Pursuit by Equinox,
I learned the power of webgl to render fast and beautiful visualization in the browser. The graphics pipeline and shader programming were
still a mystery to me, so I took this class to get a deep understanding. I used the final project as an opportunity to learn how to make
complex shaders driven by external inputs and procedural noise. In this case the input is the microphone in the browser using the WebAudio API - it works well with
both music and voice.

See the [github readme](https://github.com/oveddan/audial_reality/blob/master/README.md) for technical details.
