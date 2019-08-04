import {component} from "../../core/component";
import {RequestUnitComponent} from "./RequestUnit";

export const AppComponent = component({
	template () {
		return `<div>
      <h1>Home</h1>
      <request-unit></request-unit>
    </div>`
	},
	components () {
		return [
			['request-unit', RequestUnitComponent]
		]
	}
})