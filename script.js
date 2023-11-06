const paths = Array.from(document.querySelectorAll("path"));
const heading = document.getElementById("heading");

const gronn = "#33AA5F";
const rod = "#c30000";
const lsKey = "regioner";

const defaultRegioner = {
  "troms-finnmark": {
    lansert: false,
    navn: "Troms og Finnmark",
  },
  nordland: {
    lansert: false,
    navn: "Nordland",
  },
  trondelag: {
    lansert: false,
    navn: "Trøndelag",
  },
  innlandet: {
    lansert: true,
    navn: "Innlandet",
  },
  "ost-viken": {
    lansert: false,
    navn: "Øst-Viken",
  },
  "vest-viken": {
    lansert: false,
    navn: "Vest-Viken",
  },
  oslo: {
    lansert: false,
    navn: "Oslo",
  },
  agder: {
    lansert: false,
    navn: "Agder",
  },
  vestland: {
    lansert: false,
    navn: "Vestland",
  },
  "more-romsdal": {
    lansert: false,
    navn: "Møre og Romsdal",
  },
  "vestfold-telemark": {
    lansert: false,
    navn: "Vestfold og Telemark",
  },
  rogaland: {
    lansert: false,
    navn: "Rogaland",
  },
};

const regioner = hentFraLocalStorage(lsKey);
function setup() {
  enablePaths(regioner);
  oppdaterRegionsliste();
}

function enablePaths(regioner) {
  paths.forEach((path) => {
    const id = hentId(path);

    if (regioner[id]?.lansert) {
      path.style.fill = gronn;
    }

    path.onclick = () => {
      path.style.fill = gronn;
      heading.innerHTML = hentRegionsnavn(path);
      const id = hentId(path);
      toggleRegionValgt(id, path);
      oppdaterRegionsliste();
      if (regioner[id].lansert) {
        fyrverkeri();
      }
    };

    path.onmouseover = () => {
      heading.innerHTML = hentRegionsnavn(path);
    };

    path.onmouseleave = () => {
      heading.innerHTML = null;
    };
  });
}

function toggleRegionValgt(id, path) {
  regioner[id].lansert = !regioner[id].lansert;
  if (regioner[id]?.lansert) {
    path.style.fill = gronn;
  } else {
    path.style.fill = rod;
  }
  saveToLocalstorage(regioner);
  rulletUtTilHeleLandet(regioner);
}

function oppdaterRegionsliste() {
  const regionsliste = document.getElementById("regioner-lansert");
  const regionerSomGjenstar = document.getElementById("regioner-som-gjenstar");
  const antallRegionerGjenstar = document.getElementById(
    "antall-regioner-gjenstar"
  );
  const antallRegionerLansert = document.getElementById(
    "antall-regioner-lansert"
  );
  regionsliste.innerHTML = null;
  regionerSomGjenstar.innerHTML = null;
  Object.values(regioner)
    .sort((a, b) => a.navn.localeCompare(b.navn))
    .forEach((region) => {
      if (region.lansert) {
        const li = document.createElement("li");
        li.innerText = region.navn;
        li.classList.add("lansert");
        regionsliste.appendChild(li);
      } else {
        const li = document.createElement("li");
        li.innerText = region.navn;
        li.classList.add("gjenstar");
        regionerSomGjenstar.appendChild(li);
      }
    });
  const antallGjenstar = Object.values(regioner).filter(
    (region) => !region.lansert
  ).length;
  const antallLansert = Object.values(regioner).filter(
    (region) => region.lansert
  ).length;
  antallRegionerGjenstar.innerHTML = antallGjenstar;
  antallRegionerLansert.innerHTML = antallLansert;
}

function rulletUtTilHeleLandet(regioner) {
  const antallRegionerRulletUtTil = Object.values(regioner).filter(
    (region) => region.lansert
  ).length;
  if (antallRegionerRulletUtTil === Object.keys(regioner).length) {
    episkFyrverkeri();
  }
}

function hentRegionsnavn(path) {
  return path.querySelector("title").innerHTML;
}

function hentId(path) {
  return path.attributes["id"].value;
}

function saveToLocalstorage(data) {
  window.localStorage.setItem(lsKey, JSON.stringify(data));
}

function hentFraLocalStorage(key) {
  try {
    const regioner = JSON.parse(window.localStorage.getItem(key));

    return regioner ?? defaultRegioner;
  } catch (error) {
    return defaultRegioner;
  }
}

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function fyrverkeri() {
  var duration = 5 * 1000;
  var animationEnd = Date.now() + duration;
  var defaults = {startVelocity: 30, spread: 360, ticks: 60, zIndex: 0};
  var interval = setInterval(function () {
    var timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    var particleCount = 10 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti({
      ...defaults,
      particleCount,
      shapes: ["star"],
      origin: {x: randomInRange(0.1, 0.3), y: Math.random() - 0.2},
    });
    confetti({
      ...defaults,
      particleCount,
      origin: {x: randomInRange(0.7, 0.9), y: Math.random() - 0.2},
    });
  }, 250);
}

function episkFyrverkeri() {
  var end = Date.now() + 8 * 1000;

  var colors = ["#bb0000", "#ffffff"];

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 90,
      startVelocity: 60,
      spread: 100,
      origin: {x: 0.5, y: 1.1},
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

(() => {
  setup();
})();
