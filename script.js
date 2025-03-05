async function checkDNCStatus() {
    console.log("Check DNC Status function triggered");

    const phoneNumber = document.getElementById("phoneNumber").value.trim();
    if (!phoneNumber) {
        alert("Please enter a phone number");
        return;
    }

    const apiUrl = `https://tcpa.api.uspeoplesearch.net/tcpa/v1?x=${phoneNumber}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("API error or invalid response.");
        }

        const data = await response.json();

        // Log the data to check the structure
        console.log(data);

        const results = {
            phone: phoneNumber,
            state: data.state || "Not Found",
            dncNational: data.DNCNational !== undefined ? data.DNCNational : "Not Found",
            dncState: data.DNCState !== undefined ? data.DNCState : "Not Found",
            litigator: data.Litigator !== undefined ? data.Litigator : "Not Found",
            blacklist: data.Blacklist !== undefined ? data.Blacklist : "Not Found"
        };

        displayResults(results);
    } catch (error) {
        alert("Error fetching data: " + error.message);
    }
}
