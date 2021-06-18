///* studentMNG 学生管理 *///

 /* 成绩-课程信息 初始化 */
function Init_scoreCoubeg() {
    var userID = sessionStorage.getItem("userID");
    var status = sessionStorage.getItem("status");
    var str = { "userID": userID, "status": status };
    $.ajax({
        type: "POST",
        url: "http://localhost:8000/api/ScoreCouBegINIT/",
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
                tempstr += ("<td>" + rtn.fid[i] + "</td>");
                tempstr += ("<td>" + rtn.cre[i] + "</td>");
                tempstr += ("<td><button type=\"button\" class=\"btn btn-xs\">录入成绩</button></td></tr>");
                $("#courseMsg_table").append(tempstr);
            }
        },
        error: function () {
            alert("Initialization Error");
        }
    });
}
/* 成绩-学生信息 初始化 */
function Init_scoreStudent() {
    var userID = sessionStorage.getItem("userID");
    var status = sessionStorage.getItem("status");
    var cid = sessionStorage.getItem("courMSG-cid");
    var beg = sessionStorage.getItem("courMSG-beg");
    var str = { "userID": userID, "status": status, "cid": cid, "beg": beg };
    $.ajax({
        type: "POST",
        url: "http://localhost:8000/api/ScoreCouChoINIT/",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(str),
        dataType: "JSON",
        success: function (rtn) {
            var sum = rtn.sum;
            for (var i = 0; i < sum; i++) {
                var tempstr = "";
                tempstr += ("<tr><td>" + rtn.sid[i] + "</td>");
                tempstr += ("<td>" + rtn.name[i] + "</td>");
                tempstr += ("<td><input type=\"text\" value=\"" + rtn.score[i] +  "\"></td>");
                tempstr += ("<td><button type=\"button\" class=\"btn btn-xs\">录入成绩</button></td></tr>");
                $("#studentMsg_table").append(tempstr);
            }
        },
        error: function () {
            alert("Initialization Error");
        }
    });
}
 /* 成绩-提交成绩 */
function Submit_scoreStudent(sid,score) {
    var userID = sessionStorage.getItem("userID");
    var status = sessionStorage.getItem("status");
    var cid = sessionStorage.getItem("courMSG-cid");
    var beg = sessionStorage.getItem("courMSG-beg");
    var str = { "userID": userID, "status": status, "opt": 'r', "sid": sid, "cid": cid, "beg": beg, "score": score }
    $.ajax({
        type: "POST",
        url: "http://localhost:8000/api/ScoreStuSUB/",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(str),
        dataType: "JSON",
        success: function (rtn) {
            if (rtn.status == "ERROR") {
                alert("录入失败" + rtn.msg);
            }
            else {
                alert("录入成功" + rtn.msg);
            }
        },
        error: function () {
            alert("Submit Error");
        }
    });
}

/* Init 初始化 */
 /* reward 荣誉 */
function Init_studentRew() {
    var userID = sessionStorage.getItem("userID");
    var status = sessionStorage.getItem("status");
    var str = { "userID": userID, "status": status };
    $.ajax({
        type: "POST",
        url: "http://localhost:8000/api/StudentMngINIT/",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(str),
        dataType: "JSON",
        success: function (rtn) {
            var sum = rtn.sum;
            for (var i = 0; i < sum; i++) {
                var tempstr = "";
                tempstr += ("<tr><td>" + rtn.sid[i] + "</td>");
                tempstr += ("<td>" + rtn.name[i] + "</td>");
                tempstr += ("<td>" + rtn.sex[i] + "</td>");
                tempstr += ("<td>" + rtn.age[i] + "</td>");
                tempstr += ("<td>" + rtn.aca[i] + "</td>");
                tempstr += ("<td>" + rtn.maj[i] + "</td>");
                tempstr += ("<td>" + rtn.grade[i] + "</td>");
                tempstr += ("<td>" + rtn.clss[i] + "</td>");
                tempstr += ("<td>" + rtn.srew[i] + "</td>");
                tempstr += ("<td><button type=\"button\" class=\"btn btn-xs\">录入荣誉</button></td></tr>");
                $("#studentMsg_table").append(tempstr);
            }
        },
        error: function () {
            alert("Initialization Error");
        }
    });
}
 /* punish 处分 */
function Init_studentPun() {
    var userID = sessionStorage.getItem("userID");
    var status = sessionStorage.getItem("status");
    var str = { "userID": userID, "status": status };
    $.ajax({
        type: "POST",
        url: "http://localhost:8000/api/StudentMngINIT/",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(str),
        dataType: "JSON",
        success: function (rtn) {
            var sum = rtn.sum;
            for (var i = 0; i < sum; i++) {
                var tempstr = "";
                tempstr += ("<tr><td>" + rtn.sid[i] + "</td>");
                tempstr += ("<td>" + rtn.name[i] + "</td>");
                tempstr += ("<td>" + rtn.sex[i] + "</td>");
                tempstr += ("<td>" + rtn.age[i] + "</td>");
                tempstr += ("<td>" + rtn.aca[i] + "</td>");
                tempstr += ("<td>" + rtn.maj[i] + "</td>");
                tempstr += ("<td>" + rtn.grade[i] + "</td>");
                tempstr += ("<td>" + rtn.clss[i] + "</td>");
                tempstr += ("<td>" + rtn.spun[i] + "</td>");
                tempstr += ("<td><button type=\"button\" class=\"btn btn-xs\">录入处分</button></td></tr>");
                $("#studentMsg_table").append(tempstr);
            }
        },
        error: function () {
            alert("Initialization Error");
        }
    });
}
  /* reward sub 荣誉SUB*/
