from django.urls import path

from message import views

urlpatterns = [
#登录Login
    path('LoginServlet/',views.login),
#个人中心Home
    path('HomeINIT/',views.home_init),
    path('HomeSUB/',views.home_sub),
#课程course【学生】
    path('CourseINIT/',views.course_init),
    path('CourseSUB/',views.course_sub),
    path('RewOrPunINIT/',views.rewpun_init),
#课程管理 【教师】
    #课程管理
    path('CourseMngINIT/',views.courseMng_init),
    #新增课程
    path('CourseIncSUB/',views.courseInc_sub),
    #修改课程
    path('CourseModSUB/',views.courseMod_sub),
    #课程开课
    path('CourseBegSUB/',views.courseBeg_sub),
#学生管理 【教师】
    #学生管理初始化
    path('StudentMngINIT/',views.studentMng_init),
    #注册学生
    path('StudentIncSUB/',views.studentInc_sub),
    #录入奖惩
    path('StudentRawPunSUB/',views.studentRewPun_sub),
#成绩 【教师】
    path('ScoreCouBegINIT/',views.scoreBeg_init),
    path('ScoreCouChoINIT/',views.scoreCho_init),
    path('ScoreStuSUB/',views.scoreStd_sub),
#专业管理
    #专业管理初始化
    path('MajorMngINIT/',views.majorMng_init),
    #录入专业
    path('MajorIncSUB/',views.majorInc_sub),
    path('MajorModSUB/',views.majormod_sub),
]