# CFGene
Initially, I wanted to play around with generating DNA sequences using a
context-free grammar. It turns out that basic translation can be achieved with
a single pass through a simple grammar. That's boring! 

I decided to visualize the resulting DNA sequence using the p5.js library,
using a simple "walker" model: each base corresponds to a direction, and a single
point is drawn for each base. 

At some point, I also decided that the 'seed' for the grammar should be taken
from regular text, supplied by the user. Since there are about 20 amino acids, the
english alphabet maps pretty closely to the one-letter codes used by IUPAC to
represent the amino acids. The remaining 6 letters map to nonstandard AAs, like
Pyrrolysine, or degenerate representations, like the letter B for either
Aspartic Acid or Asparagine. The space character (" ") contains a somewhat
random assortment of nucleotide groups, purely to balance out the trends
created by common english words (Adenine has a disproportionately high
representation, so the Walker tends to veer off in one direction).
