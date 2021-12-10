import Visible from "@egjs/visible";
import InfiniteScroll from "infinitescroll";

let visibleView = new Visible(".wrap", {
  targetClass: "card",
  expandSize: 0,
});

visibleView.on("change", function (e) {
  e.visible.forEach((el) => el.classList.add("focus"));
  e.invisible.forEach((el) => el.classList.remove("focus"));
});

visibleView.observe({ delay: 100, containment: false });

const wait = (time) => new Promise((resolve) => setTimeout(resolve, time));

const fetchData = async function () {
  await wait(1000);
  visibleView.unobserve();
  visibleView.off();
  visibleView = null;
  return {
    data: '<div class="card item"></div><div class="card item"></div><div class="card item"></div><div class="card item"></div><div class="card item"></div><div class="card item"></div><div class="card item"></div><div class="card item"></div><div class="card item"></div><div class="card item"></div>',
    fetchData,
  };
};

const callbackFetchData = function () {
  visibleView = new Visible(".wrap", {
    targetClass: "card",
    expandSize: 0,
  });
  visibleView.on("change", function (e) {
    e.visible.forEach((el) => el.classList.add("focus"));
    e.invisible.forEach((el) => el.classList.remove("focus"));
  });

  visibleView.observe({ delay: 100, containment: false });
  return { callbackFetchData };
};

const infiniteScroll = new InfiniteScroll({
  scrollContainer: document.querySelector(".scroll"),
  listContainer: document.querySelector(".list"),
  endChecker: {
    container: document.querySelector(".wrap"),
    targetClass: "loading_bar",
  },
  fetchData,
  callbackFetchData,
  options: { type: "append", expandSize: 15 },
});

infiniteScroll.mount();