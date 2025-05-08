import * as SERVER from '@minecraft/server';
import * as UI from '@minecraft/server-ui';
import { vec3toString, hexToRgb, setPermutation, limitTo, getRandomFloat } from "./utils.js"
import "./redstone_test.js"

const DEBUG = false

const colors = ["#77D700", "#95C000", "#B2A500", "#CC8600", "#E26500", "#F34100", "#FC1E00", "#FE000F", "#F70033", "#E8005A", "#CF0083", "#AE00A9", "#8600CC", "#8600CC", "#5B00E7", "#2D00F9", "#020AFE", "#0037F6", "#0068E0", "#009ABC", "#00C68D", "#00E958", "#00FC21", "#1FFC00", "#59E800", "#94C100"]
const insts = [ "harp", "bass", "bells", "bass_drum", "flute",  "hi-hat", "chimes", "guitar", "xylophone", "vibraphone", "cow_bell", "didgeridoo", "synthesizer", "banjo", "electric_piano"]
const noteNames = ["F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B", "C", "C#/Db", "D", "D#/Eb", "E", "F"]

SERVER.world.beforeEvents.worldInitialize.subscribe(initEvent => {
    initEvent.blockComponentRegistry.registerCustomComponent('vc:advanced_note_block', {
        beforeOnPlayerPlace: e=> {
                SERVER.system.run(()=>{
            const popUp = new UI.ModalFormData()
            .title("%advanced_note_block.title")
            .dropdown('%advanced_note_block.inst', arrayToTitleCase(insts), 0)
            .dropdown('%advanced_note_block.note', noteNames, 4)
            .slider('%advanced_note_block.octave', -2, 2, 1, 0)
            //.slider('Delay (In 16th notes)', 0, 4, 1, 0)
            .show(e.player).then((r) => {
                    if (DEBUG) console.warn(`${insts[r.formValues[0]]} | ${noteNames[r.formValues[1]]} | ${r.formValues[2]} | ${r.formValues[3]}`)
                    setPermutation(e.block, 'vc:inst', insts[r.formValues[0]])
                    setPermutation(e.block, 'vc:note', noteNames[r.formValues[1]])
                    setPermutation(e.block, 'vc:octave', r.formValues[2])
                    //setPermutation(e.block, 'vc:delay', r.formValues[3])
                    noteTime(e.block)
                })
        
            }).catch((e) => {
                console.error(e, e.stack);
            })
        },
        onPlayerInteract: e => {
            if (e.player.isSneaking) {
                const popUp = new UI.ModalFormData()
                .title("%advanced_note_block.title")
                .dropdown('%advanced_note_block.inst', arrayToTitleCase(insts), insts.indexOf(e.block.permutation.getState('vc:inst')))
                .dropdown('%advanced_note_block.note', noteNames, noteNames.indexOf(e.block.permutation.getState('vc:note')))
                .slider('%advanced_note_block.octave', -2, 2, 1, e.block.permutation.getState('vc:octave'))
                //.slider('Delay (In 16th notes)', 0, 4, 1, e.block.permutation.getState('vc:delay'))
                .show(e.player).then((r) => {
                    if (r.canceled) return;
                    if (DEBUG) console.warn(`${insts[r.formValues[0]]} | ${noteNames[r.formValues[1]]} | ${r.formValues[2]} | ${r.formValues[3]}`)
                    setPermutation(e.block, 'vc:inst', insts[r.formValues[0]])
                    setPermutation(e.block, 'vc:note', noteNames[r.formValues[1]])
                    setPermutation(e.block, 'vc:octave', r.formValues[2])
                    //setPermutation(e.block, 'vc:delay', r.formValues[3])
                    noteTime(e.block)
            
                }).catch((e) => {
                    console.error(e, e.stack);
                })
            }
            else noteTime(e.block)
        }
    });
    
    initEvent.blockComponentRegistry.registerCustomComponent('vc:metronome', {
        beforeOnPlayerPlace: e=> {
            SERVER.system.run(()=>{
            const popUp = new UI.ModalFormData()
            .title("%metronome.title")
            .textField('%metronome.bpm\n\n  =', '%metronome.subbpm')
            .toggle('%metronome.sound', true)
            .show(e.player).then((r) => {
                    
                    if (r.canceled || String(Number(r.formValues[0])) != r.formValues[0]) {
                        e.dimension.runCommand(`setblock ${vec3toString(e.block.location)} air destroy`)
                        return;
                    };

                    const tens = limitTo(Number(r.formValues[0].slice(0, -1)), 6, 20)
                    const ones = Number(r.formValues[0].slice(-1))

                    if (DEBUG) console.warn(`${r.formValues[0]} | ${tens} | ${ones}`)
                    setPermutation(e.block, 'vc:bpm_tens', tens)
                    setPermutation(e.block, 'vc:bpm_ones', ones)
                    setPermutation(e.block, 'vc:sound', r.formValues[1])
                })
        
            }).catch((e) => {
                console.error(e, e.stack);
            })
        },
        onPlayerInteract: e => {
            if (e.player.isSneaking) {
                SERVER.system.run(()=>{
                const popUp = new UI.ModalFormData()
                .title("%metronome.title")
                .textField('%metronome.bpm\n\n  =', '%metronome.subbpm', `${e.block.permutation.getState('vc:bpm_tens')}${e.block.permutation.getState('vc:bpm_ones')}`)
                .toggle('%metronome.sound', e.block.permutation.getState('vc:sound'))
                .show(e.player).then((r) => {
                        if (r.canceled) return;
                        if (String(Number(r.formValues[0])) != r.formValues[0]) return;
                        const tens = limitTo(Number(r.formValues[0].slice(0, -1)), 6, 20)
                        const ones = Number(r.formValues[0].slice(-1))
    
                        if (DEBUG) console.warn(`${r.formValues[0]} | ${tens} | ${ones}`)
                        setPermutation(e.block, 'vc:bpm_tens', tens)
                        setPermutation(e.block, 'vc:bpm_ones', ones)
                        setPermutation(e.block, 'vc:sound', r.formValues[1])
                    })
            
                }).catch((e) => {
                    console.error(e, e.stack);
                })
            }
            else {
                findScores(e.block)
            }
        }
    });
    initEvent.blockComponentRegistry.registerCustomComponent('vc:coda', {
        onPlayerInteract: e => {
            doTheCoda(e.block, true)
        }
    });
    
    initEvent.blockComponentRegistry.registerCustomComponent('vc:rester', {
        beforeOnPlayerPlace: e=> {
            SERVER.system.run(()=>{
            const popUp = new UI.ModalFormData()
            .title("%rester.title")
            .slider("%rester.beats", 0, 3, 1, 0)
            .show(e.player).then((r) => {
                    
                    if (r.canceled || String(Number(r.formValues[0])) != r.formValues[0]) {
                        e.dimension.runCommand(`setblock ${vec3toString(e.block.location)} air destroy`)
                        return;
                    };
                    setPermutation(e.block, 'vc:beats', r.formValues[0])
                })
        
            }).catch((e) => {
                console.error(e, e.stack);
            })
        },
        onPlayerInteract: e => {
            SERVER.system.run(()=>{
            const popUp = new UI.ModalFormData()
            .title("%rester.title")
            .slider("%rester.beats", 0, 3, 1, e.block.permutation.getState('vc:beats'))
            .show(e.player).then((r) => {
                    
                    if (r.canceled || String(Number(r.formValues[0])) != r.formValues[0]) return;
                    setPermutation(e.block, 'vc:beats', r.formValues[0])
                })
        
            }).catch((e) => {
                console.error(e, e.stack);
            })
        }
    });
})
export function noteTime(block) {
    const sound = 'note.' + block.permutation.getState('vc:inst').toLocaleLowerCase().replace(' ', '_')
        .replace('vibraphone', 'iron_xylophone')
        .replace('synthesizer', 'bit')
        .replace('electric_piano', 'pling')
        .replace('chimes', 'chime')
        .replace('bells', 'bell')
        .replace('bass_drum', 'bd')
        .replace('hi-hat', 'hat')

    const pitch = (2 ** ((getUseCount(block.permutation.getState('vc:note'), block.permutation.getState('vc:octave')) - 12) / 12))

    block.dimension.playSound(sound, block.center(), { pitch: pitch })

    const lecolor = colors[Math.floor(getUseCount(block.permutation.getState('vc:note'), 0)*1.9)];

    const molang = new SERVER.MolangVariableMap();
    molang.setColorRGB('variable.note_color', {
        red: hexToRgb(lecolor).r,
        green: hexToRgb(lecolor).g,
        blue: hexToRgb(lecolor).b
    });
    block.dimension.spawnParticle('minecraft:note_particle', { x: block.location.x + 0.5, y: block.location.y + 1.2, z: block.location.z + 0.5 }, molang);
    //block.dimension.spawnParticle('vc:note_burst_particle', block.bottomCenter(), molang);
    if (DEBUG) {
        console.log(block.permutation.getState('vc:inst'))
        console.log(`${sound}\n${pitch}`)
        console.log(lecolor)
        console.log(JSON.stringify(hexToRgb(lecolor)))
    }
}
export function findScores(block) {
    console.warn(1)
    let beat = -1;
    const tickDelay = bpmToTicks(Number(`${block.permutation.getState('vc:bpm_tens')}${block.permutation.getState('vc:bpm_ones')}` ));

    const directions = [
        { name: 'north', get: (i) => block.north(i) },
        { name: 'east',  get: (i) => block.east(i) },
        { name: 'south', get: (i) => block.south(i) },
        { name: 'west',  get: (i) => block.west(i) }
    ];
    
    //thanks chattymcchatface gpt
    let longestDir = null;
    let longestLength = 0;
    for (const dir of directions) {
        let length = 0;
        for (let i = 1; i < 100; i++) {
            if (dir.get(i).typeId !== 'vc:coda') break;
            length++;
        }
        if (length > longestLength) { longestLength = length; longestDir = dir; }
    }

    for (const dir of directions) {
        if (dir.get(1).typeId !== 'vc:coda') continue;
        for (let i = 1; i <= longestLength; i++) {
            const b = dir.get(i);
            
            if (b.typeId !== 'vc:coda') break;

            SERVER.system.runTimeout(() => { 
                doTheCoda(b, false, tickDelay); 
                if (dir === longestDir) { beat++; switchMet(block, beat); } 
            }, tickDelay * (i-1));
        }
    }
}

