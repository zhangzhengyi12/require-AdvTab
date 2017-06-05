
//进行基本的设置

require.config({
    paths: {
        jquery: "vendor/jquery",
        jqueryUi:"vendor/jquery-ui.min",
        widget:"widget"
    }
})


require(["jquery","jstab",],function ($,js) {
    
    
    new js.jstab({
        "tabID":"thisMyTab",
        "triggerType":"mouseover",
        "effect":"fade",
        "invoke":4,
        "auto":3000
    }).on("trigger",function () {
        console.log("1");
    });
    
    new js.jstab({
        "tabID":"thisMyTab3",
        "triggerType":"click",
        "effect":"default",
        "invoke":1,
        "auto":false
    }).on("trigger",function () {
        console.log("3");
    });
    
    new js.jstab({
        "tabID":"thisMyTab2",
        "triggerType":"click",
        "effect":"default",
        "invoke":1,
        "auto":2000
    }).on("trigger",function () {
        console.log("2");
    });
})