import BaseNodeModel from '../../BaseNodeModel'


export default class LoopStartModel extends BaseNodeModel {
    constructor(params) {
		super(params)
    }
	getOutput(){
		const { peN, peOut, loop } = this
		const { max_iteration: maxIteration, peJumpId } = loop
		return {
			peN,
			peOut,
			loop: {
				maxIteration,
				peJumpId,	
			},
		}
	}
}