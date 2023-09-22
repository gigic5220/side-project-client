export const useProgressBar = (step: number) => {
    const getProgressAnimationWidth = () => {
        let result = {
            from: '',
            to: ''
        }
        switch (step) {
            case 1:
                result.from = '0%'
                result.to = '33%'
                break
            case 2:
                result.from = '33%'
                result.to = '66%'
                break
            case 3:
                result.from = '66%'
                result.to = '99%'
                break
            default:
                result.from = '99%'
                result.to = '100%'
                break
        }
        return result
    }

    const getProgressAnnounceMessage = () => {
        if (step === 1) {
            return '가입을 위한 최소한의 정보만 부탁드릴게요!'
        } else if (step === 2) {
            return '가입이 거의 완료되었어요!'
        } else {
            return '마지막이에요!'
        }
    }

    return {
        announceMessage: getProgressAnnounceMessage(),
        progressAnimationWidth: getProgressAnimationWidth()
    }
}