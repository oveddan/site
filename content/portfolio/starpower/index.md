---
title: "StarPower"
date: 2019-01-17T19:31:06-05:00
draft: false
image: 'images/starpower.png'
animatedImage: 'images/starpower.gif'
weight: 2
---

StarPower is an led sculpture consisting of 12 frosted tubes placed precisely in a circle and high frame-rate addressable leds allowing for sooth animations projected onto a circle.

<!--more-->


{{<vimeo 312209356>}}

StarPower is made in collaboration with Breck Armstrong.  It is consisted of a wooden frame and 12 pcv tubes, which we frosted ourselves, using gels on the inside and frosted spraypaint on the outside.

The **LEDs** are **APA102s,** the equivalent of [Adafruit Dotstars,](https://learn.adafruit.com/adafruit-dotstar-leds/overview) allowing for high framerate animations.  For StarPower, the LEDs are configured in 4 sets of 3 bars, with each set of bars having the data and clock daisy chained, and the power and ground connected directly to the power source.

We originaly we used a **Teensy 3.2** with the **FastLED** library and [hardware SPI](https://github.com/FastLED/FastLED/wiki/SPI-Hardware-or-Bit-banging), using the the technique to [get four hardware SPI lines.](https://github.com/FastLED/FastLED/wiki/SPI-Hardware-or-Bit-banging#getting-four-hardware-spi-lines-for-the-apa102-out-of-the-teensy-303132)

We eventually got this working but found the Ardiuno coding environment challenging to program elaborate animations in.  

At ITP resident [Aaron Parsekian](http://www.aaronparsekian.com/) showed me the  **[LeDMX4 PRO](https://dmxking.com/led-pixel-control/ledmx4-pro)** controller which can be used to control 4 strips of APA102s using ArtNet.

We ended up switching to use this controller, and I wrote a **TouchDesigner** program to **map the leds** in a circular physical space, and allow for easy generation visuals to show on the star.

{{<image src="images/ledmx" caption="Using the DMXKing LeDMX4 PRO to control using ArtNET 12 strips of LEDS that are daisy chained into 4 sets.">}}

{{<image src="images/touchdesigner" caption="LED Mapping in TouchDesigner">}}

{{<image src="images/star.jpg">}}

## Fabrication
{{<image src="images/star-7.jpg" caption="Soldering data and clock wires">}}
{{<image src="images/star-9.jpg" caption="Materials for the LED bars - APA102s, semi-circular dowels that would be recessed enough to diffuse the diodes, and some sample configurations">}}
{{<image src="images/star-3.jpg" caption="Glueing led strip to semi-circular shaped dowel.">}}
{{<image src="images/star-10.jpg" caption="Glueing led strip to semi-circular shaped dowel.">}}

{{<image src="images/ledbars" caption="All 12 assembled led bars.">}}
{{<image src="images/star-5.jpg" caption="Testing out bar sizes">}}
{{<image src="images/star-8.jpg" caption="The clamps to hold the bars onto the frame">}}
{{<image src="images/star-11.jpg" caption="Writing test code in Arduino">}}
{{<image src="images/star-12.jpg" caption="Soldering the Teensy 3.2 on to a perfboard">}}
{{<image src="images/star-13.jpg" caption="measuring degrees between bars...">}}
{{<image src="images/star-14-cropped.jpg" caption="And turning that into length">}}
{{<image src="images/star-15.jpg">}}
{{<image src="images/star-16.jpg">}}
{{<image src="images/star-17.jpg">}}
{{<image src="images/star-18.jpg" caption="prototyping attachments">}}
{{<image src="images/prototyping">}}
{{<image src="images/star-19.jpg" caption="Making holes for wires">}}
{{<image src="images/star-20.jpg">}}
{{<image src="images/star-21.jpg">}}
{{<image src="images/painting">}}
{{<image src="images/star-22.jpg">}}
{{<image src="images/painted">}}

{{<image src="images/star-23.jpg">}}
{{<image src="images/wiring">}}
{{<image src="images/assembled">}}


{{<image src="images/star-24.png" caption="testing out wiring">}}
{{<image src="images/star-26.jpg" caption="spraying frosting onto the tubes">}}
{{<image src="images/star-28.jpg">}}
{{<image src="images/star-29.jpg">}}
{{<image src="images/star-30.jpg">}}
{{<image src="images/star-31.jpg">}}
{{<image src="images/star-32.jpg">}}
{{<image src="images/star-33.jpg">}}
{{<image src="images/star-34.jpg">}}
{{<image src="images/star-35.jpg">}}
{{<image src="images/star-37.jpg">}}
{{<image src="images/star-39.jpg">}}
{{<image src="images/star-41.jpg">}}
{{<image src="images/star-42.jpg">}}
{{<image src="images/star-43.jpg">}}
{{<image src="images/star-44.jpg">}}
{{<image src="images/star-45.jpg" caption="The original configuation where we just used the Teensy and tried to power everything through the Teensy's power. This was my first electronics project and I learned quickly that the port on the Teensy only supports 0.5a of current." >}}
{{<image src="images/star-46.jpg">}}
{{<image src="images/star-47.jpg">}}
{{<image src="images/star-48.jpg" caption="Because of the limitation of the power header on the Teensy, we were barely able to power any lights. We eventually switched to using direct power and level switching.">}}
{{<image src="images/star-49.jpg" caption="The new circuit, with power connected directly to the LED strips, and the data and clock signal from the Teensy level switched from 3.3v to 5v.">}}
{{<image src="images/star-50.jpg" caption="The new circuit, with power connected directly to the LED strips, and the data and clock signal from the Teensy level switched from 3.3v to 5v.">}}
{{<image src="images/star-51.jpg">}}
{{<image src="images/star-52.jpg" caption="Pleased to see it worked!">}}
{{<image src="images/star-53.jpg">}}
{{<image src="images/star-54.jpg" caption="Installing it in its home">}}
{{<image src="images/star-55.jpg">}}