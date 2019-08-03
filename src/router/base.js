import ChangePass from '../views/base/ChangePass.vue'
import ClassManage from '../views/base/ClassManage.vue'
import StudentManage from '../views/base/StudentManage.vue'
import TeacherManage from '../views/base/TeacherManage.vue'
export default
    [
        {
            path: '/ChangePass',
            name: ChangePass,
            components:{
                right:ChangePass
            }
        },
        {
            path: '/ClassManage',
            name:  ClassManage,
            components:{
                right: ClassManage
            }
        },
        {
            path: '/StudentManage',
            name: StudentManage,
            components:{
                right:StudentManage
            }
        },
        {
            path: '/TeacherManage',
            name: TeacherManage,
            components:{
                right:TeacherManage
            }
        }

    ]
