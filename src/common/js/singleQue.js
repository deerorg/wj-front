export class singleQue {
  constructor (testName, id, required, viewControl, optionList) {
    this.testName = testName
    this.id = id
    this.required = required
    this.viewControl = viewControl
    for (let i = 0; i < optionList.length; i++) {
      if (optionList[i].img) {
        optionList[i].imgbase64 = optionList[i].img
        optionList[i].img = ''
      } else optionList[i].imgbase64 = ''
    }
    this.optionList = optionList
  }
}
