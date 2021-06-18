///* rewards or punishment 奖惩 *///

/* Init 初始化 */
 /* Rewards 荣誉 */
function Init_ropRawards() {
    var userID = sessionStorage.getItem("userID");
    var status = sessionStorage.getItem("status");
    var str = { "userID": userID, "status": status, "opt": "r" };
    $.ajax({
        type: "POST",
        url: "http://localhost:8000/api/RewOrPunINIT/",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(str),
        dataType: "JSON",
        success: function (rtn) {
            var sum = rtn.sum;
            for (var i = 0; i < sum; i++) {
                var tempstr = "";
                tempstr += ("<tr class=\"success\">");
                tempstr += ("<td>" + rtn.name[i] + "</td>");
                tempstr += ("<td>" + rtn.level[i] + "</td>");
                tempstr += ("<td>" + rtn.year[i] + "</td>");
                tempstr += ("<td>" + rtn.els[i] + "</td>");
                tempstr += ("<td>r" + rtn.rapid[i] + "</td></tr>");
	 $("#ropRawards_table").append(tempstr);
            }
        },
        error: function () {
            alert("Initialization Error");
        }
    });
}
 /* Punishments 处分 */
function Init_ropPunishment() {
    var userID = sessionStorage.getItem("userID");
    var status = sessionStorage.getItem("status");
    var str = { "userID": userID, "status": status, "opt": "p" };
    $.ajax({
        type: "POST",
        url: "http://localhost:8000/api/RewOrPunINIT/",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(str),
        dataType: "JSON",
        success: function (rtn) {
            var sum = rtn.sum;
            for (var i = 0; i < sum; i++) {
                var tempstr = "";
                tempstr += ("<tr class=\"danger\">");
                tempstr += ("<td>" + rtn.name[i] + "</td>");
                tempstr += ("<td>" + rtn.level[i] + "</td>");
                tempstr += ("<td>" + rtn.year[i] + "</td>");
                tempstr += ("<td>" + rtn.els[i] + "</td>");
                tempstr += ("<td>p" + rtn.rapid[i] + "</td></tr>");
	$("#ropPunishment_table").append(tempstr);
            }
        },
        error: function () {
            alert("Initialization Error");
        }
    });
}
