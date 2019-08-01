import ChangePass from '../views/base/ChangePass.vue'
import ClassManage from '../views/base/ClassManage.vue'
import StudentManage from '../views/base/StudentManage.vue'
import TeacherManage from '../views/base/TeacherManage.vue'
export default
    [
        {
            path: '/ChangePass',
            component: ChangePass
        },
        {
            path: '/ClassManage',
            component: ClassManage
        },
        {
            path: '/StudentManage',
            component: StudentManage
        },
        {
            path: '/TeacherManage',
            component: TeacherManage
        }

    ]