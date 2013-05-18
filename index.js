var _ = require("underscore")
var File = require("fs")

exports.Iffy = function(opts) {
  this.opts = opts
  this.template = getTemplate("iffy")
}

exports.Iffy.prototype.tab = "  "

exports.Iffy.prototype.wrap = function(file) {
  var source = File.readFileSync(file, "utf8")
  var vars = {}
  if (this.opts.global) vars.global = "this", vars.root = "this"
  return this.template({source: this.indent(source), vars: vars})
}

exports.Iffy.prototype.indent = function(source) {
  return source.replace(/^(?!$)/gm, this.tab)
}

var getTemplate = _.memoize(function(name) {
  var template = File.readFileSync(__dirname+"/templates/"+name+".ejs", "utf8")
  return _.template(template)
})
