from django.shortcuts import render
from django.http import HttpResponse
from django.db.models import Q
from message import models
from datetime import datetime
import time
import json
#登录
def login(request):
    if request.method == 'POST': 
        received_json_data = json.loads(request.body)
        dic={}
        userID = received_json_data['userID']
        userPWD = received_json_data['userPWD']
        print(userPWD)       
        userEX = models.user.objects.filter(userID = userID)
        if userEX.exists() == 0 :
            dic['status'] = "ERROR"
            dic['msg'] = "用户不存在"
            dic = json.dumps(dic)
            return HttpResponse(dic)        
        userX = models.user.objects.get(userID = userID)
        if userX.userPWD != userPWD :
            print(userX.userPWD)
            dic['status'] = "ERROR"
            dic['msg'] = "密码错误"
            dic = json.dumps(dic)
            return HttpResponse(dic) 
        dic['status'] = userX.status
        dic['msg'] = ""
        dic = json.dumps(dic)
        return HttpResponse(dic)      
    else:
        dic['status'] = "ERROR"
        dic['msg'] = "请求失败"
        dic = json.dumps(dic)
        return HttpResponse(dic)

#个人中心
 #个人中心 初始化            
def home_init(request):
    if request.method == 'POST': 
        received_json_data = json.loads(request.body)
        dic={}
        userID = received_json_data['userID'] 
        status = received_json_data['status']
        #【学生】
        if status == 'stu' :
            userX = models.student.objects.get(std_id = userID)
            dic['name'] = str(userX.std_name)
            dic['sid'] = str(userX.std_id)
            dic['sex'] = str(userX.std_sex)
            dic['age'] = str(2020-(userX.std_age.year))
            dic['aca'] = str(userX.aca_id.aca_name)
            dic['maj'] = str(models.major.objects.get(Q(aca_id = userX.aca_id.aca_id)&Q(maj_id = userX.maj_id)).maj_name)
            dic['grade'] = str(userX.std_grade)
            dic['clss'] = str(userX.std_class)
            dic['enr'] = str(userX.std_date)
            dic['idcrd'] = str(userX.std_IDcard)
            dic['scho'] = str(models.selectcourse.objects.filter(std_id = userID).count())
            dic['srew'] = str(models.rap.objects.filter(Q(std_id = userID)&Q(rap_rop = '奖项')).count())
            dic['spun'] = str(models.rap.objects.filter(Q(std_id = userID)&Q(rap_rop = '惩罚')).count())
            dic = json.dumps(dic)
            return HttpResponse(dic)
        #【教师】
        if status == 'tea' or status == 'adm':
            userX = models.teacher.objects.get(tea_id = userID)
            dic['name'] = str(userX.tea_name)
            dic['sid'] = str(userX.tea_id)
            dic['sex'] = str(userX.tea_sex)
            dic['age'] = str(2020-(userX.tea_age.year))
            dic['aca'] = str(models.department.objects.get(aca_id = userX.aca_id.aca_id).aca_name)
            dic['tit'] = str(userX.tea_title)
            dic['scou'] = str(models.setupcourse.objects.filter(tea_id = userID).count())
            dic = json.dumps(dic)
            return HttpResponse(dic)
 #个人中心 提交
