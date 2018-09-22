---
title: "Presence"
date: 2018-01-21T16:08:45-05:00
draft: false
weight: 1
image: 'images/presence_image.png'
animatedImage: 'images/presence.gif'
showonlyimage: true
aliases:
  - /presence

---

Presence is an interactive kinetic sculpture that reacts to the shape of a viewer’s pose.  

It uses a machine learning algorithm called PoseNet to detect poses from a webcam, and rotates a series of spirals to reveal a pattern that reflects what it perceives.

<!--more-->

**[Read more about PoseNet here](https://medium.com/tensorflow/real-time-human-pose-estimation-in-the-browser-with-tensorflow-js-7dd0bc881cd5)**
<br/>
**[Read about the fabrication of Presence here](https://www.danioved.com/blog/posts/presence/fabricating-the-kinetic-sculpture/)**

Presence was **originally** a kinetic sculpture that was controlled by a viewers gaze. As a result of observations from user testing at the ITP Winter Show, and my work
releasing PoseNet in collaboration with researchers at Google, it was changed to be human pose and gesture reactive.  This is because gestural control using arms and the body is a more natural form of interaction than moving eyes with the intention of changing something.

This new version is debuting at the [2018 MakerFaire](https://makerfaire.com/new-york/), and full documentation will be coming soon; 

#### Hardware

The installation consists of 21 Futaba S3004 servos controlled by a Mini Maestro 24-Channel USB Servo Controller, which is connected over usb to a PC with a Nvidia gtx970 gpu.  A basic webcam is connected over usb to the PC.  A 5V 8A power supply powers the servos.
 
The servos are mounted to a piece of laser-cut acrylic, which is attached to a CNC-routed Plywood frame.  White shippings tubes with electrical-tape spirals are mounted to each motor using CNC-routed end-caps attached to mounting hubs.  Steel screws which are fastened to the top of the frame provide horizontal support to the tubes and allow them to rotate freely.

#### How it works

On a laptop with a webcam, human poses in the browser using PoseNet. These pose positions are streamed over websocket to TouchDesigner.
In TouchDesigner, the person with the pose closest to the center of the image is selected to control the installation.  Based on the
position of the arms, elbows, and shoulders, servo positions are calculated to reflect the shape of the pose.  These servo positions are sent
from TouchDesigner over serial to the Mini Maestro servo controller, and in TouchDesigner the rotations are simulated with a 3d-visualization.
In addition, a midi controller is used to both display the position of the servos, and allow for addition forms of tangible interaction by letting
a user press a button to alter the shape of the installation as well.

All of the code will be open-sourced once it's cleaned up.

**The video and documentation below are from the previous iteration that was eye gaze reactive:** 

{{< vimeo 259512916 >}}

---

* **[Documentation](/blog/tags/presence)**
* **[Gaze Estimation Colaboratory Notebook](https://colab.research.google.com/drive/11s5IQkI8H-kIn00Kg6Sqp-dD3RwsICdE#scrollTo=F-jyn1bRR8M8)**
* **[The Code](https://github.com/oveddan/presence)**
* **Technologies:** Computer Vision, Neural Network, CNC Router, Laser Cutter, Caffe, python, Servo motors, Processing

Our eyes are windows into our interests and intentions.
This piece explores new ways to communicate with art using these indicators.
The viewer's perception becomes part of a feedback loop, as when it changes,
the shape of the installation responds, which in turn alters the viewer's
perception.

{{< image src="images/in_front_of" >}}

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
Researchers at MIT and University of Georgia proved it can be done with any webcam in their research paper called [Eye Tracking for Everyone](http://gazecapture.csail.mit.edu/).  

In this paper they trained a neural-network on about 2.4 million frames of video of people looking at a dot on a screen on different devices.  This neural-network was able to achieve up to around **2 cm accuracy** when predicting gaze.  

Presence uses the [pre-trained model](https://github.com/CSAILVision/GazeCapture) provided by the researchers to track gaze in real-time. It detects faces and eyes use OpenCV, then forwards these detection through the neural-network model using Caffe, which then outputs the gaze positions in centimeters relative to the camera.  A Processing sketch reads these positions, generates an animation, and converts the animation into servo position byte instructions which are sent over serial to a servo controller.
 
