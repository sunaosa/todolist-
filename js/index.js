$(function() {
    $(document).selectStart = function() { return false; };
    load();
    $("#title").on("keydown", function(event) {
        if (event.keyCode === 13) {
            if ($(this).val() === "") {
                alert("输入不能为空\n请输入你要记录的事情！！！");
                return false;
            }
            var local = getData();
            local.push({ title: $(this).val(), done: false });
            savaData(local);
            console.log(local);
            load();
            $(this).val("");
        }
    });
    //删除操作
    $("ol,ul").on("click", "a", function() {
        var data = getData();
        var index = $(this).attr("i");
        console.log(index);
        data.splice(index, 1);
        savaData(data);
        load();
    });
    //完成选择
    $("ol,ul").on("click", ".sa", function() {
        var data = getData();
        var index = $(this).siblings("a").attr("i");
        data[index].done = $(this).prop("checked");
        console.log(data);
        savaData(data);
        load();

    });
    // 双击修改
    $("ol,ul").on("dblclick", "p", function() {
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        // // alert("11");
        var str = $(this).html();
        var index = $(this).siblings("a").attr("i");
        $(this).html('<input type="text" class="as" value="' + str + '"/>');
        $(this).children("input").select();
        $(this).children("input").focus();
        var data = getData();
        $(this).children(".as").on("blur", function() {
            if ($(this).val() === "") {
                alert("请输入内容");
            } else {
                data[index].title = $(this).val();
                savaData(data);
                load();
            }
        });
        $(this).children(".as").on("keyup", function(e) {
            if (e.keyCode === 13) {
                $(this).blur();
            }
        });
        // load();
        console.log(data);
    });
    //拖动小li交换位置
    // var inx;

    // $("ul li,ol li").on("dragstart", function(e) {
    //     inx = e.target;
    //     e.target.css("opacity", "0.5");
    //     e.preventDefault();
    // })

    // $("ol,ul").on("dragover", "li", function(e) {
    //     e.preventDefault();
    // })
    // $("ol,ul").on("drop", "li", function() {
    //     var index = $(this).find('a').attr("i");
    //     var data = getData();
    //     var temp;
    //     temp = data[inx];
    //     data[inx] = data[index];
    //     data[index] = temp;
    //     load();

    // })

    //读取本地数据
    function getData() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            console.log(JSON.parse(data));
            return JSON.parse(data);
        } else {
            return [];
        }
    }
    //保存数据
    function savaData(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }
    //加载页面
    function load() {
        var data = getData();
        // console.log(data);
        $("ol,ul").empty();
        var todocount = 0; //代做个数
        var donecount = 0; //完成个数
        $.each(data, function(i, n) {
            // console.log(n);

            if (n.done == false) {
                $("ol").prepend("<li dragable='true'><input type='checkbox' class='sa'><p>" + n.title + "</p><a href='javascript:; ' i=" + i + "></a></li>");
                todocount++;
            } else {
                $("ul").prepend("<li dragable='true'><input type='checkbox' class='sa' checked><p>" + n.title + "</p><a href='javascript:; ' i=" + i + "></a></li>");
                donecount++;
            }
        })
        $("#todocount").text(todocount);
        $("#donecount").text(donecount);
    }
})