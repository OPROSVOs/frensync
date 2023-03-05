# Colors Overview
The sync works in three modes: 
 - Plain text
 - Simple color based on the theme (hue & amount)
 - Complex colors based on a format string

# Simple colors
## Hue
This is a number from 0 to 360 where 0 means "off" and 1 onwards cycles through the different hues.
## Amount
This is the amount of color used from 0 which is off to 50 which is full color.
This scheme is used so users with dark and light mode can have colors other than full saturation.
A user who wants a black or white name gets the brightness inverted depending on the theme to gurantee a good contrast.

# Complex colors
## Format
``` 
<cmd><parameter> with zero to many | as seperator and <another cmd><parameter>
parameter for linear gradient = <command letter A-Ja-j><angle 0 - 360 > with one or many <color param> seperated by ,
hex color = <hex #RGB or #RRGGBB or #RRGGBBAA> with characters from 0-9 and A-Fa-f
color param = <hex color> optionally followed by [0-9]+px or [0-9]+% zero to two times
parameter for text shadow = <command letter K-Nk-n>[<x offset ||0>],[<y offset ||0>], [<blur ||5>], <hex color> 
```

Examples: 

``` 
a90,#F00,#0F0|A90,#800,#080
translates to 
dark:  linear-gradient(90deg, #FF0000, #00FF00)
light: linear-gradient(90deg, #880000, #008800)
means linear gradient on name from red to green in dark mode and dark red to dark green in light mode

l2,2,10,#FF0|L,,,#008
translates to
dark:  text-shadow(2px, 2px, 10px, #FFFF00)
light: text-shadow(0px, 0px,  5px, #000088)
means yellow text shadow with 2px offset and 10px blur in dark mode and defaults with dark blue in light mode

l2,2,10,#FFFF00AA|L,,,#000088AA
translates to
dark:  text-shadow(2px, 2px, 10px, #FFFF00AA)
light: text-shadow(0px, 0px,  5px, #000088AA)
Which is slightly transparent to the background. Can be used to fade gradients.

a10,#f00,#f60,#ff0,#0f0,#00f,#f0d,#f08|A10,#f00,#f60,#ff0,#0f0,#00f,#f0d,#f08
translates to
dark:  linear-gradient(10deg, red, orange, yellow, green, blue, pink, violet)
light: linear-gradient(10deg, red, orange, yellow, green, blue, pink, violet)
which will show the whole color pallete in a 10degree angle over the name (badly visible in light mode)

a10,#f00,#f00 49%,#ff0 51%,#ff0|A10,#f00,#f00 49%,#ff0 51%,#ff0
translates to
dark:  linear-gradient(10deg, red, red 49%, yellow 51%, yellow)
light: linear-gradient(10deg, red, red 49%, yellow 51%, yellow)
That way hard stops can be used instead of gradients. pixel and em values also work instead of percent.

b45,#f00 3px,#f80 3px|B45,#800 3px,#840 3px
Will cause the name to have a striped red orange pattern every 3px in an 45° angle

```
The cmd is one letter in upper case for light theme only and lower case for dark theme only
When using these the user must choose color codes that are readable in both cases.

These are the cmd letter mappings:
```
A || a => linear gradient on name
B || b => as A but repeating

C || c => linear gradient on trip
D || d => as C but repeating

E || e => linear gradient over name + trip together (use instead of A-D)
F || f => same as E but repeating

G || g => linear gradient over the subject in front
H || h => same as G but repeating

I || i => linear gradient over the whole top text / info 
J || j => same as I but repeating

K || k => add text shadow to the name
L || l => add text shadow to the trip
M || m => add text shadow to the subject
N || n => add text shadow to the whole top text / info 

```
If the top text is too much, i'll remove it.
Please use common sense and check both styles (bottom right) like Yotsuba and Tomorrow, reload after change.
 
