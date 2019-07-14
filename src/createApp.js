import {component} from './core/component'
import {Sketchbook} from './sketchbook/Sketchbook'
import {createGeometry} from "./sketchbook/mutation";

const rand = () => {
	return parseInt(Math.random() * 1000000)
}

export const createApp = component({
  template () {
    return `<div class="container">
      <sketchbook></sketchbook>
      <div class="panel">
        <button class="rect">사각형 추가</button>
        <button class="triangle">삼각형 추가</button>
        <ul>
          <li>모양 추가 후 드래그 가능</li>
          <li>라인 클릭 시 포인트 추가</li>        
        </ul>
      </div>
    </div>`
  },
  events () {
    return [
	    ['button.rect', 'onclick', 'addRect'],
      ['button.triangle', 'onclick', 'addTriangle']
    ]
  },
  methods () {
    return {
	    addRect () {
		    createGeometry(
			    `coordinate${rand()}`,
			    [
				    [100, 100],
				    [100, 200],
				    [200, 200],
				    [200, 100]
			    ]
		    )
	    },
	    addTriangle () {
		    createGeometry(
			    `coordinate${rand()}`,
			    [
				    [150, 100],
				    [100, 200],
				    [200, 200]
			    ]
		    )
	    }
    }
  },
  components () {
    return [
      ['sketchbook', Sketchbook]
    ]
  }
})