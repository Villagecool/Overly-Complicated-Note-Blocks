# Overly Complicated Note Blocks!

**Overly Complicated Note Blocks** is a small addon for *Minecraft Bedrock* that adds new music related blocks to make music with!

## Advanced Note Block
Advanced Note Blocks function similarly to the vanilla counterpart. However, it's **properties** can be adjusted within a GUI!

![Advanced Note Block](/renders/noteblock.gif)

Insturment, Note, and Octave can all be adjusted within the block.

![Advanced Note Block UI](/renders/noteblock-ui.png)

To play a note, simply **interact** with the block.
- To edit properties, **sneak** and **interact** with ***an empty hand***
<sup>These blocks do not work with redstone alone, due to possible complications with music systems</sup>

## Coda
The **Coda** is a block that can be used to play a stack of note blocks.

![Coda](/renders/coda.gif)

On it's own, the Coda can be used to power Advanced Note Block(s) with redstone

<sup>Vanilla Note Blocks cannot be used with the coda</sup>

However, it has other uses among other blocks.

> [!IMPORTANT]
> Coda's need to be DIRECTLY powered with redstone to activate. So some things may not work as expected
> [!TIP]
> For technical users, it is important to note that Coda's will output two block updates when activated.

## Rester
The rester allows for a breif pause of varying length between notes on a Coda stack. Creating subdivisions within a beat.

![Rester](/renders/rester.gif)

All Note Blocks above it will be delayed by the set amount of time.

![Rester GUI](/renders/rester-ui.png)

## Metronome
The Metronome is the most important block for making music sequences.

![Metronome Block](/renders/metronome.gif)

The metronome can be configured to set a BPM for a sequence (Between 60-200 BMP) in 4/4 time.
> [!WARNING]
> BPM runs on in-game-ticks, if there is high lag in the world, then songs will be slowed down.

Once the metronome is activated by Redstone or a player, All lines of adjacent Coda blocks will play to the set BPM.

<sup>Rester Blocks will also be timed correctly<sup>

![Metronome GUI](/renders/metronome-ui.png)

If *sound* is active, the Metronome will make clicks on a beat, just like a real metronome.