def home_sub(request):
    if request.method == 'POST': 
        received_json_data = json.loads(request.body)
        dic={}
        userID = received_json_data['userID']
        status = received_json_data['status']
        #【学生】
        if status == 'stu':
            name = received_json_data['name']
            sex = received_json_data['sex']
            aca = received_json_data['ace']
            maj = received_json_data['maj']
            grade = received_json_data['grade']
            clss = received_json_data['clss']
            acaEX = models.department.objects.filter(aca_name = aca)
            majEX = models.major.objects.filter(Q(maj_name = maj)|Q(aca_id = models.department.objects.get(aca_name = aca).aca_id))
            if acaEX.exists() == 0 :
                dic['status'] = "ERROR"
                dic['msg'] = "学院不存在"
                dic = json.dumps(dic)
                return HttpResponse(dic)     
            if majEX.exists() == 0 :
                dic['status'] = "ERROR"
                dic['msg'] = "专业不存在"
                dic = json.dumps(dic)
                return HttpResponse(dic)
            else :
                dic['status'] = "SUCCESS"
                dic['msg'] = ""
                dic = json.dumps(dic)
            userX = models.student.objects.get(std_id = userID)
            userX.std_name = name
            userX.std_sex = sex
            userX.aca_id = models.department.objects.get(aca_name = aca)
            userX.maj_id = models.major.objects.get(maj_name = maj).maj_id
            userX.std_grade = grade
            userX.std_class = clss
            userX.save()
            return HttpResponse(dic)
        #【教师】
        if status == 'tea' or status == 'adm' :
            name = received_json_data['name']
            sex = received_json_data['sex']
            aca = received_json_data['ace']
            acaEX = models.department.objects.filter(aca_name = aca)
            if acaEX.exists() == 0 :
                dic['status'] = "ERROR"
                dic['msg'] = "学院不存在"
                dic = json.dumps(dic)
                return HttpResponse(dic) 
            else :
                dic['status'] = "SUCCESS"
                dic['msg'] = ""
                dic = json.dumps(dic)
            userX = models.teacher.objects.get(tea_id = userID)
            userX.tea_name = name
            userX.tea_sex = sex
            userX.aca_id = models.department.objects.get(aca_name = aca)
            userX.save()
            return HttpResponse(dic)

#课程 【学生】
 #查看课程 初始化
def course_init(request):
    if request.method == 'POST': 
        received_json_data = json.loads(request.body)
        dic={}
        userID = received_json_data['userID'] 
        opt = received_json_data['opt']
        #已选课程
        if opt == 'chosen':
            choX = models.selectcourse.objects.filter(std_id = userID)
            cidList = []
            begList = []
            scoreList = []
            yearList = []
            termList = []
            teaList = []
            cnameList = []
            fidList = []
            creList = []
            for choI in choX:
                cidList.append(str(choI.cou_id.cou_id))
                if choI.cou_score == None :
                    scoreList.append('')
                else :
                    scoreList.append(str(choI.cou_score))
                begList.append(choI.beg_id)
                begI = models.setupcourse.objects.get(Q(cou_id = choI.cou_id)&Q(beg_id = choI.beg_id))
                yearList.append(int(begI.beg_term / 10))
                termI=(begI.beg_term % 10)
                if termI == 1 :
                    termList.append('上半学期') 
                if termI == 2 :
                    termList.append('下半学期')
                if termI == 3 :
                    termList.append('寒假学期')
                if termI == 4 :
                    termList.append('暑假学期')
                teaList.append(begI.tea_id.tea_name)
                cnameList.append(choI.cou_id.cou_name)
                if choI.cou_id.cou_fid == None or choI.cou_id.cou_fid == '':
                    fidList.append('')
                else :
                    fidList.append(models.course.objects.get(cou_id = choI.cou_id.cou_fid).cou_name)
                creList.append(choI.cou_id.cou_credit)
            dic['sum'] = choX.count()
            dic['cid'] = cidList
            dic['score'] = scoreList
            dic['year'] = yearList
            dic['term'] = termList
            dic['tea'] = teaList
            dic['cname'] = cnameList
            dic['fid'] = fidList
            dic['cre'] = creList
            dic['beg'] = begList
            dic = json.dumps(dic)
            return HttpResponse(dic)
        #未选课程
        elif opt == 'choice':
            begX = models.setupcourse.objects.all()
            cidList = []
            begList = []
            yearList = []
            termList = []
            teaList = []
            cnameList = []
            fidList = []
            creList = []
            cnt=0
            for begI in begX:
                choX = models.selectcourse.objects.filter(Q(cou_id = begI.cou_id)&Q(beg_id = begI.beg_id))
                choiceI = 0
                for choI in choX:
                    if choI.std_id.std_id == userID:
                        choiceI = 1
                        break
                if choiceI == 0:
                    cidList.append(str(begI.cou_id.cou_id))
                    cnt = cnt+1
                else:
                    continue
                yearList.append(int(begI.beg_term / 10))
                termI=(begI.beg_term % 10)
                if termI == 1 :
                    termList.append('上半学期') 
                if termI == 2 :
                    termList.append('下半学期')
                if termI == 3 :
                    termList.append('寒假学期')
                if termI == 4 :
                    termList.append('暑假学期')
                teaList.append(begI.tea_id.tea_name)
                cnameList.append(begI.cou_id.cou_name)
                if begI.cou_id.cou_fid == None or begI.cou_id.cou_fid == '':
                    fidList.append('')
                else :
                    fidList.append(models.course.objects.get(cou_id = begI.cou_id.cou_fid).cou_name)
                creList.append(begI.cou_id.cou_credit)
                begList.append(begI.beg_id)
            dic['sum'] = cnt
            dic['cid'] = cidList
            dic['year'] = yearList
            dic['term'] = termList
            dic['tea'] = teaList
            dic['cname'] = cnameList
            dic['fid'] = fidList
            dic['cre'] = creList
            dic['beg'] = begList
            dic = json.dumps(dic)
            return HttpResponse(dic)
 #选退课程 提交
