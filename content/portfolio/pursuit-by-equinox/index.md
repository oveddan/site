---
title: "The Pursuit by Equinox"
date: 2018-01-21T21:27:06-05:00
draft: false
weight: 1
image: 'images/pursuit_sized_image.gif'
animatedImage: 'images/pursuit_sized.gif'
showonlyimage: true
---

The Pursuit by Equinox is a gamified group cycling class driven by 500,000 records of data per session to display a Canne’s Lion winning visual experience. 700+ classes are hosted per month at Equinox locations across the United States.  I was the lead developer
on this project.

<!--more-->

{{< vimeo 207479575 >}}

---

##### Role: Lead Developer
##### Team Size: 6
##### Technologies: React, Redux, Node.js, RxJS, Three.js, glsl shaders, Websockets

I was the lead developer on a team that re-built the gaming and visualization platform from the ground up to be flexible and robust.
We converted it to use a single directional data-flow with redux on the server to centralize the state, 
and react, three.js, and webgl on the client to render real-time visualizations.

The new platform reduced the time it takes to build and release a game from 4 to 1.5 months,
and decreased the time it took for data to reach the screens from the bikes from 2 seconds to 100 milliseconds.

{{< image src="images/ServerToClients" caption="The new architecture with state centralized on the server using redux" >}}

I oversaw the release of 6 new games by external agencies using the new framework.

{{< image src="ThreePeaks" >}}

---

My talk at the NYC Node.js Meetup about the work we did:

{{< youtube zo39p-30arg >}}
