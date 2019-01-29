---
title: "Presence at the MakerFaire: with PoseNet"
date: 2019-01-28T22:39:13-05:00
draft: false
image: 'images/presence-makerfaire.png'
animatedImage: 'images/presence-makerfaire.gif'
weight: 0
---

Presence at the MakerFaire was a modification of the existing Presence kinetic scultpure to use pose estimation powered by PoseNet as a form of gestural control.  Its inaccuracies bring out entertaining behaviors from the viewers.

<!--more-->

{{<vimeo 313941102>}}

* **[The Original Sculpture](/presence)**
* **[Fabrication Documentation](/blog/posts/presence/fabricating-the-kinetic-sculpture/)**
* **Technologies:** [PoseNet](https://medium.com/tensorflow/real-time-human-pose-estimation-in-the-browser-with-tensorflow-js-7dd0bc881cd5), Neural Network, CNC Router, Laser Cutter, **TouchDesigner**, Midi

It replaces the gaze estimation from the original project with human pose estimation powere by PoseNet to control the motors.  It replaces Processing with TouchDesigner to link the pose estimation with the servo controller and servo animations.

