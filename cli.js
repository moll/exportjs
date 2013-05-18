#!/usr/bin/env node
var package = require("./package")

var USAGE = "Usage: " + package.name + " [options] COMMAND"
var OPTIONS = [
  "Options:",
  "  -h, -?, --help  Display this help and exit."
].join("\n")
var COMMANDS = [
  "Commands:",
  "  help  Display this help and exit."
].join("\n")

function help() {
  info(USAGE)
  info()
  info(OPTIONS)
  info()
  info(COMMANDS)
}

function info(string) { process.stdout.write((string || "") + "\n") }
function warn(string) { process.stderr.write((string || "") + "\n") }

var opts = require("nopt")({
  "help": Boolean
}, {
  "h": "help",
  "?": "help"
})
opts.args = opts.argv.remain
opts.command = opts.argv.remain[0]

switch (true) {
  case !opts.args.length:
  case opts.help:
  case opts.command == "help":
    help()
    process.exit()
    break

  default:
    warn("Unrecognized command(s): " + opts.args.join(" "))
    warn(USAGE)
    process.exit(1)
}
