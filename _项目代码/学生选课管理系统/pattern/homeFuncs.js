///* home 个人中心 *///

/* Init 初始化 */
function Init_home() {
    var userID = sessionStorage.getItem("userID");
    var status = sessionStorage.getItem("status");
    var str = { "userID": userID, "status": status};
    $.ajax({
        type: "POST",
        url: "http://localhost:8000/api/HomeINIT/",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(str),
        dataType: "JSON", 
        success: function (rtn) {
            if (document.getElementById("home-name") != null) {
                document.getElementById("home-name").innerHTML = rtn.name;
            }
            if (document.getElementById("home-sid") != null) {
                document.getElementById("home-sid").innerHTML = rtn.sid;
            }
            if (document.getElementById("home-sex") != null) {
                document.getElementById("home-sex").innerHTML = rtn.sex;
            }
            if (document.getElementById("home-age") != null) {
                document.getElementById("home-age").innerHTML = rtn.age;
            }
            if (document.getElementById("home-aca") != null) {
                document.getElementById("home-aca").innerHTML = rtn.aca;
            }
            if (document.getElementById("home-maj") != null) {
                document.getElementById("home-maj").innerHTML = rtn.maj;
            }
            if (document.getElementById("home-grade") != null) {
                document.getElementById("home-grade").innerHTML = rtn.grade;
            }
            if (document.getElementById("home-clss") != null) {
                document.getElementById("home-clss").innerHTML = rtn.clss;
            }
            if (document.getElementById("home-enr") != null) {
                document.getElementById("home-enr").innerHTML = rtn.enr;
            }
            if (document.getElementById("home-tit") != null) {
                document.getElementById("home-tit").innerHTML = rtn.tit;
            }
            if (document.getElementById("home-scage") != null) {
                document.getElementById("home-scage").innerHTML = rtn.scage;
            }
            if (document.getElementById("home-idcrd") != null) {
                document.getElementById("home-idcrd").innerHTML = rtn.idcrd;
            }
            if (document.getElementById("home-scou") != null) {
                document.getElementById("home-scou").innerHTML = rtn.scou;
            }
            if (document.getElementById("home-scho") != null) {
                document.getElementById("home-scho").innerHTML = rtn.scho;
            }
            if (document.getElementById("home-srew") != null) {
                document.getElementById("home-srew").innerHTML = rtn.srew;
            }
            if (document.getElementById("home-spun") != null) {
                document.getElementById("home-spun").innerHTML = rtn.spun;
            }
        },
        error: function () {
            alert("Initialization Error");
        }
    });  
}
function Init_homeModif() {
    var userID = sessionStorage.getItem("userID");
    var status = sessionStorage.getItem("status");
    var str = { "userID": userID, "status": status}
    $.ajax({
        type: "POST",
        url: "http://localhost:8000/api/HomeINIT/",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(str),
        dataType: "JSON", 
        success: function (rtn) {
            if (document.getElementById("home-name") != null) {
                document.getElementById("home-name").value = rtn.name;
            }
            if (document.getElementById("home-sid") != null) {
                document.getElementById("home-sid").innerHTML = rtn.sid;
            }
            if (document.getElementById("home-sex") != null) {
                document.getElementById("home-sex").value = rtn.sex;
            }
            if (document.getElementById("home-age") != null) {
                document.getElementById("home-age").innerHTML = rtn.age;
            }
            if (document.getElementById("home-aca") != null) {
                document.getElementById("home-aca").value = rtn.aca;
            }
            if (document.getElementById("home-maj") != null) {
                document.getElementById("home-maj").value = rtn.maj;
            }
            if (document.getElementById("home-grade") != null) {
                document.getElementById("home-grade").value = rtn.grade;
            }
            if (document.getElementById("home-clss") != null) {
                document.getElementById("home-clss").value = rtn.clss;
            }
            if (document.getElementById("home-enr") != null) {
                document.getElementById("home-enr").innerHTML = rtn.enr;
            }
            if (document.getElementById("home-tit") != null) {
                document.getElementById("home-tit").innerHTML = rtn.tit;
            }
            if (document.getElementById("home-scage") != null) {
                document.getElementById("home-scage").innerHTML = rtn.scage;
            }
            if (document.getElementById("home-idcrd") != null) {
                document.getElementById("home-idcrd").innerHTML = rtn.idcrd;
            }
            if (document.getElementById("home-scou") != null) {
                document.getElementById("home-scou").innerHTML = rtn.scou;
            }
            if (document.getElementById("home-scho") != null) {
                document.getElementById("home-scho").innerHTML = rtn.scho;
            }
            if (document.getElementById("home-srew") != null) {
                document.getElementById("home-srew").innerHTML = rtn.srew;
            }
            if (document.getElementById("home-spun") != null) {
                document.getElementById("home-spun").innerHTML = rtn.spun;
            }
        },
        error: function (rtn) {
            alert("Initialization Error");
        }
    });
}
/* Submit 提交 */
function Submit_homeModif() {
    var name = "";
    var sex = "";
    var aca = "";
    var maj = "";
    var grade = "";
    var clss = "";
    if (document.getElementById("home-name") != null) {
        name = $("#home-name").val();
    }
    if (document.getElementById("home-sex") != null) {
        sex = $("#home-sex").val()
    }
    if (document.getElementById("home-aca") != null) {
        aca = $("#home-aca").val();
    }
    if (document.getElementById("home-maj") != null) {
        maj = $("#home-maj").val();
    }
    if (document.getElementById("home-grade") != null) {
        grade = $("#home-grade").val();
    }
    if (document.getElementById("home-clss") != null) {
        clss = $("#home-clss").val();
    }
    var userID = sessionStorage.getItem("userID");
    var status = sessionStorage.getItem("status");
    var str = { "userID": userID, "status": status, "name": name, "sex": sex, "ace": aca, "maj": maj, "grade": grade, "clss": clss }
    $.ajax({
        type: "POST",
        url: "http://localhost:8000/api/HomeSUB/",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(str),
        dataType: "JSON",
        success: function (rtn) {
            if (rtn.status == "ERROR") {
                alert("修改失败" + rtn.msg);
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