function Init_studentRewSUB() {
    var userID = sessionStorage.getItem("userID");
    var status = sessionStorage.getItem("status");
    document.getElementById("stud-sid").innerHTML = sessionStorage.getItem("studMSG-sid");
    document.getElementById("stud-name").innerHTML = sessionStorage.getItem("studMSG-name");


}
  /* punish sub 处分SUB */
function Init_studentPunSUB() {
    var userID = sessionStorage.getItem("userID");
    var status = sessionStorage.getItem("status");
    document.getElementById("stud-sid").innerHTML = sessionStorage.getItem("studMSG-sid");
    document.getElementById("stud-name").innerHTML = sessionStorage.getItem("studMSG-name");


}


/* Submit 提交 */
 /* increase 注册学生*/
function Submit_studentInc() {
    var sid = "";
    var name = "";
    var sex = "";
    var brth = "";
    var aca = "";
    var maj = "";
    var grade = "";
    var clss = "";
    var ebr = "";
    var idcrd = "";
    if (document.getElementById("stud-sid") != null) {
        sid = $("#stud-sid").val();
    }
    if (document.getElementById("stud-name") != null) {
        name = $("#stud-name").val();
    }
    if (document.getElementById("stud-sex") != null) {
        sex = $("#stud-sex").val()
    }
    if (document.getElementById("stud-brth") != null) {
        brth = $("#stud-brth").val()
    }
    if (document.getElementById("stud-aca") != null) {
        aca = $("#stud-aca").val();
    }
    if (document.getElementById("stud-maj") != null) {
        maj = $("#stud-maj").val();
    }
    if (document.getElementById("stud-grade") != null) {
        grade = $("#stud-grade").val();
    }
    if (document.getElementById("stud-clss") != null) {
        clss = $("#stud-clss").val();
    }
    if (document.getElementById("stud-ebr") != null) {
        ebr = $("#stud-ebr").val()
    }
    if (document.getElementById("stud-idcrd") != null) {
        idcrd = $("#stud-idcrd").val()
    }
    var userID = sessionStorage.getItem("userID");
    var status = sessionStorage.getItem("status");
    var str = { "userID": userID, "status": status, "sid": sid, "name": name, "sex": sex, "brth": brth, "ace": aca, "maj": maj, "grade": grade, "clss": clss, "ebr": ebr, "idcrd": idcrd }
    $.ajax({
        type: "POST",
        url: "http://localhost:8000/api/StudentIncSUB/",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(str),
        dataType: "JSON",
        success: function (rtn) {
            if (rtn.status == "ERROR") {
                alert("注册失败" + rtn.msg);
            }
            else {
                alert("注册成功" + rtn.msg);
            }
        },
        error: function () {
            alert("Submit Error");
        }
    });
}
 /* reward 荣誉 */
function Submit_studentRew() {
    var rop = "";
    var level = "";
    var year = "";
    var els = "";
    if (document.getElementById("stud-rop") != null) {
        rop = $("#stud-rop").val()
    }
    if (document.getElementById("stud-level") != null) {
        level = $("#stud-level").val()
    }
    if (document.getElementById("stud-year") != null) {
        year = $("#stud-year").val()
    }
    if (document.getElementById("stud-els") != null) {
        els = $("#stud-els").val()
    }
    var userID = sessionStorage.getItem("userID");
    var status = sessionStorage.getItem("status");
    var sid = sessionStorage.getItem("studMSG-sid");
    var str = { "userID": userID, "status": status, "opt": 'r', "sid": sid, "rop": rop, "level": level, "year": year, "els": els }
    $.ajax({
        type: "POST",
        url: "http://localhost:8000/api/StudentRawPunSUB/",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(str),
        dataType: "JSON",
        success: function (rtn) {
            if (rtn.status == "ERROR") {
                alert("录入失败" + rtn.msg);
            }
            else {
                alert("录入成功" + rtn.msg);
            }
        },
        error: function () {
            alert("Submit Error");
        }
    });
}
 /* punish 处分 */
function Submit_studentPun() {
    var rop = "";
    var level = "";
    var year = "";
    var els = "";
    if (document.getElementById("stud-rop") != null) {
        rop = $("#stud-rop").val()
    }
    if (document.getElementById("stud-level") != null) {
        level = $("#stud-level").val()
    }
    if (document.getElementById("stud-year") != null) {
        year = $("#stud-year").val()
    }
    if (document.getElementById("stud-els") != null) {
        els = $("#stud-els").val()
    }
    var userID = sessionStorage.getItem("userID");
    var status = sessionStorage.getItem("status");
    var sid = sessionStorage.getItem("studMSG-sid");
    var str = { "userID": userID, "status": status, "opt": 'p', "sid": sid, "rop": rop, "level": level, "year": year, "els": els }
    $.ajax({
        type: "POST",
        url: "http://localhost:8000/api/StudentRawPunSUB/",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(str),
        dataType: "JSON",
        success: function (rtn) {
            if (rtn.status == "ERROR") {
                alert("录入失败" + rtn.msg);
            }
            else {
                alert("录入成功" + rtn.msg);
            }
        },
        error: function () {
            alert("Submit Error");
        }
    });
}
