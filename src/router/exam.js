import NewExam from '../views/exam/NewExam.vue'
import MarkPaper from '../views/exam/MarkPaper.vue'
import ExamManage from '../views/exam/ExamManage.vue'
import Score from '../views/exam/Score.vue'
import ExamArrange from '../views/exam/ExamArrange.vue'
export default 
   [
        {
            path: '/NewExam',
            components:{
                right:NewExam
            }
        },
        {
            path: '/MarkPaper',
            components:{
                right:MarkPaper
            }
        },
        {
            path: '/ExamManage',
            components:{
                right:ExamManage
            }
        },
        {
            path: '/Score',
            components:{
                right:Score
            }
        },
        {
            path: '/ExamArrange',
            components:{
                right:ExamArrange
            }
        }
    ]
