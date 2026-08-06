// Raw Airline Operations Dataset for Yashika Singh Portfolio Project
const rawDataset = [
  { date: "1990-01-15", year: 1990, origin: "PDX", dest: "ORD", passengers: 45200, distance: 1739, flights: 340 },
  { date: "1990-02-15", year: 1990, origin: "PDX", dest: "ORD", passengers: 42800, distance: 1739, flights: 320 },
  { date: "1990-03-15", year: 1990, origin: "PDX", dest: "ORD", passengers: 48900, distance: 1739, flights: 360 },
  { date: "1990-04-15", year: 1990, origin: "PDX", dest: "LAX", passengers: 51200, distance: 834, flights: 410 },
  { date: "1990-05-15", year: 1990, origin: "PDX", dest: "LAX", passengers: 54300, distance: 834, flights: 430 },
  { date: "1990-06-15", year: 1990, origin: "PDX", dest: "LAX", passengers: 61000, distance: 834, flights: 490 },
  { date: "1995-01-15", year: 1995, origin: "PDX", dest: "SFO", passengers: 58400, distance: 550, flights: 450 },
  { date: "1995-04-15", year: 1995, origin: "PDX", dest: "SFO", passengers: 62100, distance: 550, flights: 480 },
  { date: "1995-07-15", year: 1995, origin: "PDX", dest: "SEA", passengers: 71500, distance: 129, flights: 580 },
  { date: "1995-10-15", year: 1995, origin: "PDX", dest: "SEA", passengers: 68200, distance: 129, flights: 550 },
  { date: "2000-01-15", year: 2000, origin: "PDX", dest: "DEN", passengers: 84500, distance: 991, flights: 620 },
  { date: "2000-04-15", year: 2000, origin: "PDX", dest: "DEN", passengers: 91200, distance: 991, flights: 670 },
  { date: "2000-07-15", year: 2000, origin: "PDX", dest: "ATL", passengers: 108500, distance: 2172, flights: 740 },
  { date: "2000-10-15", year: 2000, origin: "PDX", dest: "ATL", passengers: 98400, distance: 2172, flights: 710 },
  { date: "2005-01-15", year: 2005, origin: "PDX", dest: "JFK", passengers: 112000, distance: 2434, flights: 780 },
  { date: "2005-04-15", year: 2005, origin: "PDX", dest: "JFK", passengers: 125400, distance: 2434, flights: 830 },
  { date: "2005-07-15", year: 2005, origin: "PDX", dest: "DFW", passengers: 142000, distance: 1616, flights: 910 },
  { date: "2005-10-15", year: 2005, origin: "PDX", dest: "DFW", passengers: 131200, distance: 1616, flights: 860 },
  { date: "2006-01-15", year: 2006, origin: "PDX", dest: "LAX", passengers: 138900, distance: 834, flights: 890 },
  { date: "2006-04-15", year: 2006, origin: "PDX", dest: "LAX", passengers: 156400, distance: 834, flights: 970 },
  { date: "2006-07-15", year: 2006, origin: "PDX", dest: "ORD", passengers: 220000, distance: 1739, flights: 1250 },
  { date: "2006-10-15", year: 2006, origin: "PDX", dest: "ORD", passengers: 185000, distance: 1739, flights: 1100 },
  { date: "2009-01-15", year: 2009, origin: "PDX", dest: "SEA", passengers: 128000, distance: 129, flights: 880 },
  { date: "2009-04-15", year: 2009, origin: "PDX", dest: "SFO", passengers: 145000, distance: 550, flights: 960 },
  { date: "2009-07-15", year: 2009, origin: "PDX", dest: "LAX", passengers: 178000, distance: 834, flights: 1150 },
  { date: "2009-10-15", year: 2009, origin: "PDX", dest: "DEN", passengers: 162000, distance: 991, flights: 1040 }
];

let trendChartInstance = null;
let routeChartInstance = null;

document.addEventListener("DOMContentLoaded", () => {
  renderDashboard(rawDataset);

  // Attach event listeners
  document.getElementById("yearFilter").addEventListener("change", applyFilters);
  document.getElementById("airportSearch").addEventListener("input", applyFilters);
  document.getElementById("resetFilters").addEventListener("click", resetFilters);
  document.getElementById("exportCsv").addEventListener("click", exportCsv);
});

