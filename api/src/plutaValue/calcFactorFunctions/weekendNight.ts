import sinusoidalBonusBetweenHours from "./sinusoidalBonusBetweenHours";

export default function weekendNight(time: number, day: number): number {
    if ( 5 <= day && day <= 7 ) {

        if (1800 <= time && time <= 2100) {
            if (day == 5 || day == 6) {
                return sinusoidalBonusBetweenHours(time, 1800, 2400, 1)
            }

        } else if (2100 <= time && time <= 2400) {
            if (day == 5 || day == 6) {
                return 1
            }

        } else if (0 <= time && time <= 200) {
            if (day == 6 || day == 7) {
                return 1
            }

        } else if (200 <= time && time <= 400) {
            if (day == 6 || day == 7) {
                return sinusoidalBonusBetweenHours(time, 0, 400, 1)
            }
        }
    }

    return 0
}