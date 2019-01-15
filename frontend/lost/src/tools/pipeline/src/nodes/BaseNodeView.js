import './BaseNodeStyle.scss'
import { NodeTemplate } from 'l3p-frontend'


const DEFAULTS = {
	header: {
		icon: undefined,
		title: '',
		colorInvalidated: undefined,	// bootstrap bg-colors
		colorValidated: undefined,		// bootstrap bg-colors
	},
	content: [],
	footer: undefined,
	validated: false,
}
export default class BaseNodeView {
	constructor(params){
		params = Object.assign({}, DEFAULTS, params)
		const { header, footer } = params
		const { icon, title, colorInvalidated, colorValidated } = header

		let { content, validated } = params
		content = Array.isArray(content) ? content : [ content ]
		// validated = validated || true

		// The parent node reference will be added by Graph.js calling BaseNodePresenter.init().
        this.parentNode = undefined

		// REWRITE COLORS TO USE FUNCTIONS ?
		// expose colors for methods
		this.colorInvalidated = colorInvalidated
		this.colorValidated = colorValidated

		// create html
		// could need some cleanup.
		this.html = new NodeTemplate(/*html*/`
			<div class='card pipeline-graph-node'>
				// color depends on validation.
				// icon is optional.
                <div class='card-header' data-ref='header'>
					${icon ? /*html*/`
						<i class='${icon}'></i>
					` : ``}
					<span>${title}</span>
                </div>
				// content derives from objects or html strings.
                <div class='card-body'>
					<div class='card-grid'>
						${content.map(row => {
							if(typeof(row) === 'object'){
								if(row.icon !== undefined){
									return /*html*/`
										<i class='grid-all-columns ${row.icon}'></i>
									`
								}
								if(row.progress !== undefined){
									return /*html*/`
										<div class='progress grid-all-columns' data-ref='progress-bar'>
											<span class='progress-text' data-ref='progress-bar-text'>
												${row.progress ? row.progress : 0}%
											<span>
										</div>
									`
								}
								if(row.attribute !== undefined){
									return /*html*/`
										<div class='attribute'>${row.attribute}</div>
										<div ${row.ref ? `data-ref='${row.ref}'` : ''}>${row.value}</div>
									`
								}
							}
							return row
						}).join('\n')}
					</div>
                </div>
				// footer shows status of running pipeline nodes.
				${footer ? /*html*/`
					<div class='card-footer' data-ref='footer'>
						<div data-ref='status' class='status 
							${ footer.status === 'script_error'   ? 'bg-red'  	: 	'' }
							${ footer.status === 'pending'        ? 'bg-blue'  	: 	'' }
							${ footer.status === 'in_progress'    ? 'bg-orange'	: 	'' }
							${ footer.status === 'finished'       ? 'bg-green' 	: 	'' }
							'>
							<span class='status-text' data-ref='status-text'>${footer.text}</span>
						</div>
					</div>
				` : ``}
            </div>
		`)
		this.setColor(validated)
	}
	updateRefs(refs: any){
		for(const ref in refs){
			this.html.refs[ref] = refs[ref]
		}
	}
	setColor(validated: Boolean){
		if(validated){
			if(this.colorValidated){
				this.html.refs['header'].classList.toggle(`bg-${this.colorInvalidated}`, false)
				this.html.refs['header'].classList.toggle(`bg-${this.colorValidated}`, true)
			}
		} else {
			if(this.colorInvalidated){
				this.html.refs['header'].classList.toggle(`bg-${this.colorValidated}`, false)
				this.html.refs['header'].classList.toggle(`bg-${this.colorInvalidated}`, true)
			}
		}
	}
	updateProgress(progress: Number){
		if(this.html.refs['progress-bar']){
			progress = progress ? progress : 0
			this.html.refs['progress-bar'].style.width = `${progress}%`
			this.html.refs['progress-bar-text'].textContent = `${progress}`
		}
	}
	updateStatus(status: String){
		if(this.html.refs['status']){
			this.html.refs['status'].setAttribute('class', `panel-footer 
				${ status === 'script_error'   ? 'bg-red'      : '' }
				${ status === 'pending'        ? 'bg-blue'     : '' }
				${ status === 'in_progress'    ? 'bg-orange'   : '' }
				${ status === 'finished'       ? 'bg-green'    : '' }
			`)
			this.html.refs['status-text'].textContent = status.replace('_', ' ')
		}
	}
}