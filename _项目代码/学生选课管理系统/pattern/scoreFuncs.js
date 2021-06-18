///* score 成绩 *///

/* Init 初始化 */
 /* Score 成绩 */
function Init_scoreScore() {
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
                if (rtn.score[i] == "") {
                    tempstr += ("<tr>");
                }
                else if (parseFloat(rtn.score[i]) >= 60) {
                    tempstr += ("<tr class=\"success\">");
                }
                else {
                    tempstr += ("<tr class=\"danger\">");
                }
                tempstr += ("<td>" + rtn.cid[i] + "</td>");
                tempstr += ("<td>" + rtn.cname[i] + "</td>");
                tempstr += ("<td>" + rtn.year[i] + "</td>");
                tempstr += ("<td>" + rtn.term[i] + "</td>");
                tempstr += ("<td>" + rtn.tea[i] + "</td>");
                tempstr += ("<td>" + rtn.fid[i] + "</td>");
                tempstr += ("<td>" + rtn.cre[i] + "</td>");
                tempstr += ("<td style=\"color: rgb(156, 12, 19);\">" + rtn.score[i] + "</td></tr>");
                $("#scoreScore_table").append(tempstr);
            }
        },
        error: function () {
            alert("Initialization Error");
        }
    });

}
 /* Credit 学分 */
function Init_scoreCredit() {
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
                if (rtn.score[i] == "") {
                    tempstr += ("<tr>");
                }
                else if (parseFloat(rtn.score[i]) >= 60) {
                    tempstr += ("<tr class=\"success\">");
                }
                else {
                    tempstr += ("<tr class=\"danger\">");
                }
                tempstr += ("<td>" + rtn.cid[i] + "</td>");
                tempstr += ("<td>" + rtn.cname[i] + "</td>");
                tempstr += ("<td>" + rtn.year[i] + "</td>");
                tempstr += ("<td>" + rtn.term[i] + "</td>");
                tempstr += ("<td>" + rtn.tea[i] + "</td>");
                tempstr += ("<td>" + rtn.fid[i] + "</td>");
                tempstr += ("<td style=\"color: rgb(156, 12, 19);\">" + rtn.cre[i] + "</td>");
                tempstr += ("<td style=\"color: rgb(156, 12, 19);\">" + rtn.score[i] + "</td></tr>");
                $("#scoreCredit_table").append(tempstr);
            }
        },
        error: function () {
            alert("Initialization Error");
        }
    });

}
