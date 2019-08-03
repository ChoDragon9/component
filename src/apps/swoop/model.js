// Request
class Field {
  key = ''
  value = ''
  description = ''
}
class RequestUnit {
  method = 'GET' || 'POST' || 'PUT' || 'DELETE'
  url = 'string'
  params = [Field]
	headers = [Field]
  body = {
    type: 'none' || 'json' || 'text' || 'xml' //|| 'binary',
    data: [Field] // json
  }
}
class Requests {
  requestUnits = [RequestUnit]
}

// Workflow
class Pass {
  pass = true || false
}
class Point extends Pass {
  x = 0
  y = 0
  pass = true || false
}
class Request extends Pass {
	requestUnits = [RequestUnit, RequestUnit]
  result = ['Response']
  pass = true || false
}
class Logic extends Pass {
	logic = input => {}
	result = 'result'
  pass = true || false
}
class Branch extends Pass {
	branch = input => {}
	results = [Request, undefined] // yes or no
  pass = true || false
}
class WorkflowUnit {
  start = Point
  /*
  Flow 컨트롤이 필요함
  - 요소들의 결과는 다음 Flow에게 전달됨
  - 순서 예시
    - Request.create()
      - run RequestUnit
      - set result
      - change pass
    - Logic.create(response)
      - run logic
      - set result
      - change pass
    - Branch.create(result)
      - run branch
      - if yes, run results[0]
      - if no, run results[1]
      - change pass
   */
  flow = [Request, Logic, Branch]
  end = Point
}
class Workflows {
	workflowUnits = [WorkflowUnit]
}
