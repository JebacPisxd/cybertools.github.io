// Password Generator
function generatePassword() {
    let length = 16;
    let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let password = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n));
    }
    document.getElementById("passwordOutput").textContent = password;
}

// IP Lookup (Example API: https://ipinfo.io/)
function lookupIP() {
    let ip = document.getElementById("ipInput").value;
    fetch(`https://ipinfo.io/${ip}/json`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("ipDetails").textContent = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            document.getElementById("ipDetails").textContent = "Error retrieving IP info.";
        });
}

// Port Scan (Simulated for demonstration purposes)
function scanPorts() {
    let ip = document.getElementById("scanIP").value;
    document.getElementById("portDetails").textContent = `Scanning common ports for ${ip}...`;
    // Simulate the scan results
    setTimeout(() => {
        document.getElementById("portDetails").textContent = `Open ports found on ${ip}: 80, 443, 22`;
    }, 2000);
}

// IP Geolocation with Map (using Leaflet.js)
function getGeolocation() {
    let ip = document.getElementById("geoIP").value;
    fetch(`https://ipinfo.io/${ip}/json`)
        .then(response => response.json())
        .then(data => {
            let loc = data.loc.split(",");
            let lat = loc[0];
            let lon = loc[1];

            // Display map with Leaflet.js
            let map = L.map('map').setView([lat, lon], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            L.marker([lat, lon]).addTo(map)
                .bindPopup(`IP Location: ${ip}`)
                .openPopup();
        })
        .catch(error => {
            document.getElementById("ipDetails").textContent = "Error retrieving geolocation.";
        });
}
