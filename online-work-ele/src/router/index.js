import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import login from '@/components/login'
import register from '@/components/register'

//student
import student from '@/components/student/student'
import stuInfo from '@/components/student/student-info'
import subJob from '@/components/student/submitJob'
import jobInfo from '@/components/student/job-info'
import changePasswordByS from '@/components/student/change-passwordByS'

//admin
import admin from '@/components/admin/admin'
import adminInfo from '@/components/admin/admin-info'
import teacherMan from '@/components/admin/teacher-man'
import addTeacher from '@/components/admin/add-teacher'
import changePassT from '@/components/admin/change-pass-t'
import classMan from '@/components/admin/class-man'
import addClass from '@/components/admin/add-class'
import changePassword from '@/components/admin/change-password'
import studentMan from '@/components/admin/student-man'
import addStudent from '@/components/admin/add-student'
import changePassS from '@/components/admin/change-pass-s'
import addNotice from '@/components/admin/notice-add'
import noticeMan from '@/components/admin/notice-man'

//teacher
import teacher from '@/components/teacher/teacher'
import teaInfo from '@/components/teacher/teacher-info'
import subjobInfo from '@/components/teacher/subjob-info'
// import read from '@/components/teacher/read'
import publishJob from '@/components/teacher/publish-job'
import changePasswordByT from '@/components/teacher/change-password'
import publishJobInfo from '@/components/teacher/publishJob-info'
import viewScore from '@/components/teacher/viewScore'

Vue.use(Router)

export default new Router({
  //改掉用#跳转的问题
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
    },
    // 登录页面
    {
      path: '/login',
      name: 'login',
      component: login
    },
    // 注册页面
    {
      path: '/register',
      name: 'register',
      component: register
    },
    // 学生端界面
    {
      path: '/student',
      name: 'student',
      component: student,
      children: [
        // 学生个人信息
        {
          path:'/student/stuInfo',
          name: 'stuInfo',
          component: stuInfo
        },
        // 查看作业
        {
          path: '/student/jobInfo',
          name: 'jobInfo',
          component: jobInfo
        },
        // 提交作业
        {
          path:'/student/subJob',
          name: 'subJob',
          component: subJob
        },
        //修改密码
        {
          path: '/student/changePasswordByS',
          name: 'changePasswordByS',
          component: changePasswordByS 
        }

      ]
    },
    // 管理员端界面
    {
      path: '/admin',
      name: 'admin',
      component: admin,
      children: [
        // 管理员信息
        {
          path: '/admin/adminInfo',
          name: 'adminInfo',
          component: adminInfo
        },
        // 教师信息
        {
          path: '/admin/teacherMan',
          name: 'teacherMan',
          component: teacherMan,
        },
        //添加教师
        {
          path: '/admin/addTeacher',
          name: 'addTeacher',
          component: addTeacher
        },
        //修改教师密码
        {
          path: '/admin/changePassT',
          name: 'changePassT',
          component: changePassT
        },
        // 班级信息
        {
          path: '/admin/classMan',
          name: 'classMan',
          component: classMan
        },
        //添加班级
        {
          path: '/admin/addClass',
          name: 'addClass',
          component: addClass
        },
        //修改密码
        {
          path: '/admin/changePassword',
          name: 'changePassword',
          component: changePassword
        },
        //学生信息
        {
          path: '/admin/studentMan',
          name: 'studentMan',
          component: studentMan
        },
        //添加学生
        {
          path: '/admin/addStudent',
          name: 'addStudent',
          component: addStudent
        },
        //修改学生密码
        {
          path: '/admin/changePassS',
          name: 'changePassS',
          component: changePassS
        },
        //添加公告
        {
          path: '/admin/addNotice',
          name: 'addNotice',
          component: addNotice
        },
        //查看公告
        {
          path: '/admin/noticeMan',
          name: 'noticeMan',
          component: noticeMan
        }
      ]
    },
    //教师端
    {
      path: '/teacher',
      name: 'teacher',
      component: teacher,
      children: [
        //查看教师信息
        {
          path: '/teacher/teaInfo',
          name: 'teaInfo',
          component: teaInfo
        },
        //查看作业
        {
          path: '/teacher/subjobInfo',
          name: 'subjobInfo',
          component: subjobInfo,
          // children: [
          //   {
          //     path: '/teacher/subjobInfo/read',
          //     name: 'read',
          //     component: read
          //   }
          // ]
        },
        // 查看成绩
        {
          path: '/teacher/viewScore',
          name: 'viewScore',
          component: viewScore
        },
        //发布作业
        {
          path: '/teacher/publishJob',
          name: 'publishJob',
          component: publishJob
        },
        // 查看发布的作业
        { 
          path: '/teacher/publishJobInfo',
          name: 'publishJobInfo',
          component: publishJobInfo
        },
        //修改密码
        {
          path: '/teacehr/changePasswordByT',
          name: 'changePasswordByT',
          component: changePasswordByT
        }
      ]
    }
  ]
})
