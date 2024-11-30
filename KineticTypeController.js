import { CreateText } from "./innrSvg/createText.js";
const duration = 13;
const letterSpace = 10;
const minusAnimationTime = 200;
let totalAnimationTime = 0;
export class KineticController {
  innerTextContainer(container, path, id, userInputText) {
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const clipPathDom = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "clipPath"
    );
    const pathDom = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    pathDom.setAttribute("d", path);
    defs.appendChild(clipPathDom);
    clipPathDom.setAttribute("id", id);
    container.appendChild(defs);
    clipPathDom.appendChild(pathDom);
    const gDom = this.innerGDom(container, userInputText, id);
    return gDom;
  }

  innerGDom(container, className, id) {
    const gDom = document.createElementNS("http://www.w3.org/2000/svg", "g");
    gDom.classList.add("svg", className);

    // 이전 문자들의 너비를 합산하여 위치 계산
    let xOffset = 0;
    for (let i = 0; i < id; i++) {
      const prevChar = container.querySelectorAll(".svg")[i];
      if (prevChar) {
        const prevWidth = prevChar.getBBox().width;
        xOffset += prevWidth + letterSpace; // letterSpace는 문자 간 추가 간격
      }
    }
    container.style.width = `${xOffset + 100}px`;

    gDom.style.transform = `translateX(${xOffset}px)`;
    container.appendChild(gDom);
    return gDom;
  }

  calcTotalAnimationTime(path) {
    if (!this.animationTime) this.animationTime = 0;
    const pathDom = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    pathDom.setAttribute("d", path);
    const getTotalLength = pathDom.getTotalLength();
    totalAnimationTime += getTotalLength * duration - minusAnimationTime;
    return totalAnimationTime;
  }

  innerPathDom(gDom, path, id, index, totalAnimationTime) {
    const pathDom = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    pathDom.setAttribute("d", path);
    pathDom.setAttribute("clip-path", `url(#${id})`);
    const getTotalLength = pathDom.getTotalLength();
    console.log(id, index);
    pathDom.style.setProperty("--length", getTotalLength);
    pathDom.style.setProperty("--delay", totalAnimationTime + "ms");

    pathDom.style.setProperty("--duration", getTotalLength * duration + "ms");
    gDom.appendChild(pathDom);
  }

  inputText(text, svgContainer) {
    const split = text.split("");
    for (let i = 0; i < split.length; i++) {
      new CreateText(split[i], i, svgContainer);
    }
  }
}
