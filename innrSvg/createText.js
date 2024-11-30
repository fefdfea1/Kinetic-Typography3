import { KineticController } from "../KineticTypeController.js";
import { typoData } from "./typoData.js";
import { containerData } from "./containerData.js";
let totalAnimationTime = 0;
export class CreateText {
  constructor(userInputText, TextIndex, svgContainer) {
    const controller = new KineticController();
    this.userInputText = userInputText;
    this.typoData = typoData[this.userInputText];
    this.containerData = containerData[this.userInputText];

    const gDom = controller.innerTextContainer(
      svgContainer,
      this.containerData,
      TextIndex,
      userInputText,
      this.containerData // containerPath 전달
    );

    this.typoData.forEach((path, index) => {
      controller.innerPathDom(gDom, path, TextIndex, index, totalAnimationTime);
      totalAnimationTime = controller.calcTotalAnimationTime(path);
    });
  }
}
