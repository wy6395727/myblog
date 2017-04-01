var config=require('config-lite')
var Mongolass=require('mongolass')
mongolass=new Mongolass()
mongolass.connect(config.mongodb)

export