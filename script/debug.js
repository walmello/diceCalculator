class Debug {
  static mode = true

  static trace(content, action=alert){
    if(Debug.mode)
      action(content)
    return content
  }
  
  static json(content,offset = 2){
    let json = JSON.stringify(content)
    if(Debug.mode)
      Debug.trace(json)
    return json
  }
}
