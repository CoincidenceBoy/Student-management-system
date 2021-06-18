///* courseMNG 课程管理 *///

/* Init 初始化 */
 /* begins 课程开课*/
function Init_courseBeg() {
    var userID = sessionStorage.getItem("userID");
    var status = sessionStorage.getItem("status");
    var str = { "userID": userID, "status": status};
    $.ajax({
        type: "POST",
        url: "http://localhost:8000/api/CourseMngINIT/",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(str),
        dataType: "JSON",
        success: function (rtn) {
            var sum = rtn.sum;
            for (var i = 0; i < sum; i++) {
                var tempstr = "";
                tempstr += ("<tr><td>" + rtn.cid[i] + "</td>");
                tempstr += ("<td>" + rtn.cname[i] + "</td>");
                tempstr += ("<td>" + rtn.fid[i] + "</td>");
                tempstr += ("<td>" + rtn.cre[i] + "</td>");
                tempstr += ("<td><button type=\"button\" class=\"btn btn-xs\">开课</button></td></tr>");
                $("#courseBeg_table").append(tempstr);
            }
        },
        error: function () {
            alert("Initialization Error");
        }
    });
}
 /* modificat 课程修改 */
function Init_courseMod() {
    var userID = sessionStorage.getItem("userID");
    var status = sessionStorage.getItem("status");
    var str = { "userID": userID, "status": status };
    $.ajax({
        type: "POST",
        url: "http://localhost:8000/api/CourseMngINIT/",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(str),
        dataType: "JSON",
        success: function (rtn) {
            var sum = rtn.sum;
            for (var i = 0; i < sum; i++) {
                var tempstr = "";
                tempstr += ("<tr><td>" + rtn.cid[i] + "</td>");
                tempstr += ("<td>" + rtn.cname[i] + "</td>");
                tempstr += ("<td>" + rtn.fid[i] + "</td>");
                tempstr += ("<td>" + rtn.cre[i] + "</td>");
                tempstr += ("<td><button type=\"button\" class=\"btn btn-xs\">修改</button></td></tr>");
                $("#courseMod_table").append(tempstr);
            }
        },
        error: function () {
            alert("Initialization Error");
        }
    });
}
  /* begins sub 课程开课SUB*/
function Init_courseBegSub() {
    var userID = sessionStorage.getItem("userID");
    var status = sessionStorage.getItem("status");
    document.getElementById("cour-cid").innerHTML = sessionStorage.getItem("courBEG-cid");
    document.getElementById("cour-cname").innerHTML = sessionStorage.getItem("courBEG-cname");
    document.getElementById("cour-fid").innerHTML = sessionStorage.getItem("courBEG-fid");
    document.getElementById("cour-cre").innerHTML = sessionStorage.getItem("courBEG-cre");

}
  /* modificat sub 课程修改SUB*/
function Init_courseModSub() {
    var userID = sessionStorage.getItem("userID");
    var status = sessionStorage.getItem("status");
    document.getElementById("cour-cid").innerHTML = sessionStorage.getItem("courMOD-cid");
    document.getElementById("cour-cname").value = sessionStorage.getItem("courMOD-cname");
    document.getElementById("cour-fid").value = sessionStorage.getItem("courMOD-fid");
    document.getElementById("cour-cre").value = sessionStorage.getItem("courMOD-cre");

}

/* Submit 提交 */
 /* increase 新增课程*/
function Submit_courseInc() {
    var cid = "";
    var cname = "";
    var fid = "";
    var cre = "";
    if (document.getElementById("cour-cid") != null) {
        cid = $("#cour-cid").val()
    }
    if (document.getElementById("cour-cname") != null) {
        cname = $("#cour-cname").val();
    }
    if (document.getElementById("cour-fid") != null) {
        fid = $("#cour-fid").val()
    }
    if (document.getElementById("cour-cre") != null) {
        cre = $("#cour-cre").val()
    }
    var userID = sessionStorage.getItem("userID");
    var status = sessionStorage.getItem("status");
    var str = { "userID": userID, "status": status, "cid": cid, "cname": cname, "fid": fid, "cre": cre }
    $.ajax({
        type: "POST",
        url: "http://localhost:8000/api/CourseIncSUB/",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(str),
        dataType: "JSON",
        success: function (rtn) {
            if (rtn.status == "ERROR") {
                alert("提交失败" + rtn.msg);
            }
            else {
                alert("新增课程成功" + rtn.msg);
            }
        },
        error: function () {
            alert("Submit Error");
        }
    });
}
 /* begins 课程开课*/
function Submit_courseBeg() {
    var year = "";
    var term = "";
    if (document.getElementById("cour-year") != null) {
        year = $("#cour-year").val()
    }
    if (document.getElementById("cour-term") != null) {
        term = $("#cour-term").val();
    }
    var userID = sessionStorage.getItem("userID");
    var status = sessionStorage.getItem("status");
    var cid = sessionStorage.getItem("courBEG-cid");
    var str = { "userID": userID, "status": status, "cid": cid, "year": year, "term": term}
    $.ajax({
        type: "POST",
        url: "http://localhost:8000/api/CourseBegSUB/",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(str),
        dataType: "JSON",
        success: function (rtn) {
            if (rtn.status == "ERROR") {
                alert("提交失败" + rtn.msg);
            }
            else {
                alert("开课成功" + rtn.msg);
            }
        },
        error: function () {
            alert("Submit Error");
        }
    });
}
 /* modificat 课程修改 */
function Submit_courseMod() {
    var cname = "";
    var fid = "";
    var cre = "";
    if (document.getElementById("cour-cname") != null) {
        cname = $("#cour-cname").val();
    }
    if (document.getElementById("cour-fid") != null) {
        fid = $("#cour-fid").val()
    }
    if (document.getElementById("cour-cre") != null) {
        cre = $("#cour-cre").val()
    }
    var userID = sessionStorage.getItem("userID");
    var status = sessionStorage.getItem("status");
    var cid = sessionStorage.getItem("courMOD-cid");
    var str = { "userID": userID, "status": status, "cid": cid, "cname": cname, "fid": fid, "cre": cre }
    $.ajax({
        type: "POST",
        url: "http://localhost:8000/api/CourseModSUB/",
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