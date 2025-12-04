# Breathing Mosaic Mirror

This project is an interactive work based on p5. js, which transforms the camera image into a breathing pixel mosaic mirror.

Each camera pixel will be mapped to a square on the canvas, which will:
Left and right mirror (switchable)
According to the magnitude of brightness changes
Generate slight "breathing like" fluctuations over time
Near the edge of the canvas, it will be treated with dark corners
Rearrange RGB channels through different modes to create different color effects
Switch between different shapes: square/circle/triangle

On the upper layer of the mosaic, a colored fading trajectory of the mouse is also added, which gradually fades out over time.
---

## Interactive operation (keyboard and mouse)

↑/↓: Increase/decrease the size of mosaic blocks (while changing the sampling resolution)
M: Switch mirror
R: Switch breathing animation
V: Switch vignette
C: Switch color channel rearrangement mode (0/1/2)
S: Switch block shape (square/circle/triangle)
Mouse drag: draw rainbow fading trajectory
---

## Core idea explanation

Using low resolution camera images to drive high visual stylized mosaic effects
Combining brightness scaling and time sinusoidal breathing to present micro motion in the image
Add dark corner effect and RGB channel rearrangement for color experiments
Overlay user mouse trajectories to enhance interactivity and fun  