function applyFilters() {
  const yearVal = document.getElementById("yearFilter").value;
  const searchVal = document.getElementById("airportSearch").value.toUpperCase().trim();

  let filtered = rawDataset.filter(item => {
    const matchYear = yearVal === "ALL" || item.year.toString() === yearVal;
    const matchAirport = !searchVal || item.origin.includes(searchVal) || item.dest.includes(searchVal);
    return matchYear && matchAirport;
  });

  renderDashboard(filtered);
}

function resetFilters() {
  document.getElementById("yearFilter").value = "ALL";
  document.getElementById("airportSearch").value = "";
  renderDashboard(rawDataset);
}

function renderDashboard(data) {
  updateKPIs(data);
  renderTable(data);
  renderCharts(data);
}

function updateKPIs(data) {
  const totalPassengers = data.reduce((acc, curr) => acc + curr.passengers, 0);
  const totalFlights = data.reduce((acc, curr) => acc + curr.flights, 0);
  const totalDistance = data.reduce((acc, curr) => acc + curr.distance, 0);

  document.getElementById("kpiPassengers").innerText = formatNumber(totalPassengers, "M", 2);
  document.getElementById("kpiFlights").innerText = formatNumber(totalFlights, "K", 1);
  document.getElementById("kpiDistance").innerText = formatNumber(totalDistance, "K", 0) + " mi";
}

function formatNumber(num, suffix, decimals) {
  if (suffix === "M") return (num / 1000000).toFixed(decimals) + "M";
  if (suffix === "K") return (num / 1000).toFixed(decimals) + "K";
  return num.toLocaleString();
}

function renderTable(data) {
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";

  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color: var(--text-muted);">No operational records matched the filter.</td></tr>`;
    return;
  }

  data.forEach(item => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.date}</td>
      <td><strong>${item.origin}</strong></td>
      <td><strong>${item.dest}</strong></td>
      <td>${item.passengers.toLocaleString()}</td>
      <td>${item.distance.toLocaleString()} mi</td>
      <td>${item.flights.toLocaleString()}</td>
    `;
    tbody.appendChild(tr);
  });
}

function renderCharts(data) {
  // Aggregate by Year for Line Chart
  const yearlyMap = {};
  data.forEach(item => {
    yearlyMap[item.year] = (yearlyMap[item.year] || 0) + item.passengers;
  });

  const years = Object.keys(yearlyMap).sort();
  const passengerCounts = years.map(y => yearlyMap[y]);

  // Aggregate by Destination for Bar Chart
  const destMap = {};
  data.forEach(item => {
    destMap[item.dest] = (destMap[item.dest] || 0) + item.flights;
  });

  const dests = Object.keys(destMap);
  const flightCounts = dests.map(d => destMap[d]);

  // Render Trend Chart
  const ctxTrend = document.getElementById("trendChart").getContext("2d");
  if (trendChartInstance) trendChartInstance.destroy();

  trendChartInstance = new Chart(ctxTrend, {
    type: "line",
    data: {
      labels: years,
      datasets: [{
        label: "Total Passengers",
        data: passengerCounts,
        borderColor: "#38bdf8",
        backgroundColor: "rgba(56, 189, 248, 0.15)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#38bdf8",
        pointRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: "#94a3b8" } }
      },
      scales: {
        x: { ticks: { color: "#94a3b8" }, grid: { color: "rgba(255,255,255,0.05)" } },
        y: { ticks: { color: "#94a3b8" }, grid: { color: "rgba(255,255,255,0.05)" } }
      }
    }
  });

  // Render Route Chart
  const ctxRoute = document.getElementById("routeChart").getContext("2d");
  if (routeChartInstance) routeChartInstance.destroy();

  routeChartInstance = new Chart(ctxRoute, {
    type: "bar",
    data: {
      labels: dests,
      datasets: [{
        label: "Operated Flights Count",
        data: flightCounts,
        backgroundColor: ["#818cf8", "#34d399", "#fbbf24", "#c084fc", "#f43f5e", "#38bdf8"],
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: "#94a3b8" } }
      },
      scales: {
        x: { ticks: { color: "#94a3b8" }, grid: { display: false } },
        y: { ticks: { color: "#94a3b8" }, grid: { color: "rgba(255,255,255,0.05)" } }
      }
    }
  });
}

function exportCsv() {
  let csvContent = "data:text/csv;charset=utf-8,Fly_date,Origin_airport,Destination_airport,Passengers,Distance,Flights\n";
  rawDataset.forEach(row => {
    csvContent += `${row.date},${row.origin},${row.dest},${row.passengers},${row.distance},${row.flights}\n`;
  });
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "Airline_Operations_Yashika_Singh.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
