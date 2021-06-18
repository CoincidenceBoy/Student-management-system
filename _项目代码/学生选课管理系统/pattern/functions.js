
/*navigation 标签栏/导航栏*/
/*dropdown-menu 重置展开方式*/
function PushDown_menu(serialNum, listSum) {
    //收回其他菜单
    var listSum_max = 6;
    var idname = "navList-"
    for (var i = 1; i <= listSum_max; i++) {
        var idnamenow = idname + i;
        if (i != serialNum && document.getElementById((idnamenow + "-open")) != null) {
            document.getElementById((idnamenow + "-open")).id = idnamenow;
        }
        if (document.getElementById(idnamenow) == null) continue;
        document.getElementById(idnamenow).style = "padding: 0px";
        idnamenow = "#" + idnamenow;
        $(idnamenow).removeClass('open');
    }
    //收回菜单或展开菜单
    if (this.id == ("navList-" + serialNum + "-open")) {
        this.id = "navList-" + serialNum;

    }
    else {
        this.id = "navList-" + serialNum + "-open";
        //展开下拉菜单
        var idnamenow = idname + serialNum;
        document.getElementById(idnamenow).style = "padding: 5px 0px 0px";
        idnamenow = "#" + idnamenow;
        $(idnamenow).addClass('open');
        //调整间距
        serialNum++;
        var idnamenow = idname + serialNum;
        var sum = "padding: " + (17 + 26 * listSum) + "px 0px 0px";
        //下移推算：上下边框=17px 行高=26px
        if (document.getElementById(idnamenow) != null)
            document.getElementById(idnamenow).style = sum;
    }
}
