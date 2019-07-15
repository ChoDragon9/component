import {component} from './core/component'
import {Sketchbook} from './sketchbook/Sketchbook'
import {createGeometry} from "./sketchbook/mutation";
import {clear, createNewKey} from "./sketchbook/helper";

export const createApp = component({
  template () {
    return `<div class="container">
      <div class="panel">
        <button class="rect">사각형 추가</button>
        <button class="triangle">삼각형 추가</button>
        <button class="clear">브라우저 저장소 모두 삭제</button>
        <ul>
          <li>모양 추가 후 드래그 가능</li>
          <li>라인 클릭 시 포인트 추가</li>        
        </ul>
      </div>
      <sketchbook></sketchbook>
    </div>`
  },
  events () {
    return [
	    ['button.rect', 'onclick', 'addRect'],
	    ['button.triangle', 'onclick', 'addTriangle'],
	    ['button.clear', 'onclick', 'clearAll']
    ]
  },
  methods () {
    return {
	    addRect () {
		    createGeometry(
			    createNewKey(),
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
			    createNewKey(),
			    [
				    [150, 100],
				    [100, 200],
				    [200, 200]
			    ]
		    )
	    },
	    clearAll () {
		    clear()
		    location.reload()
	    }
    }
  },
  components () {
    return [
      ['sketchbook', Sketchbook]
    ]
  }
})