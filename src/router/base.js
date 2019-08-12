import ChangePass from '../views/base/ChangePass.vue'
import ClassManage from '../views/base/ClassManage.vue'
import StudentManage from '../views/base/StudentManage.vue'
import TeacherManage from '../views/base/TeacherManage.vue'
import RoleManage from '../views/base/RoleManage.vue'
export default
    [
        {
            path: '/ChangePass',
            components:{
                right:ChangePass
            }
        },
        {
            path: '/ClassManage',
            components:{
                right: ClassManage
            }
        },
        {
            path: '/StudentManage',
            components:{
                right:StudentManage
            }
        },
        {
            path: '/TeacherManage',
            components:{
                right:TeacherManage
            }
        },
        {
            path: '/RoleManage',
            components:{
                right:RoleManage
            }
        }

    ]