function switchMet(block, beat) {
    if (block.permutation.getState('vc:sound')) block.dimension.playSound('note.hat', block.center(), {pitch: (beat % 4 == 0 ? 1 : 0.5)})
    var side = (block.permutation.getState('vc:side') == 'right') ? 'left' : 'right'
    setPermutation(block, 'vc:side', 'mid')
    SERVER.system.runTimeout(() => { setPermutation(block, 'vc:side', side) }, 1)
}
export function doTheCoda(block, sound, tickDelay) {
    setPermutation(block, 'vc:lit', true)
    SERVER.system.runTimeout(() => { setPermutation(block, 'vc:lit', false) }, 5)
    if (sound && block.above(1).typeId != 'vc:advanced_note_block' && block.above(1).typeId != 'vc:rester') {block.dimension.playSound('note.bd', block.center(), {pitch: getRandomFloat(0.8,1.2)})}
    else {
        var delay = 0;
        for (let i = 1; i < 25; i++) {
            if (block.above(i).typeId == 'vc:rester') { delay += block.above(i).permutation.getState('vc:beats'); continue; }
            if (block.above(i).typeId != 'vc:advanced_note_block') break;
            SERVER.system.runTimeout(() => { noteTime(block.above(i)) }, (!tickDelay || tickDelay <= 0 ? 1 : tickDelay/4)*delay)
        }
    }
}
function getUseCount(pitch, octave) {
    const pitchOffsets = {
        "F#/Gb": 0,
        "G": 1,
        "G#/Ab": 2,
        "A": 3,
        "A#/Bb": 4,
        "B": 5,
        "C": 6,
        "C#/Db": 7,
        "D": 8,
        "D#/Eb": 9,
        "E": 10,
        "F": 11
    };

    return (octave * 12) + pitchOffsets[pitch];
}
function bpmToTicks(bpm) {
    return (60 / bpm) * 20;
  }
function arrayToTitleCase(arr) {
    return arr.map(str => {
      return str.replace('_', ' ').toLowerCase().split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }).join(' ');
    });
  }