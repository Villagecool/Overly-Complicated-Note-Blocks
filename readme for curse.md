# Overly Complicated Note Blocks!

**Overly Complicated Note Blocks** is a small addon for *Minecraft Bedrock* that adds new music related blocks to make music with!

## Advanced Note Block
Advanced Note Blocks function similarly to the vanilla counterpart. However, it's **properties** can be adjusted within a GUI!<br>

![Advanced Note Block](https://raw.githubusercontent.com/Villagecool/Overly-Complicated-Note-Blocks/refs/heads/main/renders/noteblock.gif)<br>

Insturment, Note, and Octave can all be adjusted within the block.<br>

![Advanced Note Block UI](https://raw.githubusercontent.com/Villagecool/Overly-Complicated-Note-Blocks/refs/heads/main/renders/noteblock-ui.png)<br>

To play a note, simply **interact** with the block.
- To edit properties, **sneak** and **interact** with ***an empty hand***

<sup>These blocks do not work with redstone alone, due to possible complications with music systems</sup>

## Coda
The **Coda** is a block that can be used to play a stack of note blocks.<br>

![Coda](https://raw.githubusercontent.com/Villagecool/Overly-Complicated-Note-Blocks/refs/heads/main/renders/coda.gif)<br>

On it's own, the Coda can be used to power Advanced Note Block(s) with redstone

<sup>Vanilla Note Blocks cannot be used with the coda</sup>

However, it has other uses among other blocks.

<span style="color:#843FA1;"><b>💬 IMPORTANT</b><br>
Coda's need to be DIRECTLY powered with redstone to activate. So some things may not work as expected</span><br>

<span style="color:#3598DB;"> <b>💡 TIP</b>
<br>For technical users, it is important to note that Coda's will output two block updates when activated.</span><br>

## Rester
The rester allows for a breif pause of varying length between notes on a Coda stack. Creating subdivisions within a beat.<br>

![Rester](https://raw.githubusercontent.com/Villagecool/Overly-Complicated-Note-Blocks/refs/heads/main/renders/rester.gif)<br>

All Note Blocks above it will be delayed by the set amount of time.<br>

![Rester GUI](https://raw.githubusercontent.com/Villagecool/Overly-Complicated-Note-Blocks/refs/heads/main/renders/rester-ui.png)<br>

## Metronome
The Metronome is the most important block for making music sequences.<br>

![Metronome Block](https://raw.githubusercontent.com/Villagecool/Overly-Complicated-Note-Blocks/refs/heads/main/renders/metronome.gif)<br>

The metronome can be configured to set a BPM for a sequence (Between 60-200 BMP) in 4/4 time.

<span style="color:#E67E23;"><b>⚠️ WARNING</b><br>BPM runs on in-game-ticks, if there is high lag in the world, then songs will be slowed down.</span><br>

Once the metronome is activated by Redstone or a player, All lines of adjacent Coda blocks will play to the set BPM.

<sup>Rester Blocks will also be timed correctly<sup><br>

![Metronome GUI](https://raw.githubusercontent.com/Villagecool/Overly-Complicated-Note-Blocks/refs/heads/main/renders/metronome-ui.png)<br>

If *sound* is active, the Metronome will make clicks on a beat, just like a real metronome.
