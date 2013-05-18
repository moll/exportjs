var _ = require("underscore")
var File = require("fs")

exports.Iife = function() {
  this.template = getTemplate("iife")
}

exports.Iife.prototype.tab = "  "

exports.Iife.prototype.wrap = function(file) {
  var source = File.readFileSync(file, "utf8")
  return this.template({source: this.indent(source)})
}

exports.Iife.prototype.indent = function(source) {
  return source.replace(/^(?!$)/gm, this.tab)
}

var getTemplate = _.memoize(function(name) {
  var template = File.readFileSync(__dirname+"/templates/"+name+".ejs", "utf8")
  return _.template(template)
})
