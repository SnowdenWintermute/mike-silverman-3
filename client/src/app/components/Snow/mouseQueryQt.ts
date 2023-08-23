import Circle from "./Quadtree/Circle";
export default function mouseQueryQt(mouseData, qtRef) {
  const snowRepelSpeed = 2;
  if (qtRef.current) {
    const found = qtRef.current.query(
      new Circle(mouseData.current.x, mouseData.current.y, mouseData.current.radius)
    );

    // found.forEach((point) => (point.userData.color = "rgb(0, 255, 0)"));
    found.forEach((point) => {
      point.userData.falling = true;
      // if (point.y < mouseData.current.y) {
      //   const a = point.x - mouseData.current.x;
      //   const b = point.y - mouseData.current.y;
      //   const dist = Math.sqrt(a * a + b * b);
      //   if (dist <= mouseData.current.radius + 4) {
      //     // point.userData.yPos -= point.userData.area / 2;
      //     point.userData.falling = false;
      //   }
      // } else {
      point.userData.yPos += point.userData.area / 2;
      if (point.x < mouseData.current.x) point.userData.xPos -= point.userData.area / 2;
      else point.userData.xPos += point.userData.area / 2;
      // }
      // point.userData.color = "rgb(255, 0, 0)";
    });
  }
}
