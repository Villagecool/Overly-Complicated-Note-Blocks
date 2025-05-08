import * as SERVER from '@minecraft/server';
import * as UI from '@minecraft/server-ui';
import { vec3toString, setPermutation } from './utils.js';
import { noteTime, doTheCoda, findScores } from "./main.js"

SERVER.world.beforeEvents.worldInitialize.subscribe(initEvent => {
	initEvent.blockComponentRegistry.registerCustomComponent('vc:redstone', {
		onTick: e => {
			let wasSucessful = e.block.getRedstonePower() > 0 ? true : checkRedstone(e.block);
			//const wasSucessful = false;

			if (e.block.typeId == 'vc:advanced_note_block') { // i split it up cus i think it optimizes the script a bit
				if (wasSucessful && e.block.permutation.getState("vc:powered") == false) {
					noteTime(e.block);
				}
			} else if (e.block.typeId == 'vc:coda') { // i split it up cus i think it optimizes the script a bit
				wasSucessful = e.block.getRedstonePower() > 0;
				if (e.block.getRedstonePower() > 0 && e.block.permutation.getState("vc:powered") == false) {
					doTheCoda(e.block);
				}
			} else if (e.block.typeId == 'vc:metronome') { // i split it up cus i think it optimizes the script a bit
				if (wasSucessful && e.block.permutation.getState("vc:powered") == false) {
					findScores(e.block);
				}
			}
			try {
				setPermutation(e.block, 'vc:powered', wasSucessful)
			} catch (e) { }
}
	});
});

/**
 * 
 * @param {SERVER.Block} block 
 * @returns {Boolean}
 */
function checkRedstone(block) {
	if (block.getRedstonePower() > 0) return true; //thanks chatgpt for optimising this ig? (it did not help in the slightest)
	const directions = [block.north(1), block.north(-1), block.east(1), block.east(-1), block.above(1), block.above(-1)];
	return directions.some(adjBlock => adjBlock?.getRedstonePower() > 0);
}
// See more at https://wiki.bedrock.dev/scripting/script-server.html
