document.addEventListener('DOMContentLoaded', () => {
    const countrySelect = document.getElementById('countrySelect');
    const countryInfoDiv = document.getElementById('countryInfo');

    // --- Data for Socket Types and Countries ---
    // Socket images should be in an 'images/' folder.
    const SOCKET_TYPES = {
        'A': { name: 'Type A', img: 'socket_types_01.jpg', description: 'Two flat parallel pins.' },
        'B': { name: 'Type B', img: 'socket_types_02.jpg', description: 'Two flat parallel pins with a grounding pin.' },
        'C': { name: 'Type C', img: 'socket_types_03.jpg', description: 'Two round parallel pins.' },
        'D': { name: 'Type D', img: 'socket_types_04.jpg', description: 'Three large round pins in a triangular pattern.' },
        'E': { name: 'Type E', img: 'socket_types_05.jpg', description: 'Two round pins with a hole for the socket\'s male grounding pin.' },
        'F': { name: 'Type F', img: 'socket_types_06.jpg', description: 'Two round pins with two grounding clips on the side (Schuko).' },
        'G': { name: 'Type G', img: 'socket_types_07.jpg', description: 'Three rectangular pins in a triangular pattern (British).' },
        'H': { name: 'Type H', img: 'socket_types_08.jpg', description: 'Three round pins in a Y-shape (Israeli).' },
        'I': { name: 'Type I', img: 'socket_types_09.jpg', description: 'Three flat pins in a V-shape (Australian/Chinese).' },
        'J': { name: 'Type J', img: 'socket_types_10.jpg', description: 'Three round pins in a triangle (Swiss).' },
        'K': { name: 'Type K', h_img: 'socket_types_11.jpg', description: 'Two round pins with a U-shaped grounding pin (Danish).' },
        'L': { name: 'Type L', img: 'socket_types_12.jpg', description: 'Three round pins in a line (Italian).' },
        'M': { name: 'Type M', img: 'socket_types_13.jpg', description: 'Three large round pins in a triangular pattern (South African).' },
        'N': { name: 'Type N', img: 'socket_types_14.jpg', description: 'Two round pins with a grounding pin (Brazilian).' },
        'O': { name: 'Type O', img: 'socket_types_15.jpg', description: 'Three round pins with a grounding pin (Thai).' },
    };

    const COUNTRIES = [
        { name: "United States", sockets: ["A", "B"], voltage: "120V", hz: "60Hz" },
        { name: "Canada", sockets: ["A", "B"], voltage: "120V", hz: "60Hz" },
        { name: "United Kingdom", sockets: ["G"], voltage: "230V", hz: "50Hz" },
        { name: "France", sockets: ["C", "E"], voltage: "230V", hz: "50Hz" },
        { name: "Germany", sockets: ["C", "F"], voltage: "230V", hz: "50Hz" },
        { name: "Italy", sockets: ["C", "F", "L"], voltage: "230V", hz: "50Hz" },
        { name: "Australia", sockets: ["I"], voltage: "230V", hz: "50Hz" },
        { name: "China", sockets: ["A", "C", "I"], voltage: "220V", hz: "50Hz" },
        { name: "Japan", sockets: ["A", "B"], voltage: "100V", hz: "50/60Hz" }, // Note: Japan has regional Hz differences
        { name: "India", sockets: ["C", "D", "M"], voltage: "230V", hz: "50Hz" },
        { name: "Thailand", sockets: ["A", "B", "C", "O"], voltage: "230V", hz: "50Hz" },
        { name: "Brazil", sockets: ["C", "N"], voltage: "127V/220V", hz: "60Hz" }, // Note: Brazil has varying voltages
        { name: "South Africa", sockets: ["C", "D", "M", "N"], voltage: "230V", hz: "50Hz" },
        { name: "Israel", sockets: ["C", "H"], voltage: "230V", hz: "50Hz" },
        { name: "Switzerland", sockets: ["C", "J"], voltage: "230V", hz: "50Hz" },
        // Add more countries as needed
    ];

    // --- Populate Country Dropdown ---
    function populateCountries() {
        COUNTRIES.forEach(country => {
            const option = document.createElement('option');
            option.value = country.name;
            option.textContent = country.name;
            countrySelect.appendChild(option);
        });
    }

    // --- Display Country Information ---
    function displayCountryInfo() {
        const selectedCountryName = countrySelect.value;
        const countryData = COUNTRIES.find(c => c.name === selectedCountryName);

        if (countryData) {
            let socketsHtml = countryData.sockets.map(type => {
                const socket = SOCKET_TYPES[type];
                return socket ? `
                    <div class="socket-item">
                        <strong>${socket.name} (${type})</strong>: ${socket.description}
                        <img src="images/${socket.img}" alt="${socket.name} Socket">
                    </div>
                ` : `<strong>Unknown Type (${type})</strong>`;
            }).join('');

            countryInfoDiv.innerHTML = `
                <h3>${countryData.name}</h3>
                <p><strong>Voltage:</strong> ${countryData.voltage}</p>
                <p><strong>Frequency:</strong> ${countryData.hz}</p>
                <p><strong>Common Socket Type(s):</strong></p>
                ${socketsHtml}
            `;
        } else {
            countryInfoDiv.innerHTML = '<p>Select a country to see its socket details.</p>';
        }
    }

    // --- Initial Setup ---
    populateCountries();
    // Event listener for country selection change
    countrySelect.addEventListener('change', displayCountryInfo);
});
