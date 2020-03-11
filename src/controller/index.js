import { JSONtoJS, JSToJSON } from "../utils"

export default class Controller {
  constructor() {
    this._frames = null
    this._score = 0
    this._frameNumber = 0
    this._rolls = []
    this._results = []
  }

  set frames(frames = []) {
    this._frames = frames && JSONtoJS(frames)?.frames
  }

  get frameNumber() {
    return this._frameNumber
  }

  nextFrame() {
    if(this._frameNumber >= 10) return
    this._frameNumber += 1
  }

  isStrike(frame) {
    return this._frames[frame].first === 10
  }

  isSpare(frame) {
    return (this._frames[frame].first + this._frames[frame].second) === 10
  }

  isLastRoll(frame) {
    return frame === 9
  }

  /**
   * Получение счета следующего фрейма при выбивании страйка
   * Если в следующем фрейме так же страйк то считается еще один фрейм как второй бросок
   *
   * @param {*} frame - номер фрейма
   * @param {number} [d=0] - номер рекурсии для расчета последовательных страйков, макс глубина 2 - страйк + еще 2 последовательных страйка
   * @returns
   * @memberof Controller
   */
  strikeExtraScore(frame, d = 0) {
      const nextFrame = this._frames[frame + 1]
      if(!nextFrame) return 0
      const { first, second, third = 0 } = nextFrame
      // Если в следующем фрейме так же страйк то для второго броска расчитывается следующий фрейм
      if(this.isStrike(frame + 1) && d < 1) {
        d++
        return first + second + this.strikeExtraScore(frame + 1, d)
      }
      return first
  }

  spareExtraScore(frame) {
    const nextFrame = this._frames[frame + 1]
    if(!nextFrame) return 0
    return nextFrame.first
  }

  calculate = () => {
    this._results = []
    this._score = this._frames.reduce((score, result, frame) => {
      const { first, second, third = 0 } = result
      // Если бросок последний счет без следующих фреймов
      if(this.isLastRoll(frame)) {
        if(this.isStrike(frame) || this.isSpare(frame)) {
          score += first + second + third
        } else {
          score += first + second
        }
      } else {
        // Если страйк то плюсуется счет следующего фрейма
        if(this.isStrike(frame)) {
          score += first + second + this.strikeExtraScore(frame)
          // Если спэа то плюсуется счет следующего фрейма
        } else if (this.isSpare(frame)) {
          score += first + second + this.spareExtraScore(frame)
          // Иначе считается сумма сбитых кеглей
        } else {
          score += first + second
        }
      }
      // Сохраняем результат фрема с счетом
      this._results.push({
        first,
        second,
        third,
        score
      })
      return score
    }, 0)
  }


  scoreToJson() {
    return JSToJSON({ score: this._score })
  }

  getScore(frames) {
    // Обновляем данные фрейма
    this.frames = frames
    // Расчет счета
    this.calculate()
    // Переход к следующему фрейму
    this.nextFrame()
    // Возврат счета в формате
    // {
    //   "score": 7
    // }
    return this.scoreToJson()
  }
}
