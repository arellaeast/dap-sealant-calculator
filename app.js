(function () {
  "use strict";
  var CU_IN_PER_FL_OZ = 1.80469; // 1 US fl oz = 1.80469 cubic inches

  var form = document.getElementById("calcForm");
  var results = document.getElementById("results");
  var errorBox = document.getElementById("error");
  var warningBox = document.getElementById("warning");

  function num(id) {
    var v = parseFloat(document.getElementById(id).value);
    return isNaN(v) ? NaN : v;
  }

  function setExperience(mode) {
    var pro = mode === "pro";
    document.getElementById("expPro").classList.toggle("active", pro);
    document.getElementById("expDiy").classList.toggle("active", !pro);
    var tube = document.getElementById("tube");
    tube.value = pro ? "10.1" : "5.5";
    document.getElementById("tubeHint").textContent = pro
      ? "Pros run cartridges. A case is 12 cartridges."
      : "Squeeze tubes need no caulk gun and suit small jobs.";
    document.getElementById("lengthHint").textContent = pro
      ? "Total linear feet of every joint you are sealing, across the whole job."
      : "Total linear feet of every joint you are sealing. A tub surround is about 15 to 20 ft.";
    calculate();
  }

  document.getElementById("expPro").addEventListener("click", function () { setExperience("pro"); });
  document.getElementById("expDiy").addEventListener("click", function () { setExperience("diy"); });

  // Fraction chips set the matching input
  var chipGroups = document.querySelectorAll(".chips");
  chipGroups.forEach(function (group) {
    var target = document.getElementById(group.getAttribute("data-target"));
    group.querySelectorAll("button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        target.value = btn.getAttribute("data-value");
        group.querySelectorAll("button").forEach(function (b) { b.classList.remove("chip-on"); });
        btn.classList.add("chip-on");
        calculate();
      });
    });
    target.addEventListener("input", function () {
      group.querySelectorAll("button").forEach(function (b) {
        b.classList.toggle("chip-on", parseFloat(b.getAttribute("data-value")) === parseFloat(target.value));
      });
    });
  });

  function calculate() {
    var length = num("length");
    var joints = num("joints");
    var width = num("width");
    var depth = num("depth");
    var waste = num("waste");
    var tubeOz = parseFloat(document.getElementById("tube").value);

    errorBox.hidden = true;
    if (!(length > 0) || !(width > 0) || !(depth > 0)) {
      errorBox.textContent = "Enter a length, width and depth above zero to calculate.";
      errorBox.hidden = false;
      results.hidden = true;
      return;
    }
    if (!(joints >= 1)) joints = 1;
    if (isNaN(waste) || waste < 0) waste = 0;
    if (waste > 50) waste = 50;

    var totalFeet = length * joints;
    var volumeCuIn = totalFeet * 12 * width * depth;
    var volumeOz = volumeCuIn / CU_IN_PER_FL_OZ;
    var withWaste = volumeOz * (1 + waste / 100);
    var tubes = Math.ceil(withWaste / tubeOz);
    var feetPerTube = tubeOz * CU_IN_PER_FL_OZ / (12 * width * depth);

    var otherOz = tubeOz === 10.1 ? 5.5 : 10.1;
    var otherTubes = Math.ceil(withWaste / otherOz);

    document.getElementById("tubesNeeded").textContent = tubes;
    document.getElementById("tubesLabel").textContent =
      (tubeOz === 10.1 ? "cartridge" : "squeeze tube") + (tubes === 1 ? " needed" : "s needed");
    document.getElementById("totalOz").textContent = withWaste.toFixed(1) + " oz";
    document.getElementById("perTube").textContent = feetPerTube.toFixed(1) + " ft";
    document.getElementById("altSize").textContent = otherTubes + (otherOz === 10.1 ? " cartridges" : " squeeze tubes");
    document.getElementById("altLabel").textContent = "if you switch to the " + (otherOz === 10.1 ? "10.1 oz cartridge" : "5.5 oz squeeze tube");

    var caseRow = document.getElementById("caseRow");
    if (tubeOz === 10.1) {
      caseRow.style.display = "";
      var cases = Math.ceil(tubes / 12);
      document.getElementById("caseCount").textContent = cases + (cases === 1 ? " case" : " cases");
    } else {
      caseRow.style.display = "none";
    }

    var warnings = [];
    if (width > 0.5 || depth > 0.5) {
      warnings.push("This joint is over the 1/2\" x 1/2\" maximum most DAP latex sealants are rated for. Use backer rod to bring the depth in range, and check the product's technical data sheet before you start.");
    }
    if (depth > width / 2 + 0.001 && width <= 0.5) {
      warnings.push("Your depth is more than half your width. The ideal ratio is 1:2, so add backer rod or foam tape to raise the floor of the joint. Sealant bonded on two sides, not three, moves better and lasts longer.");
    }
    if (warnings.length) {
      warningBox.innerHTML = warnings.join("<br><br>");
      warningBox.hidden = false;
    } else {
      warningBox.hidden = true;
    }
    results.hidden = false;
  }

  form.addEventListener("submit", function (e) { e.preventDefault(); calculate(); });
  ["length", "joints", "width", "depth", "waste", "tube"].forEach(function (id) {
    document.getElementById(id).addEventListener("input", calculate);
    document.getElementById(id).addEventListener("change", calculate);
  });
  document.getElementById("resetBtn").addEventListener("click", function () {
    document.getElementById("length").value = 40;
    document.getElementById("joints").value = 1;
    document.getElementById("width").value = 0.25;
    document.getElementById("depth").value = 0.125;
    document.getElementById("waste").value = 10;
    document.getElementById("tube").value = "10.1";
    calculate();
  });

  calculate();
})();
