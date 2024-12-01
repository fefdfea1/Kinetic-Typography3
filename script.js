import { KineticController } from "./KineticTypeController.js";
window.onload = () => {
  const controller = new KineticController();

  const svgContainer = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  svgContainer.classList.add("svgContainer");
  document.body.appendChild(svgContainer);
  controller.inputText("1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ", svgContainer);
};
