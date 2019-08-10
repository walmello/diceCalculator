const method = action => arg => item =>
  item[action](arg)
  
const prop = prop => item =>
  item[prop]
  
const length = prop('length')
  
const trace = content => {
  alert(content)
  return content
}

const jsonTrace = content => {
  alert(JSON.stringify(content))
  return content
}

const call = action => self => {
  action
  return self
}
  
const operate = n1 => signal => n2 =>
  eval("n1"+signal+"n2")

const slice = method('slice')
const nth = n => arr => arr[n]

const head = arr => nth(0)(arr)
const tail = slice(1)
const last = arr => nth(length(arr))

const map = method('map')
const filter = method('filter')
const reduce = f => (...args) => init =>
  method('reduce')(f)([init,...args])
  
const ifElse = cond => tru => fals =>
  cond ? tru : fals
  
const includes = method('includes')
  
const pipe = (...args) =>
  reduce((a,x) => x(a))
  (...args)
  
const replace = t1 => t2 =>
  pipe(
    method('split')(t1),
    method('join')(t2)
  )

const split = method('split')
const join = method('join')

const flat = method('flat')()
  
const repeat = times => element =>
  method('fill')(element)
  (Array(times))

const timesDo = action => times => el =>
  pipe(...repeat(times)(action))(el)

const range = start => end =>
  map((x,i) => x+i)
  (repeat(end)(start))

const random = n =>
  (n * Math.random())
  
const isEmpty = method('isEmpty')

const concat = method('concat')