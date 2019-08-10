class Dice {
  static dices = {
    dF: [-1,0,1]
  }
  
  constructor(arr){
    arr = arr || []
    arr = arr.sort((a,b) => a-b)
    this.array = arr.flat()
    this.object = this.outcomes()
  }
  
  static sides(n){
    if(parseInt(n))
      return new Dice(Helper.range(n))
    else
      return new Dice(Dice.dices['d'+n])
  }
  
  roll(){
    let r = this.array.length
    r = Helper.random(r)
    r = Math.floor
    r = this.array[x]
    return r
  }
  
  chance(cond,value){
    let r = this.array
    r = r.filter(x => 
      eval("x"+cond+value)
    )
    r = r.length
    r = r / this.array.length
    r = r * 100
    return r
  }
  
  mix(op,dice){
    let r = this.array.map(x =>
      dice.array.map(y =>
        eval("x"+op+"y")
      )
    )
    return new Dice(r)
  }
  
  static empty(){
    return new Dice([0])
  }
  
  times(n){
    let dice = this
    let r = 
      Helper.range(n-1)
        .reduce((a,x) =>
          a.mix('+',this)
        ,dice)
    return new Dice(r.array)
  }
  
  again(value,cond="==",add=this){
    value = value || this.array.length
    let r = this.array.map(x => {
      if(eval("x"+cond+value))
        return add.array
          .map(n => n+x)
      else
        return x
    }).flat()
    
    return new Dice(r)
  }
  
  reroll(times,value,cond="==",add=this){
    value = value || this.array.length
    let dice = this
    let r = 
      Helper.range(times)
        .reduce((a,x) => 
          a.again(value*x,cond,add)
        ,dice)
    return r
  }
  
  outcomes(){
    let obj = {}
    this.array.forEach(x =>
      obj[x] = obj[x] + 1 || 1
    )
    return obj
  }
  
  chanceTable(cond,decimal=2){
    let keys = Object.keys(this.object)
    let obj = {}
    keys.forEach(x => 
      obj[x] = 
        this.chance(cond,x)
        
    )
    return obj
  }
}

class Expr {
  constructor(expr){
    this.expr = expr || ""
    this.expr = this.clean()
    this.expr = this.default('d6')
    this.expr = this.tokenize()
    this.expr = this.translate()
    return eval(this.expr)
  }
  
  default(dice){
    let e = 
      this.expr.split("").map((x,i) => {
        if(x == 'd' && 
        this.expr[i+1] == " ")
          return 'd6'
        else
          return x
      }).join("")
     
    return e
  }
  
  clean(){
    let e = this.expr
    e = e.split(" ").join("")
    Helper.math.forEach(x => {
      e = e.split(x)
        .join(" "+x)
    })
    
    return e
  }
  
  tokenize(){
    let e = this.expr
    if(e.length <= 0)
      return []
    e = e.split(' ')
    e = e.map(x => x.split('d'))
    e = e.map(x => {
      let dice = x
      let hasOp = 
        parseInt(dice[0][0])?
        false : 
        dice[0][0] == null?
        false : true
      let op = hasOp ?
        dice[0][0] : '+'
      let qtd = hasOp ?
        dice[0].slice(1) : dice[0] || 1
      let sides = dice[1] || 1
      
      return {
       op: op,
       qtd: qtd,
       sides: sides
      }
    })
    
    return e
  }
  
  translate(){
    let e = this.expr
    e = e.map(x => {
      let className = 'Dice'
      x.sides = parseInt(x.sides) || 
        "'"+x.sides+"'"
      
      let dice = className +
        ".sides("+x.sides+")"
      let times = '.times('+x.qtd+')'
      
      let mix = ".mix('"+x.op+"',"+
        dice+times+')'
      return mix
    }).join('')
    
    return 'new Dice([0])' + e
  }
}