/**
 * Created by zhang on 6/5/2017.
 */


define(["jquery"],function ($) {
    function Widget() {
        this.handlers = {} //自定义事件存放
    }
    
    Widget.prototype =  {
        on:function (type,handler) {
            if(typeof this.handlers[type] == "undefined"){
                console.log(type);
                this.handlers[type] = [];
            }//如果在字典中响应类型没有事件存储 就创建一个数组以便村粗
        
            this.handlers[type].push(handler);
            return this;
        },
        fire:function (type,data) {
            //检测相应类型数组是否存在 存在则全部吐出来执行
            //如果传进来了输入就放入参数之中调用
            if(this.handlers[type] instanceof Array){
                var handlers = this.handlers[type];
                for(var i=0,len=handlers.length; i<len; i++){
                    handlers[i](data);
                }
            }
        },
        render:function () {
            this.setBox();
            this.bindUI();
            if(this.config.auto){
                this.autoPlay();
                console.log(1);
            }
        },
        bindUI:function () {
            
        },
        autoPlay:function () {
            
        },
        setBox:function () {
        
        }
    }
    
    return {
        widget:Widget
    }
})