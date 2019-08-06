import {component} from '../../core/component'
import {Sketchbook} from './Workflow/Sketchbook'
import {createGeometry} from "./Workflow/store/mutation";
import {clear, createNewKey} from "./Workflow/helper";

export const WorkflowComponent = component({
  template () {
    return `<div>
			<h2>Workflow</h2>
      <div class="panel">
        <button class="rect">사각형 추가</button>
        <button class="triangle">삼각형 추가</button>
        <button class="clear">브라우저 저장소 모두 삭제</button>
        <ul class="guide">
          <li>모양 추가 후 드래그 가능</li>
          <li>라인 클릭 시 포인트 추가</li>
          <li>배경 클릭 4번으로 사각형 추가</li>
          <li>배경 클릭으로 사각형 추가시, ESC로 생성 취소</li>        
        </ul>
      </div>
      <sketchbook></sketchbook>
    </div>`
  },
	components () {
		return [
			['sketchbook', Sketchbook]
		]
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
  }
})