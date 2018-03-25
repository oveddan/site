---
title: "Presence"
date: 2018-01-21T16:08:45-05:00
draft: false
weight: 10
image: 'images/presence_image.png'
animatedImage: 'images/presence.gif'
showonlyimage: true

---

Presence is a kinetic sculpture that is controlled by a viewer’s
gaze. It uses a webcam and computer vision to detect where a user 
is looking, and alters its shape to reflect this focal point.

<!--more-->

{{< vimeo 259512916 >}}

---

* **[Documentation](/blog/tags/presence)**
* **[The Code](https://github.com/oveddan/presence)**
* **Technologies:** Computer Vision, Neural Network, CNC Router, Laser Cutter, Caffe, python, Servo motors, Processing

Our eyes are windows into our interests and intentions.
This piece explores new ways to communicate with art using these indicators.
The viewer's perception becomes part of a feedback loop, as when it changes,
the shape of the installation responds, which in turn alters the viewer's
perception.

#### Why eye-gaze tracking?

Traditionally, our interface with computers has been limited to our hands, using controls such as a mouse,
a touch screen or a keyboard.  As stated in the research paper [Eye Tracking in Advanced Interface Design](http://www.cs.tufts.edu/~jacob/papers/barfield.pdf):

> Current technology has been stronger in the computer-to-user direction than user-to-computer, hence today’s user-computer dialogues are rather one-sided, with the bandwidth from the computer to the user far greater than that from user to computer. Using eye movements as a user-to-computer communication medium can help redress this imbalance. 

While Presence explores an artistic form of using eyes as a communication medium, the ability to use our gaze to control an interface opens up a wide array of possibilites, such as:

* Enabling someone who is physically disabled to use their eyes instead of a mouse
* Being able to look at the bottom of an article or text and have the screen scroll down automatically
* When having multiple tabs in an editor open, allowing a user to switch tabs and focus using their eyes
* Measuring focus and interest

#### How does it work?

Until recently, being able to track gaze has been both expensive and cumbersome, as it requires either specialized, pricey hardware that needs to be calibrated for each user, or specific types of cameras that are often unreliable.
Last year researchers at MIT and University of Georgia proved it can be done with any webcam in their research paper called [Eye Tracking for Everyone](http://gazecapture.csail.mit.edu/).  

In this paper they trained a neural-network on about 2.4 million frames of video of people looking at a dot on a screen on different devices.  This neural-network was able to achieve up to around **2 cm accuracy** when predicting gaze.  

Presence uses the [pre-trained model](https://github.com/CSAILVision/GazeCapture) provided by the researches to track gaze in real-time.  It then forwards the gaze predictions to a Processing sketch which controls 21 servos
that rotate to reveal a pattern in the direction of the gaze.
