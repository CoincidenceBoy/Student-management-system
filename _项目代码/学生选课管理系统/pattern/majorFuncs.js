///* major 学院管理 *///

/* Init 初始化 */
 /* modificat 修改 */
function Init_majorMod() {
    var userID = sessionStorage.getItem("userID");
    var status = sessionStorage.getItem("status");
    var str = { "userID": userID, "status": status };
    $.ajax({
        type: "POST",
        url: "http://localhost:8000/api/MajorMngINIT/",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(str),
        dataType: "JSON",
        success: function (rtn) {
            var sum = rtn.sum;
            for (var i = 0; i < sum; i++) {
                var tempstr = "";
                tempstr += ("<tr><td>" + rtn.aca[i] + "</td>");
                tempstr += ("<td>" + rtn.maj[i] + "</td>");
                tempstr += ("<td>" + rtn.addr[i] + "</td>");
                tempstr += ("<td>" + rtn.id[i] + "</td>");
                tempstr += ("<td><button type=\"button\" class=\"btn btn-xs\">修改</button></td></tr>");
                $("#majorMod_table").append(tempstr);
            }
        },
        error: function () {
            alert("Initialization Error");
        }
    });
}

  /* modificat sub 修改SUB*/
function Init_majorModSub() {
    var userID = sessionStorage.getItem("userID");
    var status = sessionStorage.getItem("status");
    document.getElementById("major-aca").innerHTML = sessionStorage.getItem("major-aca");
    document.getElementById("major-maj").value = sessionStorage.getItem("major-maj");
    document.getElementById("major-addr").value = sessionStorage.getItem("major-addr");
}

/* Submit 提交 */
 /* increase 新增*/
function Submit_majorInc() {
    var aca = "";
    var name = "";
    var addr = "";
    if (document.getElementById("major-aca") != null) {
        aca = $("#major-aca").val()
    }
    if (document.getElementById("major-name") != null) {
        name = $("#major-name").val();
    }
    if (document.getElementById("major-addr") != null) {
        addr = $("#major-addr").val()
    }
    var userID = sessionStorage.getItem("userID");
    var status = sessionStorage.getItem("status");
    var str = { "userID": userID, "status": status, "aca": aca, "name": name, "addr": addr}
    $.ajax({
        type: "POST",
        url: "http://localhost:8000/api/MajorIncSUB/",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(str),
        dataType: "JSON",
        success: function (rtn) {
            if (rtn.status == "ERROR") {
                alert("提交失败" + rtn.msg);
            }
            else {
                alert("新设学院成功" + rtn.msg);
            }
        },
        error: function () {
            alert("Submit Error");
        }
    });
}
 /* modificat 修改 */
function Submit_majorMod() {
    var maj = "";
    var addr = "";
    if (document.getElementById("major-maj") != null) {
        maj = $("#major-maj").val();
    }
    if (document.getElementById("major-addr") != null) {
        addr = $("#major-addr").val()
    }
    var userID = sessionStorage.getItem("userID");
    var status = sessionStorage.getItem("status");
    var id = sessionStorage.getItem("major-id");
    var str = { "userID": userID, "status": status, "id": id, "maj": maj, "addr": addr}
    $.ajax({
        type: "POST",
        url: "http://localhost:8000/api/MajorModSUB/",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(str),
        dataType: "JSON",
        success: function (rtn) {
            if (rtn.status == "ERROR") {
                alert("提交失败" + rtn.msg);
            }
            else {
                alert("修改成功" + rtn.msg);
            }
        },
        error: function () {
            alert("Submit Error");
        }
    });
}