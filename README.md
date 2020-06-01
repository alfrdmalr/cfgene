# CFGene
Try it [here!](https://alfrdmalr.github.io/cfgene)

If you don't want to read the following ~manifesto~ background section,
you can skip directly to the usage/settings details [here](#usage).

## Background
Initially, I wanted to play around with generating DNA sequences using a
context-free grammar. It turns out that basic translation can be achieved with
a single pass through a simple grammar. That's boring! 

I decided to visualize the resulting DNA sequence using the [p5.js library](https://p5js.org/),
using a simple "walker" model: each base corresponds to a direction, and a single
point is drawn for each base. Eventually I switched to using vectors and lines
to allow for more interesting visualization options, but the basic point method remains
as the default.

At some point, it seemed reasonable that the 'seed' for the grammar should be taken
from regular text, supplied by the user. Since there are about 20 amino acids, the
english alphabet maps pretty closely to the one-letter codes used by IUPAC to
represent the amino acids.

I've mapped the remaining 6 letters map to nonstandard AAs, like
Pyrrolysine, or degenerate representations, like the letter B for either
Aspartic Acid or Asparagine. The space character (" ") contains a somewhat
random assortment of nucleotide groups, purely to balance out the trends
created by common english words (Adenine has a disproportionately high
representation, so the Walker tends to veer off in one direction).

The full list of extended one-letter codes was taken from the ["Amino Acid" section of
the DDBJ's website](https://www.ddbj.nig.ac.jp/ddbj/code-e.html#amino).

## Usage
Just type something in the box at the top of the screen!

## Options
There are several options for changing how the internal DNA sequence is visualized,
as well as the option to change the rules for generating that sequence itself. 

To access these options, click the (?) button in the lower left corner.

## Visualization
Currently, there are three visualization options at play: [color mode](#color-mode), 
[speed](#speed), and [zoom](#zoom).

### Color Mode
In a nutshell, the color mode defines how the color changes as the sequence is drawn.

Mode | Description
--- | ---
Rainbow\* | The sequence will be drawn as a rainbow, spanning from the first point drawn to the last point drawn. This effect becomes more noticeable as the length of the sequence increases.
Cycle | Each new base is drawn with the 'next' color in the rainbow, starting back at red once it reaches violet at the end.
Codon | Each codon is colored differently, but the bases associated with that codon will have onsistent coloring. Effectively, each letter in the input is represented by a different color.
Base | Each *type* of base is colored differently. Since the type of base is also used to determine hat direction is drawn, this mode represents different directions as different colors.
  
\*default mode
### Speed
Speed refers to how far (or how 'fast', hence speed) the walker should move in a given direction. The default value of 1
results in points which are immediately touching each other. At higher values, the points are connected by lines to preserve
the continuity of the visualization.

### Zoom
Zoom refers to the scale of the drawing. At higher values, the points and lines will appear larger, and at smaller values they will appear smaller.

## Grammar
The grammar is made up of rules (sometimes called production rules) 
for generating the underlying DNA sequence from the user input (the 'seed' text).
Those rules are stored in a JSON object that's wrapped in some other logic to make working
with the grammar easier. For now, that JSON object can be manipulated directly and changes saved with the "update grammar"
button from the menu. 

In JSON, rules look like this:
```
{
...
"<SYMBOL1>": [ "EXPANSION1", "EXPANSION2", ...],
...
}
```
where a SYMBOL is some capital letter (wrapped in angled brackets) and an EXPANSION is a string, 
 representing either another symbol (or set of symbols!) or a terminal — a non-symbol string. Expansion 
  occurs by randomly selecting one of the expansions provided, and continues until a terminal is reached.

