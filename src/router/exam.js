import NewExam from '../views/exam/NewExam.vue'
import MarkPaper from '../views/exam/MarkPaper.vue'
import ExamManage from '../views/exam/ExamManage.vue'
import Score from '../views/exam/Score.vue'
import ExamArrange from '../views/exam/ExamArrange.vue'
export default 
   [
        {
            path: '/NewExam',
            component: NewExam
        },
        {
            path: '/MarkPaper',
            component: MarkPaper
        },
        {
            path: '/ExamManage',
            component: ExamManage
        },
        {
            path: '/Score',
            component: Score
        },
        {
            path: '/ExamArrange',
            component: ExamArrange
        }
    ]
