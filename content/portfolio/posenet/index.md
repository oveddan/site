---
title: "PoseNet in Tensorflow.js"
date: 2018-05-28T15:15:18-04:00
draft: false
weight: 0
image: 'images/posenet_image.gif'
animatedImage: 'images/posenet.gif'
showonlyimage: true
---

PoseNet in a machine learning model which allows for real-time human pose estimation with any webcam.  In Collaboration with the Google Creation lab, I open-sourced a Tensorflow.js version, allowing for it to be tinkered with and used in the browser with just a few lines of code.

<!--more-->

* **[Blog Post](https://medium.com/tensorflow/real-time-human-pose-estimation-in-the-browser-with-tensorflow-js-7dd0bc881cd5)**
* **[Live Demo](https://storage.googleapis.com/tfjs-models/demos/posenet/camera.html)**
* **[Code](https://github.com/tensorflow/tfjs-models/tree/master/posenet)**

{{< original_image src="images/posenet_single.gif" >}}

---

*Content below is excerpt from [the blog post.](https://medium.com/tensorflow/real-time-human-pose-estimation-in-the-browser-with-tensorflow-js-7dd0bc881cd5)*

In collaboration with the Google Creative Lab, I’m excited to announce the release of a [TensorFlow.js](https://js.tensorflow.org/) version of [PoseNet](https://github.com/tensorflow/tfjs-models/tree/master/posenet), a machine learning model which allows for real-time human pose estimation in the browser. Try a live demo [here](https://js.tensorflow.org/).

**So what is pose estimation anyway?** Pose estimation refers to computer vision techniques that detect human figures in images and video, so that one could determine, for example, where someone’s elbow shows up in an image. To be clear, this technology is not recognizing who is in an image — there is no personal identifiable information associated to pose detection. The algorithm is simply estimating where key body joints are.

**Ok, and why is this exciting to begin with?** Pose estimation has many uses, from [interactive](https://vimeo.com/128375543) [installations](https://www.youtube.com/watch?v=I5__9hq-yas) that [react](https://vimeo.com/34824490) to the [body](https://vimeo.com/2892576) to [augmented reality](https://www.instagram.com/p/BbkKLiegrTR/), [animation](https://www.instagram.com/p/Bg1EgOihgyh/), [fitness uses](https://www.runnersneed.com/expert-advice/gear-guides/gait-analysis.html), and more. We hope the accessibility of this model inspires more developers and makers to experiment and apply pose detection to their own unique projects. While many alternate pose detection systems have been [open-sourced](https://github.com/CMU-Perceptual-Computing-Lab/openpose), all require specialized hardware and/or cameras, as well as quite a bit of system setup. **With PoseNet running on [TensorFlow.js](https://js.tensorflow.org/) anyone with a decent webcam-equipped desktop or phone can experience this technology right from within a web browser.** And since we’ve open sourced the model, Javascript developers can tinker and use this technology with just a few lines of code. What’s more, this can actually help preserve user privacy. Since PoseNet on TensorFlow.js runs in the browser, no pose data ever leaves a user’s computer.

...read the rest in [the blog post](https://medium.com/tensorflow/real-time-human-pose-estimation-in-the-browser-with-tensorflow-js-7dd0bc881cd5).


{{< original_image src="images/single-pose.png" caption="PoseNet can be used to estimate a single pose" >}}

{{< original_image src="images/multipose.png" caption="...or multiple poses" >}}