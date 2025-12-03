// --- Initial populations in 2025 (in millions) ---
let population2025 = {
    black: 39940338,
    white: 191697647,
    hisp: 62080044,
    asian: 19618719,
    other: 18000000
};

// Select elements
let yearDisplay = document.getElementById("yearValue");
let slider = document.getElementById("timeSlider");


// --- Core projection function ---
function projectPopulation(year) {
const fertility = {
black: parseFloat(document.getElementById("fert_black").value),
white: parseFloat(document.getElementById("fert_white").value),
hisp: parseFloat(document.getElementById("fert_hisp").value),
asian: parseFloat(document.getElementById("fert_asian").value),
other: parseFloat(document.getElementById("fert_other").value)
};


// Death rates (%)
const death = {
black: parseFloat(document.getElementById("death_black")?.value || 1) / 100,
white: parseFloat(document.getElementById("death_white")?.value || 1) / 100,
hisp: parseFloat(document.getElementById("death_hisp")?.value || 1) / 100,
asian: parseFloat(document.getElementById("death_asian")?.value || 1) / 100,
other: parseFloat(document.getElementById("death_other")?.value || 1) / 100
};

console.log()


let pops = { ...population2025 };


for (let y = 2025; y < year; y++) {
for (let group in pops) {
// Apply growth = births - deaths
console.log(fertility[group]);
console.log(death[group])
pops[group] = pops[group] * (1 + fertility[group]/100 - death[group]);
}
}
return pops;
}


// --- Chart.js pie chart ---
let ctx = document.getElementById("pieChart");
let chart = new Chart(ctx, {
type: 'pie',
data: {
labels: ["Noirs", "Blancs", "Hispaniques", "Asiatiques", "Autres"],
datasets: [{
data: Object.values(population2025),
borderWidth: 1,
hoverOffset: 10
}]
},
options: {
animation: {
duration: 800,
easing: 'easeOutQuart'
}
}
});


// --- Update the chart live ---
function updateChart() {
const year = parseInt(slider.value);
yearDisplay.textContent = year;


let pops = projectPopulation(year);


chart.data.datasets[0].data = Object.values(pops);
chart.update();
}


// Slider event
slider.oninput = updateChart;


// Update on fertility/death input change
function attachUpdateToInputs() {
document.querySelectorAll("#controls input, #deathControls input").forEach(input => {
input.addEventListener("change", updateChart);
});
}


attachUpdateToInputs();