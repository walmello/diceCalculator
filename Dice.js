class Dice {
  constructor(dice){
    this.array = dice
  }
  
  roll(){
    let index = 
      Math.floor(
        Math.random() * 
        this.array.length
      )
    return this.array[index]
  }
  
  chance(condition,value){
    let dice = this.array
      .filter(x =>
        eval("x"+condition+value)
      ).length / this.array.length
      
    return dice * 100
  }
  
  static sides(num){
    return new Dice(
      Array(num)
        .fill(0)
        .map((x,i) => i + 1)
    )
  }
  
  static treatExpr(string){
    let math = '+-*/%'.split("")
    string = string
    .split(" ")
    .join("")
    
    string = string
    .split("").map(s => {
    if(math.indexOf(s) != -1){
    return " "+s
    }
    return s
    }
    ).join("").split(" ")
    
    return string
  }
  
  static exprDice(token){
    let num = token.split('d')[0]
    let dice = token.split('d')[1]
    let tail = token.slice(1)
    let inside = token.slice(
      1,token.length
    )
    let tailTl = tail.slice(1)
    let pool = ''
    
    if(num != ''){
      pool = '.pool('+num+')'
    }
  
    if(parseInt(dice)){
      return 'Dice.sides('+
      dice+')'+pool
    }
    return 'new Dice('+
    'Dices.'+dice+')'+pool
  }
  
  static exprMath(token){
    let operator = token[0]
    let operand = token.slice(1)
    
    alert(operator)
    
    
    if(Dice
      .exprType(operand) == 'dice'){
      return 'merge('+
        Dice.exprDice(operand)
      +','+ "'"+operator+"'"+')'
    }
  
    return "operate('"+
      operator+"',"+
      operand+")"
  }
  
  static exprType(token){
    let math = '+-*/%'.split("")
    let head = token[0]
  
    if(math.indexOf(head) != -1){
      return 'number'
    }
  
    if(token.includes("d")){
      return 'dice'
    }
  }
  
  static expr(string){
    let math = '+-*/%'.split("")
    string = Dice.treatExpr(string)
  
    return string
      .map(x => {
        switch(Dice.exprType(x)){
          case 'dice':
            return Dice.exprDice(x)
          case 'number':
            return Dice.exprMath(x)
          default:
            return "new Dice(["+x+"])"
        }
      }).join('.')
  }
  
  operate(operator,n){
    if(typeof n == 'string'){
      n = '"'+n+'"'
    }
  
    return new Dice(
      this.array.map(x => 
      eval("x"+operator+n))
    )
  }
  
  merge(dice, operator='+'){
    return new Dice(
      this.array.map(x => 
        dice.array.map(y =>
          eval("x"+operator+"y")
        ).flat()
      ).flat()
    )
  }
  
  pool(quantity){
    let result = new Dice(this.array)
    
    for(let i = 1;i < quantity;i++){
      result = result.merge(this)
    }
  
    return result
  }
  
  toString(){
    return this.array.toString()
  }
}

const Dices = {
  F: [-1,0,1]
}

/*
  d = d || []
  let select = cond => val => 
    d.filter(x => 
      eval("x"+cond+val)
    )

  let op = s => n => Dice(
    d.map(x =>
      eval("x"+s+n)
    )
  )
  
  let pool = v => Dice(
    v.map(n =>
      op("+")(n).array
    ).flat()
  )
  
  let reroll = v => cond =>
    n => vl => Dice(
      v.map(x =>
        eval("x"+cond+n) ?
          op("+")(vl).array :
        x 
      ).flat()
  )    

  return {
    array: d,
    prob: cond => val =>
      select(cond)(val).length /
      d.length * 100,
    op: op,
    pool: n => Dice(Array(n)
      .fill(d).reduce((acc,nxt) =>
        pool(acc).array
      )
    ),
    reroll: opt => {
      let t = opt.limit || 1
      let n = opt.at
      let vl = opt.val || n
      let cond = opt.cond || "=="
    
      let result = Dice(d)
      Range(n)(t)
        .forEach((i,j) => 
          result = reroll
            (result.array)
            (cond)(i)(vl+j)
        )
      
      return result
    },
    addDice: dice => Dice(
      [...d,dice].flat()
    ),
    object: f => {
      let result = {}
      d.forEach(x =>
        result[x] = result[x] + 1 || 1
      )
      return result
    },
    outcomes: cond => {
      let result = Dice(d).object()
      Object.keys(result)
        .forEach(x =>
          result[x] = Dice(d)
            .prob(cond)(x)
        )
      
      return result
    },
    compare: cond => (min,max) => {
      let aux = Dice(d).outcomes(cond)
      result = Object
        .keys(aux)
        .filter(x => 
          aux[x] <= max
          && aux[x] >= min
        )
      object = {} 
      result.map(x =>
        object[x] = aux[x]
      )
      
      return object
    },
    equiv: cond => margin => val =>
      Dice(d).compare(cond)
        (val-margin,val+margin)
  }
}

const D = n => Dice(Range(1)(n))
const dF = Dice([-1,0,1]).pool
const gurps = D(6).pool(3).prob("<=")

*/


Dices.Fub = [0,0,0,1,1,2]
Dices.T = ['a','b']
text = 'c'

d6 = Dice.sides(6)