def course_sub(request):
    if request.method == 'POST': 
        received_json_data = json.loads(request.body)
        dic={}
        userID = received_json_data['userID']
        beg = received_json_data['beg']
        cid = received_json_data['cid']
        opt = received_json_data['opt']
        #选课
        if opt == 'choice' :
            choX = models.selectcourse(cbs_id = str(cid+beg+userID), std_id = models.student.objects.get(std_id = userID), beg_id = int(beg), cou_id = models.course.objects.get(cou_id = cid))
            choX.save()
            dic['status'] = "SUCCESS"
            dic['msg'] = ""
            dic = json.dumps(dic)
            return HttpResponse(dic)
        #退课
        elif opt == 'drop' :
            choX = models.selectcourse.objects.get(Q(cou_id = cid)&Q(beg_id = int(beg))&Q(std_id = userID))
            if choX.cou_score != None :
                dic['status'] = "ERROR"
                dic['msg'] = "该课程已结课"
                dic = json.dumps(dic)
                return HttpResponse(dic)  
            choX.delete()
            dic['status'] = "SUCCESS"
            dic['msg'] = ""
            dic = json.dumps(dic)
            return HttpResponse(dic)
        else :
            dic['status'] = "ERROR"
            dic['msg'] = "异常：操作错误，请联系管理员"
            dic = json.dumps(dic)
            return HttpResponse(dic) 
 #查看奖惩 初始化
def rewpun_init(request):
    if request.method == 'POST': 
        received_json_data = json.loads(request.body)
        dic={}
        userID = received_json_data['userID']
        opt = received_json_data['opt']
        if opt == 'r':
            opt = "奖项"
        else:
            opt = "惩罚"
        ropX = models.rap.objects.filter(Q(std_id = userID)&Q(rap_rop = opt))
        rapidList = []
        nameList = []
        levelList = []
        yearList = []
        elsList = []
        for ropI in ropX:
            rapidList.append(ropI.rap_id)
            nameList.append(ropI.rap_name)
            levelList.append(ropI.rap_level)
            yearList.append(ropI.rap_year)
            elsList.append(ropI.rap_else)
        dic['sum'] = ropX.count()
        dic['rapid'] = rapidList
        dic['name'] = nameList
        dic['level'] = levelList
        dic['year'] = yearList
        dic['els'] = elsList
        dic = json.dumps(dic)
        return HttpResponse(dic)

#课程管理 【教师】
 #课程信息 初始化
def courseMng_init(request):
    if request.method == 'POST': 
        received_json_data = json.loads(request.body)
        dic={}
        cidList = []
        cnameList = []
        fidList = []
        creList = []
        couX = models.course.objects.all()
        for couI in couX:
            cidList.append(couI.cou_id)
            cnameList.append(couI.cou_name)
            if couI.cou_fid!=None and models.course.objects.filter(cou_id = couI.cou_fid).exists()!=0:
                fidList.append(models.course.objects.get(cou_id = couI.cou_fid).cou_name)
            else:
                fidList.append("")
            creList.append(couI.cou_credit)
        dic['sum'] = couX.count()
        dic['cid'] = cidList
        dic['cname'] = cnameList
        dic['fid'] = fidList
        dic['cre'] = creList
        dic = json.dumps(dic)
        return HttpResponse(dic) 
 #新增课程
