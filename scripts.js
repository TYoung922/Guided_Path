// let insuranceName = document.getElementById("insurance-name");
// let insurance = document.getElementById("");

// function toggleText(selectedOpt) {
//   if (selectedOpt === "insurancePay") {
//     // insuranceName.style.visibility = "visible";
//     console.log("click2");
//   } else {
//     // insuranceName.style.visibility = "hidden";
//     console.log("click1");
//   }
// }

// insurance.addEventListener("click", toggleText);

// // insurance.addEventListener("click", console.log("click"));

function toggleText(selectedOpt) {
  const textBox = document.getElementById("insurance-name");
  if (selectedOpt === "insurancePay") {
    textBox.style.display = "inline";
  } else {
    textBox.style.display = "none";
  }
}

function toggleName(opt) {
  const childName = document.getElementById("child-name");
  if (opt === "opt2") {
    childName.style.display = "inline";
  } else {
    childName.style.display = "none";
  }
}
