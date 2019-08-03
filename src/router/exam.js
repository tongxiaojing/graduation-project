import NewExam from '../views/exam/NewExam.vue'
import MarkPaper from '../views/exam/MarkPaper.vue'
import ExamManage from '../views/exam/ExamManage.vue'
import Score from '../views/exam/Score.vue'
import ExamArrange from '../views/exam/ExamArrange.vue'
export default 
   [
        {
            path: '/NewExam',
            name: NewExam,
            components:{
                right:NewExam
            }
        },
        {
            path: '/MarkPaper',
            name: MarkPaper,
            components:{
                right:MarkPaper
            }
        },
        {
            path: '/ExamManage',
            name: ExamManage,
            components:{
                right:ExamManage
            }
        },
        {
            path: '/Score',
            name: Score,
            components:{
                right:Score
            }
        },
        {
            path: '/ExamArrange',
            name: ExamArrange,
            components:{
                right:ExamArrange
            }
        }
    ]