def courseInc_sub(request):
    if request.method == 'POST': 
        received_json_data = json.loads(request.body)
        dic={}
        cid = received_json_data['cid']
        cname = received_json_data['cname']
        fid = received_json_data['fid']
        cre = received_json_data['cre']
        cidEX = models.course.objects.filter(cou_id = cid)
        fidEX = models.course.objects.filter(cou_name = fid)
        if cidEX.exists() == 1:
            dic['status'] = "ERROR"
            dic['msg'] = "课程号已存在"
            dic = json.dumps(dic)
            return HttpResponse(dic)
        elif fidEX.exists() == 0:
            if fid!='':
                dic['status'] = "ERROR"
                dic['msg'] = "先导课不存在"
                dic = json.dumps(dic)
                return HttpResponse(dic)
            else:
                fid = None
        if fid != None:
            fid = models.course.objects.get(cou_name = fid).cou_id
        else:
            fid = None
        couN = models.course(cou_id = cid, cou_name = cname, cou_fid = fid, cou_credit = cre)
        couN.save()
        dic['status'] = "SUCCESS"
        dic['msg'] = ""
        dic = json.dumps(dic)
        return HttpResponse(dic)
 #修改课程
def courseMod_sub(request):
    if request.method == 'POST': 
        received_json_data = json.loads(request.body)
        dic={}
        cid = received_json_data['cid']
        cname = received_json_data['cname']
        fid = received_json_data['fid']
        cre = received_json_data['cre']
        fidEX = models.course.objects.filter(cou_name = fid)
        if fidEX.exists() == 0 :
            dic['status'] = "ERROR"
            dic['msg'] = "先导课不存在"
            dic = json.dumps(dic)
            return HttpResponse(dic)
        couX = models.course.objects.get(cou_id = cid)
        couX.cou_name = cname
        if fid != None and fid != '':
            couX.cou_fid = models.course.objects.get(cou_name = fid).cou_id
        else:
            couX.cou_fid = None
        couX.cou_credit = cre
        couX.save()
        dic['status'] = "SUCCESS"
        dic['msg'] = ""
        dic = json.dumps(dic)
        return HttpResponse(dic)
 #课程开课
#开课
def courseBeg_sub(request):
    if request.method == 'POST': 
        received_json_data = json.loads(request.body)
        dic={}
        userID = received_json_data['userID']
        cid = received_json_data['cid']
        year = received_json_data['year']
        term = received_json_data['term']
        begX = models.setupcourse.objects.filter(cou_id=cid)
        maxid = 0
        for begI in begX : 
            if begI.beg_id > maxid :
                maxid = begI.beg_id
        term = str(year)+str(term)
        idd = str(cid)+str(maxid+1)
        cid = models.course.objects.get(cou_id=cid)
        tea = models.teacher.objects.get(tea_id=userID)
        begN = models.setupcourse(coubeg_id = idd, cou_id = cid, beg_id = maxid+1, beg_term = term, tea_id = tea)
        begN.save()
        dic['status'] = "SUCCESS"
        dic['msg'] = ""
        dic = json.dumps(dic)
        return HttpResponse(dic)


#学生管理 【教师】
 #学生信息 初始化
def studentMng_init(request):
    if request.method == 'POST': 
        received_json_data = json.loads(request.body)
        dic={}
        userX = models.student.objects.all()
        nameList = []
        sidList = []
        sexList = []
        ageList = []
        acaList = []
        majList = []
        gradeList = []
        clssList = []
        srewList = []
        spunList = []
        for userI in userX :
            nameList.append(userI.std_name)
            sidList.append(userI.std_id)
            sexList.append(userI.std_sex)
            ageList.append(2020-userI.std_age.year)
            acaList.append(userI.aca_id.aca_name)
            majList.append(models.major.objects.get(Q(aca_id = userI.aca_id.aca_id)&Q(maj_id = userI.maj_id)).maj_name)
            gradeList.append(userI.std_grade)
            clssList.append(userI.std_class)
            srewList.append(models.rap.objects.filter(Q(std_id = userI.std_id)&Q(rap_rop = "奖项")).count())
            spunList.append(models.rap.objects.filter(Q(std_id = userI.std_id)&Q(rap_rop = "惩罚")).count())
        dic['sum'] = userX.count()
        dic['name'] = nameList
        dic['sid'] = sidList
        dic['sex'] = sexList
        dic['age'] = ageList
        dic['aca'] = acaList
        dic['maj'] = majList
        dic['grade'] = gradeList
        dic['clss'] = clssList
        dic['srew'] = srewList
        dic['spun'] = spunList
        dic = json.dumps(dic)
        return HttpResponse(dic)
 #注册学生
