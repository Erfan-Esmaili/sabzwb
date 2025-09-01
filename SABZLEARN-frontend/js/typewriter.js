// !!typewriter

var app = document.getElementById("landingTitleText");

var typewriter = new Typewriter(landingTitleText, {
  loop: true,
  delay: 70,
  cursor: "",
});

typewriter
  .typeString("ما به هر قیمتی دوره آموزشی تولید نمیکنیم!")
  .pauseFor(2000)
  .start();
