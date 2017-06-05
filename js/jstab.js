/**
 * Created by zhang on 6/5/2017.
 */

define(["jquery","widget"],function ($,wid) {
    function Jstab(cfg) {
        this.config = {
            "triggerType":"mouseover",
            "effect":"fade",
            "invoke":1,
            "auto":3000
        }
        
        $.extend(this.config,cfg);
        
        this.render();
        //执行控制
    }
    
    Jstab.prototype = $.extend({},new wid.widget(),{
        bindUI:function () {
            //选项卡点击切换效果
            
            
            //然后根据触发类型设置切换
            
            var that = this;
            if(this.config.triggerType === "click"){
                
                //为li添加事件 要做两件事 解除已激活的 激活对应Index的
                that.tabNav.find("li").bind("click",function (e) {
                    
                    var index = $(this).index();
                    that.tragetTab(index);
                    e.stopPropagation();
    
                })
                
            }else if(this.config.triggerType === "mouseover" || this.config.triggerType != "click"){
                //mouseover
                
                that.tabNav.find("li").bind("mouseover",function (e) {
                    var index = $(this).index();
                    that.tragetTab(index)
                    e.stopPropagation();
                })
    
            }
            
            
            //绑定完成之后
        },
        setBox:function () {
            //存放一下常用的容器 避免多次DOM查询
            
            this.tabBox = $('#' + this.config.tabID);
            this.tabNav = this.tabBox.find(".tab_nav");
            this.tabContent = this.tabBox.find(".content_wrap");
            
            //存放invoke
            
            this.invoke = this.config.invoke;
            
            //皮肤设定
            
            if(this.tabSkin){
                this.tabBox.addClass(this.tabSkin);
            }
    
            //首先设置一下Invoke
    
            if(this.invoke != 1){
        
                this.tabNav.find("li").eq(this.invoke -1).addClass("actived").siblings().removeClass("actived")
        
                this.tabContent.find("div").eq(this.invoke -1).addClass("current").siblings().removeClass("current");
            }
            
            //保存一下tabsize
            
            this.tabSize = (this.tabNav.find("li").length);
            
        },
        autoPlay:function () {
            
            var that = this;
            this.loop = this.invoke;
            //绑定事件 移入应停止播放
            
            
            this.tabBox.bind("mouseenter",function () {
                clearInterval(that.timer);
            })
            
            this.tabBox.bind("mouseleave",function () {
                that.loop = that.invoke;
                this.timer = setInterval(function () {
                    that.loop ++;
        
                    if(that.loop >= that.tabSize){
                        that.loop = 0;
                    }
                    
        
                    that.tragetTab(that.loop)
        
                },that.config.auto)
            })
            
            this.timer = setInterval(function () {
                that.loop ++;
                if(that.loop >= that.tabSize){
                    that.loop = 0;
                }
                
                that.tragetTab(that.loop)
                
            },this.config.auto)
        },
        tragetTab:function (i,handler) {
            var that = this;
            var currIndex = that.tabNav.find(".actived").index();
            var index = i;
    
            that.tabContent.find("div").stop(false,true);
            that.tabNav.find("li").eq(index).addClass("actived").siblings().removeClass("actived")
            //判断特效
            if(that.config.effect === "default" || that.config.effect!= "fade"){
                that.tabContent.find("div").eq(index).addClass("current").siblings().removeClass("current");
            } else {
                that.tabContent.find("div").eq(currIndex).fadeOut(200,function () {
                    that.tabContent.find("div").eq(index).fadeIn(200);
                });
            }
    
            that.invoke = index +1 ;
            
            that.fire("trigger");
            
        }
    })
    
    
    
    return {
        jstab:Jstab
    }
})