def studentInc_sub(request):
    if request.method == 'POST': 
        received_json_data = json.loads(request.body)
        dic={}
        sid = received_json_data['sid']
        name = received_json_data['name']
        sex = received_json_data['sex']
        brth = received_json_data['brth']
        aca = received_json_data['ace']
        maj = received_json_data['maj']
        grade = received_json_data['grade']
        clss = received_json_data['clss']
        ebr = received_json_data['ebr']
        idcrd = received_json_data['idcrd']
        userEX = models.student.objects.filter(std_id = sid)
        if userEX.exists() == 1 :
            dic['status'] = "ERROR"
            dic['msg'] = "学号已存在"
            dic = json.dumps(dic)
            return HttpResponse(dic)
        acaEX = models.department.objects.filter(aca_name = aca)
        if acaEX.exists() == 0 :
            dic['status'] = "ERROR"
            dic['msg'] = "学院不存在"
            dic = json.dumps(dic)
            return HttpResponse(dic)
        aca = models.department.objects.get(aca_name = aca)
        majEX = models.major.objects.filter(Q(maj_name = maj)&Q(aca_id = aca.aca_id))
        if majEX.exists() == 0 :
            dic['status'] = "ERROR"
            dic['msg'] = "专业不存在"
            dic = json.dumps(dic)
            return HttpResponse(dic)
        maj = models.major.objects.get(maj_name = maj).maj_id
        if brth != None and brth != '':
            brth = datetime.strptime(brth, '%Y%m%d')
            brth = brth.date()
        if grade == '':
            grade = None
        if clss == '':
            clss = None   
        ebr = datetime.strptime(ebr, '%Y%m%d')
        ebr = ebr.date()
        stdN = models.student(std_id = sid, std_name = name, std_sex = sex, std_age = brth, std_date = ebr, aca_id = aca, maj_id = maj, std_grade = grade, std_class = clss, std_IDcard = idcrd)
        stdN.save()
        dic['status'] = "SUCCESS"
        dic['msg'] = ""
        dic = json.dumps(dic)
        return HttpResponse(dic)
 #录入奖惩
def studentRewPun_sub(request):
    if request.method == 'POST': 
        received_json_data = json.loads(request.body)
        dic={}
        opt = received_json_data['opt']
        sid = received_json_data['sid']
        rop = received_json_data['rop']
        level = received_json_data['level']
        year = received_json_data['year']
        els = received_json_data['els']
        maxid = 0
        for rapI in models.rap.objects.all():
            if maxid < rapI.rap_id:
                maxid = rapI.rap_id
        if opt == 'r':
            opt = "奖项"
        else:
            opt = "惩罚"
        sid = models.student.objects.get(std_id = sid)
        rapN = models.rap(rap_id = maxid+1, std_id = sid, rap_rop = opt, rap_name = rop, rap_level = level, rap_year = int(year), rap_else = els)
        rapN.save()
        dic['status'] = "SUCCESS"
        dic['msg'] = ""
        dic = json.dumps(dic)
        return HttpResponse(dic)

#成绩管理 【教师】
 #开课信息
def scoreBeg_init(request):
    if request.method == 'POST': 
        received_json_data = json.loads(request.body)
        dic={}
        userID = received_json_data['userID']
        begX = models.setupcourse.objects.filter(tea_id = userID)
        cidList = []
        begList = []
        cnameList = []
        yearList = []
        termList = []
        fidList = []
        creList = []
        for begI in begX :
            cidList.append(begI.cou_id.cou_id)
            begList.append(begI.beg_id)
            cnameList.append(begI.cou_id.cou_name)
            yearList.append(int(begI.beg_term/10))
            termList.append(begI.beg_term)
            fid = begI.cou_id.cou_fid
            if fid != None and fid != '' :
                fid = models.course.objects.get(cou_id = fid).cou_name
            else :
                fid = ''
            fidList.append(fid)
            creList.append(begI.cou_id.cou_credit)
        dic['sum'] = begX.count()
        dic['cid'] = cidList
        dic['beg'] = begList
        dic['cname'] = cnameList
        dic['year'] = yearList
        dic['term'] = termList
        dic['fid'] = fidList
        dic['cre'] = creList
        dic = json.dumps(dic)
        return HttpResponse(dic)
 #选课学生
