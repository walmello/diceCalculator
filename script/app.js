// Jquery engine
// to manipulate CSS
$(document).ready(function(){
  $('section').addClass('hero section')
  $('button').addClass('button')
  $('h1').addClass('title')
  $('h2').addClass('subtitle')
  $('input').addClass('input is-ligth')
  $('label').addClass('label')
  $("h1, h2, label")
    .addClass('has-text-white')
  
})
  
// start Vue engine
const app = new Vue({
  el: "#app",
  data: {
    expr: "",
    prob: 0,
    cond: "<=",
    value: 0,
    rand: 0
  },
  method: {
    roll(){
      this.rand = this.dice.roll()
    }
  },
  computed: {
    dice(){
      return new Expr(this.expr)
    },
    chance(){
      return this.dice.chanceTable(
        this.cond,
      )
    },
  }
})