let resizeTimer;
window.addEventListener("resize", () => {
  document.body.classList.add("resize-animation-stopper");
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove("resize-animation-stopper");
  }, 1000);
});

document.querySelectorAll(".parallax").forEach((elem) => {
  const modifier = elem.getAttribute("data-modifier");

  basicScroll
    .create({
      elem: elem,
      from: 0,
      to: 519,
      direct: true,
      props: {
        "--translateY": {
          from: "0",
          to: `${10 * modifier}px`,
        },
      },
    })
    .start();
});
