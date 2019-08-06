import {component} from "../../core/component";
import {RequestUnitComponent} from "./RequestUnit";
import {WorkflowComponent} from "./Workflow";

export const AppComponent = component({
	template () {
		return `<div>
      <h1>Home</h1>
      <request-unit></request-unit>
      <workflow></workflow>
    </div>`
	},
	components () {
		return [
			['request-unit', RequestUnitComponent],
			['workflow', WorkflowComponent],
		]
	}
})