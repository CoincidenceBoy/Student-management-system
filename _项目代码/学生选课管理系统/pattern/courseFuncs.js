///* course 课程 *///

/* Init 初始化 */
 /* Chosen 已选课程 */
function Init_courseChosen() {
    var userID = sessionStorage.getItem("userID");
    var status = sessionStorage.getItem("status");
    var str = { "userID": userID, "status": status, "opt": "chosen" };
    $.ajax({
        type: "POST",
        url: "http://localhost:8000/api/CourseINIT/",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(str),
        dataType: "JSON",
        success: function (rtn) {
            var sum = rtn.sum;
            for (var i = 0; i < sum; i++) {
                var tempstr = "";
                tempstr += ("<tr><td>" + rtn.cid[i] + "</td>");
                tempstr += ("<td>" + rtn.cname[i] + "</td>");
                tempstr += ("<td>" + rtn.year[i] + "</td>");
                tempstr += ("<td>" + rtn.term[i] + "</td>");
                tempstr += ("<td>" + rtn.tea[i] + "</td>");
                tempstr += ("<td>" + rtn.fid[i] + "</td>");
                tempstr += ("<td>" + rtn.cre[i] + "</td>");
                tempstr += ("<td>" + rtn.score[i] + "</td></tr>");
                $("#courseChosen_table").append(tempstr);
            }
        },
        error: function () {
            alert("Initialization Error");
        }
    });

}
 /* Choice 选课 */
function Init_courseChoice() {
    var userID = sessionStorage.getItem("userID");
    var status = sessionStorage.getItem("status");
    var str = { "userID": userID, "status": status, "opt": "choice" };
    $.ajax({
        type: "POST",
        url: "http://localhost:8000/api/CourseINIT/",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(str),
        dataType: "JSON",
        success: function (rtn) {
            var sum = rtn.sum;
            for (var i = 0; i < sum; i++) {
                var tempstr = "";
                tempstr += ("<tr><td>" + rtn.cid[i] + "</td>");
                tempstr += ("<td>" + rtn.beg[i] + "</td>");
                tempstr += ("<td>" + rtn.cname[i] + "</td>");
                tempstr += ("<td>" + rtn.year[i] + "</td>");
                tempstr += ("<td>" + rtn.term[i] + "</td>");
                tempstr += ("<td>" + rtn.tea[i] + "</td>");
                tempstr += ("<td>" + rtn.fid[i] + "</td>");
                tempstr += ("<td>" + rtn.cre[i] + "</td>");
                tempstr += ("<td><button type=\"button\" class=\"btn btn-xs\">选课</button></td></tr>");
                $("#courseChoice_table").append(tempstr);
            }
        },
        error: function () {
            alert("Initialization Error");
        }
    });
}
 /* Drop 退课 */
function Init_courseDrop() {
    var userID = sessionStorage.getItem("userID");
    var status = sessionStorage.getItem("status");
    var str = { "userID": userID, "status": status, "opt": "chosen" };
    $.ajax({
        type: "POST",
        url: "http://localhost:8000/api/CourseINIT/",
        contentType: "application/json;charset=utf-8",      
        data: JSON.stringify(str),
        dataType: "JSON",
        success: function (rtn) {
            var sum = rtn.sum;         
            for (var i = 0; i < sum; i++) {
                var tempstr = "";
                tempstr += ("<tr><td>" + rtn.cid[i] + "</td>");
                tempstr += ("<td>" + rtn.beg[i] + "</td>");
                tempstr += ("<td>" + rtn.cname[i] + "</td>");
                tempstr += ("<td>" + rtn.year[i] + "</td>");
                tempstr += ("<td>" + rtn.term[i] + "</td>");
                tempstr += ("<td>" + rtn.tea[i] + "</td>");
                tempstr += ("<td>" + rtn.fid[i] + "</td>");
                tempstr += ("<td>" + rtn.cre[i] + "</td>");
                tempstr += ("<td><button type=\"button\" class=\"btn btn-xs\">退课</button></td></tr>");
                $("#courseDrop_table").append(tempstr);
            }
        },
        error: function () {
            alert("Initialization Error");
        }
    });

}

/* Submit 提交 */
 /* Choice 选课 */
function Submit_courseChoice(cid, beg) {
    var userID = sessionStorage.getItem("userID");
    var status = sessionStorage.getItem("status");
    var str = { "userID": userID, "status": status, "opt": "choice", "cid": cid, "beg": beg }
    $.ajax({
        type: "POST",
        url: "http://localhost:8000/api/CourseSUB/",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(str),
        dataType: "JSON",
        success: function (rtn) {
            if (rtn.status == "ERROR") {
                alert("修改失败：" + rtn.msg);
            }
            else {
                alert("选课成功" + rtn.msg);
            }
        },
        error: function () {
            alert("Submit Error");
        }
    });
}
 /* Drop 退课 */
function Submit_courseDrop(cid,beg) {
    var userID = sessionStorage.getItem("userID");
    var status = sessionStorage.getItem("status");
    var str = { "userID": userID, "status": status, "opt": "drop", "cid": cid, "beg": beg }
    $.ajax({
        type: "POST",
        url: "http://localhost:8000/api/CourseSUB/",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(str),
        dataType: "JSON",
        success: function (rtn) {
            if (rtn.status == "ERROR") {
                alert("修改失败：" + rtn.msg);
            }
            else {
                alert("退课成功" + rtn.msg);
            }
        }, 
        error: function () {
            alert("Submit Error");
        }
    });
}
