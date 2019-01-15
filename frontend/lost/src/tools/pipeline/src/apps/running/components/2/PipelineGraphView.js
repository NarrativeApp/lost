import { WizardTabView } from 'l3p-frontend'

import './PipelineGraph.scss'


class PipelineGraphTab extends WizardTabView {
	constructor(){
		super({
			title: 'Fill out Elements',
			icon: 'fa fa-pencil',
			content: /*html*/`
				// update indicator.
				<div class='update-indicator'>
					<label data-ref='update-label'>update</label>
				</div>

				// toolbar (customized bootstrap flexbox).
				<div class='toolbar'>
					<div class='btn-group toolbar'>
						<button class='btn btn-default' data-ref='btn-toggle-infobox'>
							<i class='fa fa-toggle-on' data-ref='btn-toggle-infobox-icon'></i>
							<span>Toggle Infobox<span>
						</button>
						<button class='btn btn-default' data-ref='btn-delete-pipeline'>
							<i class='fa fa-trash'></i>
							<span>Delete Pipeline<span>
						</button>
						<button class='btn btn-default' data-ref='btn-download-logfile'>
							<i class='fa fa-download'></i>
							<span>Download Logfile<span>
						</button>
						<button class='btn btn-default' data-ref='btn-pause-pipe'>
							<i class='fa fa-pause'></i>
							<span>Pause Pipeline<span>
						</button>
						<button class='btn btn-default' data-ref='btn-play-pipe'>
							<i class='fa fa-play'></i>
							<span>Continue Pipeline<span>
						</button>
					</div>
				</div>

				// graph container.
				<div data-ref='dagre'></div>
			`,
		})
	}
	togglePlayPause({ running }){
		if(running){
			// enable pause button.
			this.html.refs['btn-pause-pipe'].classList.toggle('disabled', false)
			// disable play button.
			this.html.refs['btn-play-pipe'].classList.toggle('disabled', true)
		} else {
			// enable play button.
			this.html.refs['btn-play-pipe'].classList.toggle('disabled', false)
			// disable pause button.
			this.html.refs['btn-pause-pipe'].classList.toggle('disabled', true)
		}
	}
}
export default new PipelineGraphTab()