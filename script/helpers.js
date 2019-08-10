class Helper {
  static pipe(item,...args){
    args.forEach(f =>
      item = f(item)
    )
    return item
  }
  
  static math = "+-/*%".split("")
  static comp = "< > <= >= == !="
    .split(" ")

  static random(limit){
    return Math.random()*limit
  }
  
  static range(limit){
    return Array(limit).fill(0)
      .map((x,i) => i+1)
  }
  
  static operate(v1,op,v2){
   return eval(v1+op+v2)
  }
}

