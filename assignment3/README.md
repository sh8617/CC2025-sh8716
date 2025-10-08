# Concept Introduction
This project, "Blooming Vase Clock," is based on the Chinese proverb "昙花一现 (The Crown of Christmas Is a Splendid Flower)," which expresses a transient moment of beauty that is fading very soon.
In real life my mother likes to put fresh flowers on our windowsill.
She says flowers make people happy, but their beauty is fleeting — she replaces them nearly every day.
This scene reminded me of time and beauty, and that all that blooms also withers.
I also wanted to evoke the poetic beating of time passing by via the imagery of blooming/wilting flowers over the course of the rising/setting sun to symbolize the brevity of life.
# Design
The sun travels along a semi-circular path from left to right, signifying the passage of one day from dawn until dusk, but in this case, one minute in real time is equivalent to one day symbolically.
The color of the sky changes gradually by the time (map() + t) from dark blue color (night) to light blue color (morning) to warm orange color (sunset) to dark color again (night).
The flowers open gradually from morning until noon! They close softly as the evening comes on. The fresh green color of the stem turns brown by the afternoon, which is a sugegstion of aging and transitory nature of time.
A three-phase progress bar located in the bottom left of the screen represents the hour, minute, and second using three dynamic bars, the color and opacity of which are changing in real-time.
instead of directly using hour(), minute(), and second() in real time for the main animation (which would move too slowly), it uses: millis() to count milliseconds since the sketch started. A dayLength = 60000 variable makes one “day” 60,000 ms (1 minute) long. This enables the whole day-night cycle to be completed in one minute for aesthetics and control on the timing. t is a 0–1 normalized time ratio that control everrything in transitions.
# Key Functions Used
millis(): Used to animate the time.
map(): Transforms time ratios into transitions in color and position.
sin(), cos(): Determine sun path curvature.
push() / pop(): Keep Transformation Isolated For Each Flower.
hour(), minute(), second(): Make progress bar visible.
The project links emotional narrative and temporal logic in code.
It describes the transient loveliness of life with time based animation and faint colour changes. It synchronizes real time and symbolic time to discuss how digital media present poetic experiences — about emotion, design, and computation. 