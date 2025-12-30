import * as Calculator from '@/applications/Calculator'
import * as Clock from '@/applications/Clock'
import * as Downloader from '@/applications/Downloader'
import * as ImageClipper from '@/applications/ImageCropper'
import * as Reminders from '@/applications/Reminders'
import * as TextProcessor from '@/applications/TextProcessor'
import * as VocabularyBook from '@/applications/VocabularyBook'
import * as DailyTrace from '@/applications/DailyTrace'
import * as ArithmeticPractice from '@/applications/ArithmeticPractice'
import * as CalligraphyCopybook from '@/applications/CalligraphyCopybook'
import * as Health from '@/applications/Health'
import * as ZhiLeMe from '@/applications/ZhiLeMe'
// import * as CubeNet from '@/applications/CubeNet'
import * as FlashCard from '@/applications/FlashCard'
import * as Gallery from '@/applications/Gallery'
import * as QuickNote from '@/applications/QuickNote'

export const applications = {
    Reminders,
    Calculator,
    Clock,
    ArithmeticPractice,
    CalligraphyCopybook,
    DailyTrace,
    QuickNote,
    Gallery,
    Health,
    ZhiLeMe,
    VocabularyBook,
    TextProcessor,
    ImageClipper,
    FlashCard,
    Downloader,
}
export default Object.values(applications)