def scoreCho_init(request):
    if request.method == 'POST': 
        received_json_data = json.loads(request.body)
        dic={}
        cid = received_json_data['cid']
        beg = received_json_data['beg']
        choX = models.selectcourse.objects.filter(Q(cou_id = cid)&Q(beg_id = beg))
        sidList = []
        nameList = []
        scoreList = []
        for choI in choX :
            sidList.append(str(choI.std_id.std_id))
            nameList.append(choI.std_id.std_name)
            score=choI.cou_score
            if score != None and score != '' :
                score = score
            else :
                score = ''
            scoreList.append(score)
        dic['sum'] = choX.count()
        dic['sid'] = sidList
        dic['name'] = nameList
        dic['score'] = scoreList
        dic = json.dumps(dic)
        return HttpResponse(dic)
#录入成绩
def scoreStd_sub(request):
    if request.method == 'POST': 
        received_json_data = json.loads(request.body)
        dic={}
        sid = received_json_data['sid']
        cid = received_json_data['cid']
        beg = received_json_data['beg']
        score = received_json_data['score']
        choN = models.selectcourse.objects.get(Q(std_id = sid)&Q(cou_id = cid)&Q(beg_id = beg))
        choN.cou_score = score
        choN.save()
        dic['status'] = "SUCCESS"
        dic['msg'] = ""
        dic = json.dumps(dic)
        return HttpResponse(dic)

#新增专业
def majorInc_sub(request):
    if request.method == 'POST': 
        received_json_data = json.loads(request.body)
        dic={}
        aca = received_json_data['aca']
        name = received_json_data['name']
        addr = received_json_data['addr']
        acaEX = models.department.objects.filter(aca_name = aca)
        if acaEX.exists() == 0 :
            dic['status'] = "ERROR"
            dic['msg'] = "学院不存在"
            dic = json.dumps(dic)
            return HttpResponse(dic)
        aca=acaEX.first().aca_id
        majX = models.major.objects.filter(aca_id = aca)
        maxid = 0
        for majI in majX : 
            if int(majI.maj_id) > maxid :
                maxid = int(majI.maj_id)
        maxid = int(maxid)+1
        maxid = '00'+str(maxid)
        idd = str(aca)+str(maxid)
        aca = models.department.objects.get(aca_id = aca)
        majN = models.major(acamaj_id = idd, aca_id = aca, maj_id = maxid, maj_name = name, maj_location = addr)
        majN.save()
        dic['status'] = "SUCCESS"
        dic['msg'] = ""
        dic = json.dumps(dic)
        return HttpResponse(dic)

#专业
def majorMng_init(request):
    if request.method == 'POST': 
        received_json_data = json.loads(request.body)
        dic={}
        majX = models.major.objects.all()
        acanameList = []
        nameList = []
        addrList = []
        idList = []
        for majI in majX :
            acanameList.append(majI.aca_id.aca_name)
            nameList.append(majI.maj_name)
            addrList.append(majI.maj_location)
            idList.append(majI.acamaj_id)
        dic['sum'] = majX.count()
        dic['aca'] = acanameList
        dic['maj'] = nameList
        dic['addr'] = addrList
        dic['id'] = idList
        dic = json.dumps(dic)
        return HttpResponse(dic)

#修改专业
def majormod_sub(request):
    if request.method == 'POST': 
        received_json_data = json.loads(request.body)
        dic={}
        mid = received_json_data['id']
        maj = received_json_data['maj']
        addr = received_json_data['addr']
        majX = models.major.objects.get(acamaj_id = mid)
        majX.maj_name = maj
        majX.maj_location = addr
        majX.save()
        dic['status'] = "SUCCESS"
        dic['msg'] = ""
        dic = json.dumps(dic)
        return HttpResponse(dic)

