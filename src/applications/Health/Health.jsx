import { useMemo } from 'react'
import { cn } from '@/lib/utils'
import { differenceInYears } from 'date-fns'
const Gender = {
    MALE: 0,
    FEMALE: 1,
}
const Health = ({ className }) => {
    const gender = Gender.MALE
    const age = useMemo(() => {
        return differenceInYears(new Date(), new Date('1994-09-27'))
    }, [])
    const height = 176
    const weight = 65

    const neckCircumference = 36
    const chestCircumference = 0 // https://zh.wikihow.com/%E6%B5%8B%E9%87%8F%E8%83%B8%E5%9B%B4
    const waistCircumference = 81 // https://zh.wikihow.com/%E6%B5%8B%E9%87%8F%E8%85%B0%E5%9B%B4
    const hipCircumference = 0 // https://zh.wikihow.com/%E6%B5%8B%E9%87%8F%E8%87%80%E5%9B%B4
    const proximalThighCircumference = 0

    const shoulderWidth = 0

    // BMI = weight / (height * height)   kg / m
    const BMI = useMemo(() => {
        return (weight / (height / 100) ** 2).toFixed(2)
    }, [weight, height])

    // https://en.wikipedia.org/wiki/Body_fat_percentage
    // Navy Body Fat Calculator Equations
    // Men: 86.010 x log10 (abdomen - neck) - 70.041 x log10 (height) + 36.76
    // Women: 163.205 x log10 (waist + hip - neck) - 97.684 x log10 (height) - 78.387.
    const bodyFatPercentage = useMemo(() => {
        // 0 male 1 female
        if (
            waistCircumference == 0 ||
            neckCircumference == 0 ||
            (gender == Gender.FEMALE && hipCircumference == 0) ||
            weight == 0 ||
            height == 0
        )
            return 0
        let bfp
        if (gender == Gender.MALE) {
            bfp =
                86.01 * Math.log10(waistCircumference - neckCircumference) -
                70.041 * Math.log10(height) +
                36.76
        } else {
            bfp =
                163.205 *
                    Math.log10(
                        waistCircumference +
                            hipCircumference -
                            neckCircumference
                    ) -
                97.684 * Math.log10(height) -
                78.387
        }
        return bfp.toFixed(2)
    }, [
        weight,
        height,
        neckCircumference,
        waistCircumference,
        hipCircumference,
        gender,
    ])

    // Harris-Benedict
    // Miffin-StJeor
    // Katch-McArdle
    const BMR = useMemo(() => {
        if (height == 0 || weight == 0) return 0
        if (gender == Gender.MALE) {
            return 66.5 + weight * 13.75 + height * 5.003 - age * 6.75
        } else {
            return 655.1 + weight * 9.563 + height * 1.85 - age * 4.676
        }
    }, [gender, height, age, weight])

    const pillowHeight = useMemo(() => {
        return 0.167 * shoulderWidth + 4.633
    }, [shoulderWidth])

    return (
        <div className={cn('px-4 text-lg', className)}>
            <p>年龄：{age}</p>
            <p title="Height — make sure you stand up straight and barefoot">
                身高：{height} cm
            </p>
            <p>体重：{weight} KG</p>
            <p title="Neck — the circumference should be measured just underneath the larynx (Adam's apple).">
                颈围：{neckCircumference} cm
            </p>
            <p>胸围：{chestCircumference} cm</p>
            <p title="should be measured horizontally, around the narrowest part of the abdomen for women and at the navel level for men.">
                腰围：{waistCircumference} cm
            </p>
            <p></p>
            <p title="should be measured at the widest part of the buttocks or hip.">
                臀围：{hipCircumference} cm
            </p>
            <p>腿围：{proximalThighCircumference} cm （大腿近端）</p>
            <p>BMI：{BMI}</p>
            <p>体脂率 BFP（估算）：{bodyFatPercentage}%</p>
            <p>最大心率：{220 - age} BPM</p>
            <p>
                最佳燃脂心率：{Math.floor((220 - age) * 0.6)} ~{' '}
                {Math.ceil((220 - age) * 0.8)} BPM
            </p>
            <p title="Harris-Benedict 法估算">基础代谢率 BMR：{BMR} kcal/d</p>
            <p>每日推荐营养摄入量</p>
            <p>碳水化合物：</p>
            <p>脂肪：</p>
            <p>蛋白质：</p>
            <p>水：</p>
            <p title="男性不高于12.36cm 女性不高于10.95cm，枕头压缩高度6-7cm">
                枕头高度：{pillowHeight}cm{' '}
            </p>
        </div>
    )
}
export default Health
